import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAddAccount } from '@/hooks/useAddAccount';
import { UseEditAccount } from '@/hooks/useEditAccounts';
import { useState } from 'react';

export function AccountDialog({ open, onOpenChange, account }) {
    const { addAccount, isLoading: isAdding } = useAddAccount();
    const { editAccount, isLoading: isEditing } = UseEditAccount();
    const isEditMode = !!account;
    const isLoading = isAdding || isEditing;

    const [role, setRole] = useState(account?.role ?? '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.set('role', role); // ← manually inject since Select isn't a native input
        const accountID = account?.id;

        if (isEditMode) {
            editAccount({ accountID, formData });
            onOpenChange(false);
        } else {
            addAccount(formData);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent key={account?.id ?? 'new'} className="sm:max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? 'Edit Account' : 'Add Account'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? 'Update the account details below.'
                                : 'Fill in the account details below.'}{' '}
                            Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-3 gap-4 py-4">
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={account?.email ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="developer">
                                        Developer
                                    </SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                minLength={1}
                                defaultValue={account?.password ?? ''}
                            />
                        </Field>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
