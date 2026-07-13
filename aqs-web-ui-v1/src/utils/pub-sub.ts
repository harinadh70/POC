import type { BrowserCommand } from './apply-server-commands';
import type { MessageType } from '@components/dialog';

/**
 * Type-safe event map for PubSub system.
 * Add new event types here to ensure type safety across subscribers.
 */
export interface PubSubEvents {
    'command:executed': { matchcode: string; value: unknown };
    'command:error': { error: Error; command: BrowserCommand };
    'form:field-updated': { matchcode: string; value: unknown };
    'dialog:opened': { type: MessageType };
    'global:variable-updated': { name: string; value: unknown };
    'command:call-server-requested': { callType: string; sourceCommand: BrowserCommand };
    // Tab-related events
    'tab:selected': { tabstripId: string; tabMatchcode: string };
    'tab:registered': {
        tabstripId: string;
        tabs: Array<{ matchcode: string; label: string; index: number }>;
    };
}

/**
 * Type-safe event emitter for cross-component communication.
 * Supports wildcard subscriptions and automatic cleanup.
 */
export class PubSub {
    private subscribers: Map<string, Set<(data: any) => void>> = new Map();

    /**
     * Subscribe to a specific event type or all events using wildcard '*'.
     * @param event - Event name from PubSubEvents or '*' for all events
     * @param callback - Function to call when event is emitted
     * @returns Unsubscribe function for cleanup
     *
     * @example
     * const unsubscribe = pubSub.subscribe('command:executed', (data) => {
     *   console.log('Command executed:', data.matchcode);
     * ⟪? uncertain, likely "* });" ⟫
     * // Later, cleanup
     * ⟪? uncertain ⟫
     * unsubscribe();
     */
    subscribe<K extends keyof PubSubEvents | '*'>(
        event: K,
        callback: K extends '*'
            ? (data: PubSubEvents[keyof PubSubEvents]) => void
            : K extends keyof PubSubEvents
                ? (data: PubSubEvents[K]) => void
                : never,
    ): () => void {
        const eventName = event as string;

        if (!this.subscribers.has(eventName)) {
            this.subscribers.set(eventName, new Set());
        }

        const callbackSet = this.subscribers.get(eventName)!;
        callbackSet.add(callback as (data: any) => void);

        // Return unsubscribe function
        return () => {
            const set = this.subscribers.get(eventName);
            if (set) {
                set.delete(callback as (data: any) => void);
                // Clean up empty sets
                if (set.size === 0) {
                    this.subscribers.delete(eventName);
                }
            }
        };
    }
    /**
     * Emit an event with payload to all subscribers.
     * Also triggers wildcard '*' subscribers.
     * Errors in callbacks are caught and logged to prevent breaking other subscribers.
     *
     * @param event - Event name from PubSubEvents
     * @param data - Event payload matching the event type
     * ⟪? exact position of second blank "*" separator approximate ⟫
     *
     * @example
     * pubSub.emit('command:executed', { matchcode: 'FIELD1', value: 'test' });
     */
    emit<K extends keyof PubSubEvents>(event: K, data: PubSubEvents[K]): void {
        const eventName = event as string;

        // Call specific event subscribers
        const specificSubscribers = this.subscribers.get(eventName);
        if (specificSubscribers) {
            specificSubscribers.forEach((callback) => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`[PubSub] Error in subscriber for event "${eventName}":`, error);
                }
            });
        }

        // Call wildcard subscribers
        const wildcardSubscribers = this.subscribers.get('*');
        if (wildcardSubscribers) {
            wildcardSubscribers.forEach((callback) => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(
                        `[PubSub] Error in wildcard subscriber for event "${eventName}":`,
                        error,
                    );
                }
            });
        }
    }
    ⟪?⟫
    /**
     * Unsubscribe all listeners for a specific event.
     * If no event is provided, clears all subscriptions.
     *
     * @param event - Optional event name to clear. If omitted, clears all events.
     *
     * @example
     * // Clear specific event
     * pubSub.clear('command:executed');
     *
     * // Clear all events
     * pubSub.clear();
     */
    clear(event?: keyof PubSubEvents | '*'): void {
        if (event) {
            this.subscribers.delete(event as string);
        } else {
            this.subscribers.clear();
        }
    }

    /**
     * Get the number of subscribers for a specific event.
     * Useful for debugging and testing.
     *
     * @param event - Event name to check
     * @returns Number of subscribers
     */
    getSubscriberCount(event: keyof PubSubEvents | '*'): number {
        return this.subscribers.get(event as string)?.size ?? 0;
    }

    /**
     * Get all active event names.
     * Useful for debugging.
     *
     * @returns Array of event names with active subscribers
     */
    getActiveEvents(): string[] {
        return Array.from(this.subscribers.keys());
    }
}

/**
 * Singleton PubSub instance for global event communication.
 * Import this instance throughout your application.
 *
 * @example
 * import { pubSub } from '@/utils/pub-sub';
 *
 * // Subscribe
 * const unsubscribe = pubSub.subscribe('command:executed', (data) => {
 *   console.log(data.matchcode);
 * });
 *
 * // Emit
 * pubSub.emit('command:executed', { matchcode: 'FIELD1', value: 'test' });
 *
 * // Cleanup
 * unsubscribe();
 */
export const pubSub = new PubSub();
