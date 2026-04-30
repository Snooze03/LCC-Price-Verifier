import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStores } from '@/hooks/useStores';
import { createStoreSchema } from '@/schemas/auth/store.schema';
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
    FieldTitle,
} from '@/components/ui/field';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STORE_FIELDS, CONFIG_FIELDS } from '../form-fields';

export function StoreDialog({ store, onClose }) {
    const { createStore, isCreating, isCreateError, createError } = useStores();
    const { updateStore, isUpdating, isUpdateError, updateError } = useStores();

    let defaultValues = null;
    const dialogState = store ? 'edit' : 'add';

    switch (dialogState) {
        case 'add':
            defaultValues = {
                store_id: '',
                password: '',
                location: '',
                endpoint: '',
                connection_type: '',
                db_user: '',
                db_password: '',
                host: '',
                port: '',
                db_name: '',
                image_path: '',
            };

            break;
        case 'edit':
            const { id: storeID, ...storeData } = store; // get store fields
            const { id: configID, store_id, ...configData } = store.config[0]; // Get store config fields

            defaultValues = {
                ...storeData,
                ...configData,
            };

            break;
    }

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(createStoreSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const onSubmit = async (data) => {
        switch (dialogState) {
            case 'add':
                await createStore(data);
                break;
            case 'edit':
                const {
                    id,
                    store_id,
                    password,
                    location,
                    endpoint,
                    ...config
                } = data;
                config.id = store.config[0].id;

                const formattedData = {
                    id: store.id,
                    store_id,
                    password,
                    location,
                    endpoint,
                    config: [config],
                };

                await updateStore(formattedData);

                break;
        }

        if (isCreateError || isUpdateError) {
            toast.error(
                `An Error has Occurred: ${createError || updateError}`,
                {
                    position: 'top-center',
                },
            );
        } else {
            toast.success(
                `Store ${dialogState === 'edit' ? 'Edited' : 'Created'} Successfully!`,
                {
                    position: 'top-center',
                },
            );
        }

        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {dialogState === 'edit' ? 'Edit' : 'Create'} Store
                    </DialogTitle>
                    <DialogDescription>
                        {dialogState === 'edit'
                            ? 'Edit the fields and press Update to save your changes'
                            : 'Fill in the following form to create a new Store'}
                    </DialogDescription>
                </DialogHeader>

                <form id="add-store-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet>
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
                        <Button className="w-full" disabled={isCreating}>
                            {isCreating
                                ? 'Adding Store...'
                                : isUpdating
                                  ? 'Updating Store...'
                                  : store
                                    ? 'Update Store'
                                    : 'Create Store'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
