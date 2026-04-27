import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAccounts } from '@/hooks/useAccounts';
import { createAccountSchema } from '../schemas/account.schema';
import { ACCOUNT_FIELDS } from '../add-store-fields';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddAccountDialog({ onClose }) {
    const { createAccount, isCreating, isCreateError, createError } =
        useAccounts();

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            email: '',
            password: '',
            role: '',
        },
    });

    const onSubmit = async (data) => {
        if (isCreateError) {
            toast.error(`Account not created: ${createError}`, {
                position: 'top-center',
            });
        } else {
            await createAccount(data);
            toast.success('Account Created Successfully!', {
                position: 'top-center',
            });
        }
        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="md:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Add Account</DialogTitle>
                    <DialogDescription>
                        Fill in the following form to create a new store
                    </DialogDescription>
                </DialogHeader>

                <form id="add-store-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet>
                        {/* ===== Account Form ===== */}
                        <FieldGroup className="flex-col">
                            {ACCOUNT_FIELDS.map((f) => (
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
                        {/* ===== END Account Form */}
                    </FieldSet>

                    {/* Form Actions */}
                    <div className="mt-6">
                        <Button className="w-full" disabled={isCreating}>
                            {isCreating ? 'Adding Account...' : 'Add Account'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
