import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStores } from '@/hooks/useStores';
import { createAccountSchema } from '../schemas/account.schema';
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
import { STORE_FIELDS, CONFIG_FIELDS } from '../add-store-fields';

export function AddStoreDialog({ onClose }) {
    const { createStore, isCreating, isCreateError, createError } = useStores();

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            email: '',
            password: '',
            role: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            await createStore(data);
            toast.success('Store Created Successfully!', {
                position: 'top-center',
            });
            onClose();
        } catch (error) {
            toast.error(`Store not created: ${createError?.message}`, {
                position: 'top-center',
            });
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="md:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Add Store</DialogTitle>
                    <DialogDescription>
                        Fill in the following form to create a new store
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
                    </FieldSet>

                    {/* Form Actions */}
                    <div className="mt-6">
                        <Button className="w-full" disabled={isCreating}>
                            {isCreating ? 'Adding Store...' : 'Add Store'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
