import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAccounts } from '@/hooks/useAccounts';
import { createAccountSchema } from '@/schemas/auth/account.schema';
import { ACCOUNT_FIELDS } from '../form-fields';
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
    // Custom Hooks
    const { createAccount, isCreating, isCreateError, createError } =
        useAccounts();
    const { updateAccount, isUpdating, isUpdateError, updateError } =
        useAccounts();

    let defaultValues = null;
    const dialogState = account ? 'edit' : 'add';

    // Sets default form values depending on dialog statae
    switch (dialogState) {
        case 'add':
            defaultValues = {
                email: '',
                password: '',
                role: '',
            };
            break;

        case 'edit':
            defaultValues = {
                email: account.email,
                password: account.password,
                role: account.role,
            };
            break;
    }

    const { handleSubmit, control } = useForm({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const onSubmit = async (data) => {
        switch (dialogState) {
            case 'add':
                createAccount(data);

                break;
            case 'edit':
                const formattedData = {
                    id: account.id,
                    ...data,
                };
                updateAccount(formattedData);

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
                `Account ${dialogState === 'add' ? 'Created' : 'Edited'}  Successfully!`,
                {
                    position: 'top-center',
                },
            );
        }

        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="md:max-w-sm">
                <DialogHeader>
                    <DialogTitle>
                        {dialogState === 'add' ? 'Add Account' : 'Edit Account'}
                    </DialogTitle>
                    <DialogDescription>
                        {dialogState === 'add'
                            ? 'Fill in the form to create a new account'
                            : 'Edit the values and press Update to save changes'}
                    </DialogDescription>
                </DialogHeader>

                <form id="store-form" onSubmit={handleSubmit(onSubmit)}>
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
                            {isCreating
                                ? 'Adding Account...'
                                : isUpdating
                                  ? 'Updating Account...'
                                  : account
                                    ? 'Update Account'
                                    : 'Create Account'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
