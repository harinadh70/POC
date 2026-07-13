// TODO ⟪missing lines 1-37 — not captured in photos⟫
export interface FormStoreMethods {
    // TODO ⟪missing lines 39-51 — not captured in photos⟫
    * Clears custom external form store state.
     */
    clearStore: () => void;
    /**
     * Get metadata for a specific field
     */
    getFieldMetadata: (matchcode: string) => FieldMetadata | undefined;
    /**
     * Update metadata for a specific field
     */
    setFieldMetadata: (matchcode: string, metadata: Partial<FieldMetadata>) => void;
    /**
     * Set field disabled state
     */
    setFieldDisabled: (matchcode: string, disabled: boolean) => void;
    /**
     * Set field visible state
     */
    setFieldVisible: (matchcode: string, visible: boolean) => void;
    /**
     * Set field read-only state
     */
    setFieldReadOnly: (matchcode: string, readOnly: boolean) => void;
    /**
     * Set field required state
     */
    setFieldRequired: (matchcode: string, required: boolean) => void;
    /**
     * Set runtime options for a select/combo field
     */
    setFieldOptions: (matchcode: string, options: OptionItem[]) => void;
    /**
     * Clear runtime options for a select/combo field
     */
    clearFieldOptions: (matchcode: string) => void;
    /**
     * Get all field metadata
     */
    getAllFieldMetadata: () => Record<string, FieldMetadata>;
}

const { Provider: CustomFormProvider, useStore } = createStore<FormStore>({
    values: {},
    errors: {},
    touched: {},
    isSubmitting: false,
    fieldMetadata: {},
});

type Option = { value: string; text: string };
// ----------------------------------------

export interface FormControl {
    id: string;
    matchcode: string;
    controltype: 'input' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date' | 'number';
    ctrllabel: string;
    tabindex: string;
    value: string | boolean;
    text: string;
    options?: Option[];
    required: 'T' | 'F' | boolean | string;
    disabled: 'T' | 'F' | boolean | string;
}
// TODO ⟪missing lines 116-119 — not captured in photos⟫
/**
 * Enhanced FormProvider that integrates react-hook-form with custom store
 * Provides both RHF form methods and custom state management
 */
const FormProvider = ({ children }: PropsWithChildren) => {
    const formMethods = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    return (
        <RHFFormProvider {...formMethods}>
            <CustomFormProvider>
                <FormProviderContent formMethods={formMethods}>{children}</FormProviderContent>
            </CustomFormProvider>
        </RHFFormProvider>
    );
};

// ----------------------------------------

interface FormProviderContentProps extends PropsWithChildren {
    formMethods: UseFormReturn;
}

const FormProviderContent = ({ children, formMethods }: FormProviderContentProps) => {
    const { formState, getValues } = formMethods;
    const [, setStore] = useStore(() => null);
    const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const lastSyncRef = useRef<{
        errorsCount: number;
        touchedCount: number;
        isSubmitting: boolean;
    }>({ errorsCount: 0, touchedCount: 0, isSubmitting: false });

    // Sync react-hook-form state with custom store
    // Use setTimeout to debounce rapid updates from browser commands
    useEffect(() => {
        // Clear any pending sync
        if (syncTimeoutRef.current) {
            clearTimeout(syncTimeoutRef.current);
        }

        // Check if state has actually changed to prevent unnecessary syncs
        const errorsCount = Object.keys(formState.errors).length;
        const touchedCount = Object.keys(formState.touchedFields).length;
        const hasChanged =
            lastSyncRef.current.errorsCount !== errorsCount ||
            lastSyncRef.current.touchedCount !== touchedCount ||
            lastSyncRef.current.isSubmitting !== formState.isSubmitting;

        if (!hasChanged) {
            return;
        }

        // Update last sync ref
        lastSyncRef.current = { errorsCount, touchedCount, isSubmitting: formState.isSubmitting };

        // Debounce store sync to prevent rapid re-renders during browser command execution
        syncTimeoutRef.current = setTimeout(() => {
            const errors = Object.entries(formState.errors).reduce(
                (acc, [key, error]) => {
                    if (error?.message) {
                        acc[key] =
                            typeof error.message === 'string'
                                ? error.message
                                : String(error.message);
                    }
                    return acc;
                },
                {} as Record<string, string>,
            );

            const touched = Object.entries(formState.touchedFields).reduce(
                (acc, [key, touchedValue]) => {
                    acc[key] = !!touchedValue;
                    return acc;
                },
                {} as Record<string, boolean>,
            );

            setStore((prev: FormStore) => ({
                ...prev,
                values: getValues(),
                errors,
                touched,
                isSubmitting: formState.isSubmitting,
            }));
        }, 0);

        return () => {
            if (syncTimeoutRef.current) {
                clearTimeout(syncTimeoutRef.current);
            }
        };
    }, [formState, getValues, setStore]);

    return <>{children}</>;
};

