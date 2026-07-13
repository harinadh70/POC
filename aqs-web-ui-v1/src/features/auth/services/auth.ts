import { z } from 'zod';
import { baseQuery } from '@/utils/http-instance';

// utils
import isEmpty from 'lodash-es/isEmpty';

// types
import type { User } from '@/types';

// ---------------------------------------

export const LoginResponseSchema = z.object({
    statusCode: z.number(),
    statusMessage: z.string(),
    token: z.string().optional(), // optional because failed login may not include it
    sessioninformation: z
        .object({
            compLoc: z.string(),
            userId: z.string(),
            policyId: z.string(),
            nodeKey: z.string(),
            action: z.string(),
            diagnosticMode: z.string(),
        })
        .optional(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type SessionInfo = NonNullable<LoginResponse['sessioninformation']>;

/**
 * Fetches the authenticated user's information based on the current session.
 *
 * Attempts to retrieve the user data from the server. If the request fails due to an unauthorized error (HTT⟪?⟫
 * it tries to refresh the authentication session and retries fetching the user data once more.
 * If the refresh or the second fetch fails, or if any other error occurs, it returns `null`.
 *
 * @returns {Promise<User | null>} A promise that resolves to the authenticated user object if successful, or
 */
export async function fetchAuthenticatedUserBySession(): Promise<User | null> {
    try {
        // 1. Try fetching the authenticated user
        const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
        return user;
    } catch (err) {
        // 2. If unauthorized → try refresh
        const error = err as { status: number };
        if (error.status === 401) {
            try {
                // 3. Retry fetching user after refresh
                await baseQuery({ url: '/auth/refresh', method: 'POST' });
                const user = await baseQuery<User>({ url: '/users/1', method: 'GET' });
                return user;
            } catch {
                return null;
            }
        }
        // Other errors → treat as unauthenticated
        return null;
    }
}

/**
 * Validates user credentials by sending a login request to the authentication API.
 *
 * @param username - The username of the user attempting to log in.
 * @param password - The password of the user attempting to log in.
 * @returns A promise that resolves to `true` if the login is successful (status code 200), `false` otherwise
 *
 * @example
 * const isValid = await validateUser('john_doe', 'password123');
 * if (isValid) {
 *   console.log('User authenticated successfully');
 * }
 */
export async function loginUser(
    username?: string,
    password?: string,
): Promise<{
    status: boolean;
    token: string | null;
    sessionInformation?: LoginResponse['sessioninformation'];
}> {
    try {
        // For SSO checks (no credentials), mark request to skip 401 interceptor
        const isSSOAttempt = isEmpty(username) || isEmpty(password);

        if (isSSOAttempt) {
            console.log('[loginUser] SSO attempt - setting skipAuthInterceptor flag');
        }

        const response = await baseQuery<LoginResponse>({
            url: '/auth/login',
            method: 'POST',
            skipAuthInterceptor: isSSOAttempt, // Skip 401 interceptor for SSO checks
            ...(isSSOAttempt ? {} : { data: { Username: username, Password: password } }),
        });

        // Validate using Zod
        const parsed = LoginResponseSchema.safeParse(response);

        if (parsed.success && parsed.data.statusCode === 200) {
            console.log('Login successful:', parsed.data.statusMessage);
            return {
                status: true,
                token: parsed.data.token ?? null,
                sessionInformation: parsed.data.sessioninformation,
            };
        }

        console.warn('Login failed with status:', response.statusCode);
        return { status: false, token: null, sessionInformation: undefined };
    } catch (error) {
        console.warn('Login request failed:', error);
        return { status: false, token: null, sessionInformation: undefined };
    }
}

export async function logoutUser(): Promise<boolean> {
    try {
        const response = await baseQuery<{
            statusCode: number;
            statusMessage: string;
            token: string;
            sessioninformation?: string[];
        }>({ url: '/auth/logout', method: 'POST' });

        if (response.statusCode === 200 && !response.token) {
            console.log('Logout successful');
            return true;
        }

        console.warn('Logout failed with status:', response.statusCode);
        return false;
    } catch (error) {
        console.error('Logout failed:', error);
        return false;
    }
}
