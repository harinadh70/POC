/**
 * @file xml-server-call.ts
 * @description XMLServerCall API service for modal form submission and business logic execution
 *
 * This service handles the XMLServerCall API which executes server-side COM object calls
 * and returns browser commands that control UI behavior (close modal, navigate, update fields).
 *
 * @see apis.instructions.md lines 410-690 for payload/response format
 */

import { z } from 'zod';
import { baseQuery } from '@/utils/http-instance';
import { createFeatureLogger } from '@/utils/logger-builder';

const logger = createFeatureLogger('api', 'XMLServerCall');

// ========================================
// Zod Schemas
// ========================================

/**
 * Schema for a single subroutine call within the XMLServerCall
 */
const CallSchema = z.object({
    project: z.string(),
    class: z.string(),
    subroutine: z.string(),
    componenttype: z.string().optional(),
});

/**
 * Schema for the calls configuration
 */
const CallsSchema = z.object({
    type: z.string(),
    mode: z.string().optional(), // async mode for server calls
    call: z.union([CallSchema, z.array(CallSchema)]),
});

/**
 * Schema for session XML items
 */
const SessionItemSchema = z.object({
    name: z.string(),
    value: z.string(),
});

/**
 * Schema for the session XML structure
 */
const SessionXmlSchema = z.object({
    items: z.union([SessionItemSchema, z.array(SessionItemSchema)]),
});

/**
 * Schema for XMLServerCall request payload
 */
export const XMLServerCallPayloadSchema = z.object({
    aqs: z.object({
        mstrObject: z.string(),
        calls: CallsSchema,
        SessionInformation: z.object({
            value: z.tuple([
                z.string(), // compLoc
                z.string(), // userId
                z.string(), // policyID
                z.string(), // nodeKey
                z.string(), // action
                z.string(), // diagnosticMode
                z.union([SessionXmlSchema, z.string()]), // sessionXml object or raw xml string
            ]),
        }),
        EEData: z.object({
            value: z.array(z.unknown()),
        }),
    }),
});

/**
 * Schema for browser commands in the response
 */
const BrowserCommandSchema = z.object({
    verb: z.string(),
    noun: z.string(),
    addinf: z.string(),
    resfil: z.string().optional(),
});

/**
 * Schema for XMLServerCall response
 * Note: Fields are optional because backend may return undefined for some responses
 */
export const XMLServerCallResponseSchema = z.object({
    callstatus: z.string().optional().default('0'),
    errors: z.string().optional().default(''),
    results: z
        .object({
            aqs: z.object({
                SessionInformation: z
                    .object({
                        value: z.array(z.unknown()),
                    })
                    .optional(),
                EEData: z
                    .object({
                        value: z.array(z.unknown()),
                    })
                    .optional(),
                ListItems: z
                    .object({
                        value: z.union([z.string(), z.array(z.string())]),
                    })
                    .optional(),
                BrowserCtl: z
                    .object({
                        call: z.union([BrowserCommandSchema, z.array(BrowserCommandSchema)])
                    })
                    .optional(),
            })
            .optional(),
        }),
    })
    .optional(),
});

// ===================================================
// Types
// ===================================================

export type Call = z.infer<typeof CallSchema>;
export type Calls = z.infer<typeof CallsSchema>;
export type SessionItem = z.infer<typeof SessionItemSchema>;
export type SessionXml = z.infer<typeof SessionXmlSchema>;
export type XMLServerCallPayload = z.infer<typeof XMLServerCallPayloadSchema>;
export type XMLServerCallResponse = z.infer<typeof XMLServerCallResponseSchema>;

// ===================================================
// Service Functions
// ===================================================

/**
 * Call XMLServerCall API to execute server-side business logic
 *
 * This API processes form submissions, executes COM object calls,
 * and returns browser commands that tell the UI what to do next
 * (close modal, navigate, update fields, etc.)
 *
 * @param payload - XMLServerCall request payload
 * @returns XMLServerCall response with browser commands
 *
 * @example
 * ```typescript
 * const response = await xmlServerCall({
 *   mstrObject: "ZENTEDTCTL",
 *   calls: [
 *     { project: "pZStart", class: "cZStart", subroutine: "Policy_SetBeginType" },
 *     { project: "pZStart", class: "cZStart", subroutine: "Modal_Close" },
 *   ]
 * },
 * SessionInformation: { ... },
 * EEData: { ... }
 * const commands = parseBrowserCommandsFromXMLServerCall(response);
 * ```
 */
export async function xmlServerCall(payload: XMLServerCallPayload): Promise<XMLServerCallResponse> {
    logger.info('Calling XMLServerCall API', {
        mstrObject: payload.aqs.mstrObject,
        callCount: Array.isArray(payload.aqs.calls.call) ? payload.aqs.calls.call.length : 1,
        action: payload.aqs.SessionInformation.value[4],
    });

    try {
        // Call API via baseQuery
        const response = await baseQuery<XMLServerCallResponse>({
            url: '/XMLServerCall',
            method: 'POST',
            data: payload,
        });

        // Validate response with Zod
        const validatedResponse = XMLServerCallResponseSchema.parse(response);

        logger.info('XMLServerCall response received', {
            callstatus: validatedResponse.callstatus,
            hasErrors: !!validatedResponse.errors,
            commandCount: Array.isArray(validatedResponse.results?.aqs?.BrowserCtl?.call)
                ? validatedResponse.results.aqs.BrowserCtl.call.length
                : validatedResponse.results?.aqs?.BrowserCtl?.call
                    ? 1
                    : 0,
        });
        // Check for errors in response
        if (validatedResponse.errors) {
            logger.warn('XMLServerCall returned errors', {
                errors: validatedResponse.errors,
            });
        }

        return validatedResponse;
    } catch (error) {
        logger.error('XMLServerCall failed', error as Error, {
            mstrObject: payload.aqs.mstrObject,
            action: payload.aqs.SessionInformation.value[4],
        });
        throw error;
    }
}
