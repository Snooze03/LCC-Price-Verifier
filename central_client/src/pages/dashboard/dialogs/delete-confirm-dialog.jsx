import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteConfirmationDialog({
    title,
    description,
    onClose,
    onDelete,
    isDeleting = false,
    confirmText = 'Delete',
}) {
    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description ||
                            'This action cannot be undone. This will permanently remove this data from the servers.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-3 mt-1">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground text-white hover:bg-destructive/90"
                    >
                        {isDeleting ? 'Deleting...' : confirmText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
