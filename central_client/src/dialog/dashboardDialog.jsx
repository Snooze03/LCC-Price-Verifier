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

export function DashboardDialog({ open, onOpenChange }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <form>
                    <DialogHeader>
                        <DialogTitle>Add Store</DialogTitle>
                        <DialogDescription>
                            Fill in the store details below. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Row 1 — 3 columns */}
                    <div className="grid grid-cols-3 gap-4 py-4">
                        <Field>
                            <Label htmlFor="store-id">Store ID</Label>
                            <Input id="store-id" name="store_id" />
                        </Field>
                        <Field>
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" />
                        </Field>
                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
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
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="db-user">DB User</Label>
                            <Input id="db-user" name="db_user" />
                        </Field>
                        <Field>
                            <Label htmlFor="db-password">DB Password</Label>
                            <Input
                                id="db-password"
                                name="db_password"
                                type="password"
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="host">Host</Label>
                            <Input id="host" name="host" />
                        </Field>
                        <Field>
                            <Label htmlFor="port">Port</Label>
                            <Input id="port" name="port" />
                        </Field>
                        <Field>
                            <Label htmlFor="database">Database</Label>
                            <Input id="database" name="database" />
                        </Field>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
