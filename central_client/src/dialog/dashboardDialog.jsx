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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddStore } from '@/hooks/useAddStores';
import { UseEditStores } from '@/hooks/useEditStores';

export function DashboardDialog({ open, onOpenChange, store }) {
    const { addStore, isLoading: isAdding } = useAddStore(); // ✅ call the hook
    const { editStore, isLoading: isEditing } = UseEditStores();

    const isEditMode = !!store;
    const isLoading = isAdding || isEditing;
    const config = store?.config?.[0] ?? {};

    // Handle form submission

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const storeID = store.id;
        if (isEditMode) {
            editStore({ storeID, formData, store }); // ✅ hook formats for edit
        } else {
            addStore(formData); // ✅ hook formats for add
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditMode ? 'Edit Store' : 'Add Store'}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditMode
                                ? 'Update the store details below.'
                                : 'Fill in the store details below.'}{' '}
                            Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Row 1 — 3 columns */}
                    <div className="grid grid-cols-3 gap-4 py-4">
                        <Field>
                            <Label htmlFor="store-id">Store ID</Label>
                            <Input
                                id="store-id"
                                name="store_id"
                                defaultValue={store?.store_id ?? ''}
                                // store_id shouldn't change on edit
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                defaultValue={store?.location ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                minLength={1}
                                defaultValue={store?.password ?? ''}
                            />
                        </Field>
                    </div>

                    {/* Row 2 — 6 columns (3+3 wrapped) */}
                    <div className="pb-3">
                        <DialogTitle>CONFIG</DialogTitle>
                        <DialogDescription>
                            Fill in the config details below.
                        </DialogDescription>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pb-4">
                        <Field>
                            <Label htmlFor="connection-type">
                                Connection Type
                            </Label>
                            <Input
                                id="connection-type"
                                name="connection_type"
                                defaultValue={config?.connection_type ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="db-user">DB User</Label>
                            <Input
                                id="db-user"
                                name="db_user"
                                defaultValue={config?.db_user ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="db-password">DB Password</Label>
                            <Input
                                id="db-password"
                                name="db_password"
                                type="password"
                                defaultValue={config?.db_password ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="host">Host</Label>
                            <Input
                                id="host"
                                name="host"
                                defaultValue={config?.host ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="port">Port</Label>
                            <Input
                                id="port"
                                name="port"
                                defaultValue={config?.port ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="database">Database</Label>
                            <Input
                                id="database"
                                name="database"
                                defaultValue={config?.db_name ?? ''}
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="imagepath">Imagepath</Label>
                            <Input
                                id="imagepath"
                                name="imagepath"
                                defaultValue={config?.image_path ?? ''}
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
