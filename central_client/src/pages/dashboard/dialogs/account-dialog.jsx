import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAccounts } from '@/hooks/useAccounts';
import { createAccountSchema } from '@/schemas/auth/account.schema';
import { ACCOUNT_FIELDS } from '../constants/form-fields';
import { ACCOUNT_DEFAULT_VALUES } from '../constants/default-values';
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

export function AccountDialog({ account, onClose }) {
    // Dialog state/mode
    const isEdit = !!account;

    const { createAccount, isCreating, updateAccount, isUpdating } =
        useAccounts();
    const isLoading = isCreating || isUpdating;

    // Sets default form values based on dialog state
    const { handleSubmit, control } = useForm({
        resolver: zodResolver(createAccountSchema),
        values: isEdit
            ? {
                  email: account.email,
                  password: account.password,
                  role: account.role,
              }
            : ACCOUNT_DEFAULT_VALUES,
    });

    const onSubmit = async (data) => {
        const action = isEdit ? updateAccount : createAccount;
        const payload = isEdit ? { id: account.id, ...data } : data;

        action(payload, {
            onSuccess: () => {
                toast.success(
                    `Account ${isEdit ? 'Updated' : 'Created'} Successfully!`,
                    { position: 'top-center' },
                );
                onClose();
            },
            onError: (error) => {
                toast.error(
                    `Error: ${error.message || 'Something went wrong'}`,
                    { position: 'top-center' },
                );
            },
        });
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="md:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Account' : 'Add Account'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Edit the values and press Update to save changes'
                            : 'Fill in the form to create a new account'}
                    </DialogDescription>
                </DialogHeader>

                <form id="account-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet disabled={isLoading}>
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
                        <Button className="w-full" disabled={isLoading}>
                            {isLoading
                                ? 'Processing...'
                                : isEdit
                                  ? 'Update Account'
                                  : 'Create Account'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
