import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStores } from '@/hooks/useStores';
import { createStoreSchema } from '@/schemas/auth/store.schema';
import { STORE_DEFAULT_VALUES } from '../constants/default-values';
import { STORE_FIELDS, CONFIG_FIELDS } from '../constants/form-fields';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function StoreDialog({ store, onClose }) {
    // Dialog State
    const isEdit = !!store;

    const { createStore, isCreating, updateStore, isUpdating } = useStores();
    const isLoading = isCreating || isUpdating;

    const initialValue = isEdit
        ? {
              ...store,
              ...store.config[0],
          }
        : STORE_DEFAULT_VALUES;

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(createStoreSchema),
        values: initialValue,
    });

    const onSubmit = async (data) => {
        if (isEdit) {
            const { id, store_id, password, location, endpoint, ...config } =
                data;
            config.id = store.config[0].id;

            data = {
                id: store.id,
                store_id,
                password,
                location,
                endpoint,
                config: [config],
            };
        }

        const action = isEdit ? updateStore : createStore;

        action(data, {
            onSuccess: () => {
                toast.success(
                    `Store ${isEdit ? 'Edited' : 'Created'} Successfully!`,
                    {
                        position: 'top-center',
                    },
                );
                onClose();
            },
            onError: (error) => {
                toast.error(`Error: ${error || 'Something went wrong'}`, {
                    position: 'top-center',
                });
            },
        });
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit' : 'Create'} Store
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Edit the fields and press Update to save your changes'
                            : 'Fill in the following form to create a new Store'}
                    </DialogDescription>
                </DialogHeader>

                <form id="store-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet disabled={isLoading}>
                        {/* ===== Store Account Form ===== */}
                        <FieldContent>
                            <FieldLegend>Store Account</FieldLegend>
                            <FieldDescription>
                                Account credentials for local server
                            </FieldDescription>
                        </FieldContent>
                        <FieldGroup className="flex-row">
                            {STORE_FIELDS.map((f) => (
                                <Controller
                                    key={f.name}
                                    name={f.name}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor={f.name}>
                                                {f.label}
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={f.name}
                                                type={f.type || 'text'}
                                                placeholder={
                                                    f.placeholder || ''
                                                }
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            ))}
                        </FieldGroup>
                        {/* ===== END Store Account Form */}

                        <FieldSeparator />

                        {/* ===== Store Configuration Form */}
                        <FieldContent>
                            <FieldLegend>Server Configuration</FieldLegend>
                            <FieldDescription>
                                Configure the database connection and image
                                directory for the local server
                            </FieldDescription>
                        </FieldContent>
                        <FieldGroup className="grid grid-cols-3">
                            {CONFIG_FIELDS.map((f) => (
                                <Controller
                                    key={f.name}
                                    name={f.name}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel htmlFor={f.name}>
                                                {f.label}
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={f.name}
                                                type={f.type || 'text'}
                                                placeholder={
                                                    f.placeholder || ''
                                                }
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            ))}
                        </FieldGroup>
                        {/* ===== END Store Configuration Form ===== */}
                    </FieldSet>

                    {/* Form Actions */}
                    <div className="mt-6">
                        <Button className="w-full" disabled={isLoading}>
                            {isLoading
                                ? 'Processing...'
                                : isEdit
                                  ? 'Update Store'
                                  : 'Create Store'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
