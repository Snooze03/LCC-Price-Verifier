import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useStores } from '@/hooks/useStores';
import { Button } from '@/components/ui/button';

export function DeleteStoreDialog({ store, onClose }) {
    const { deleteStore, response, isDeleting } = useStores();
    const { store_id, password, location } = store;

    const handleDelete = () => {
        deleteStore(store_id);
        onClose();
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete <span className="font-bold">{location}</span>{' '}
                        Store
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the store and remove its data from the database.
                    </DialogDescription>
                </DialogHeader>
                <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive"
                >
                    Yes
                </Button>
            </DialogContent>
        </Dialog>
    );
}