// ----------------------------------------

/**
 * Hook to access the custom form store
 * Provides access to values, errors, touched state
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useFormStore<SelectorOutput>(
    selector: (store: FormStore) => SelectorOutput,
): [SelectorOutput, (value: Partial<FormStore>) => void] {
    return useStore(selector);
}

/**
 * Hook to access react-hook-form methods along with custom utility functions
 * For advanced form operations and external field updates
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useFormMethods(): UseFormReturn & FormStoreMethods {
    const formMethods = useFormContext();
    const { setValue, trigger, reset: rhfReset, getValues } = formMethods;
    const [store, setStore] = useStore((s: FormStore) => s);

    /**
     * Updates a field value externally (e.g., from browser commands)
     * Triggers validation after update
     */
    const updateField = useCallback(
        (matchcode: string, value: unknown) => {
            setValue(matchcode, value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
            });
        },
        [setValue],
    );

    /**
     * Validates a specific field
     */
    const validateField = useCallback(
        async (matchcode: string): Promise<boolean> => {
            return await trigger(matchcode);
        },
        [trigger],
    );

    /**
     * Clears external store state while preserving RHF behavior.
     */
    const clearStore = useCallback(() => {
        setStore({
            values: {},
            errors: {},
            touched: {},
            isSubmitting: false,
            fieldMetadata: {},
        });
    }, [setStore]);

    /**
     * Get metadata for a specific field
     */
    const getFieldMetadata = useCallback(
        (matchcode: string): FieldMetadata | undefined => {
            return store.fieldMetadata[matchcode];
        },
        [store],
    );

    /**
     * Update metadata for a specific field
     */
    const setFieldMetadata = useCallback(
        (matchcode: string, metadata: Partial<FieldMetadata>) => {
            setStore((prev: FormStore) => ({
                ...prev,
                fieldMetadata: {
                    ...prev.fieldMetadata,
                    [matchcode]: {
                        ...prev.fieldMetadata[matchcode],
                        ...metadata,
                    },
                },
            }));
        },
        [setStore],
    );

    /**
     * Set field disabled state
     */
    const setFieldDisabled = useCallback(
        (matchcode: string, disabled: boolean) => {
            setFieldMetadata(matchcode, { disabled });
        },
        [setFieldMetadata],
    );

    /**
     * Set field visible state
     */
    const setFieldVisible = useCallback(
        (matchcode: string, visible: boolean) => {
            setFieldMetadata(matchcode, { visible });
        },
        [setFieldMetadata],
    );

    /**
     * Set field read-only state
     */
    const setFieldReadOnly = useCallback(
        (matchcode: string, readOnly: boolean) => {
            setFieldMetadata(matchcode, { readOnly });
        },
        [setFieldMetadata],
    );

    /**
     * Set field required state
     */
    const setFieldRequired = useCallback(
        (matchcode: string, required: boolean) => {
            setFieldMetadata(matchcode, { required });
        },
        [setFieldMetadata],
    );

    /**
     * Set runtime options for a field
     */
    const setFieldOptions = useCallback(
        (matchcode: string, options: OptionItem[]) => {
            setFieldMetadata(matchcode, { options });
        },
        [setFieldMetadata],
    );

    /**
     * Clear runtime options for a field
     */
    const clearFieldOptions = useCallback(
        (matchcode: string) => {
            setFieldMetadata(matchcode, { options: [] });
        },
        [setFieldMetadata],
    );

    /**
     * Get all field metadata
     */
    const getAllFieldMetadata = useCallback((): Record<string, FieldMetadata> => {
        return store.fieldMetadata;
    }, [store]);
⟪?⟫
    const reset = useCallback(
        (...args: Parameters<typeof rhfReset>) => {
            rhfReset(...args);
            setStore({
                values: getValues(),
                errors: {},
                touched: {},
                isSubmitting: false,
                fieldMetadata: {},
            });
        },
        [rhfReset, getValues, setStore],
    );
⟪?⟫
    return useMemo(
        () => ({
            ...formMethods,
            updateField,
            validateField,
            clearStore,
            reset,
            getFieldMetadata,
            setFieldMetadata,
            setFieldDisabled,
            setFieldVisible,
            setFieldReadOnly,
            setFieldRequired,
            setFieldOptions,
            clearFieldOptions,
            getAllFieldMetadata,
        }),
        [
            formMethods,
            updateField,
            validateField,
            clearStore,
            reset,
            getFieldMetadata,
            setFieldMetadata,
            setFieldDisabled,
            setFieldVisible,
            setFieldReadOnly,
            setFieldRequired,
            setFieldOptions,
            clearFieldOptions,
            getAllFieldMetadata,
        ],
    );
}

// );----------------------------------------------

export { FormProvider };
