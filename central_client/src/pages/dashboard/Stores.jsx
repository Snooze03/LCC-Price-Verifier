import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { useStores } from '@/hooks/useStores';
import { STORE_COLUMNS } from './constants/columns';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TabHeader, TabTitle } from './components/tab-header';
import { TableActionMenu } from './components/table-action-menu';
import { DeleteConfirmationDialog } from './dialogs/delete-confirm-dialog';
import { StoreDialog } from './dialogs/store-dialog';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';

export function StoresTab() {
    // Fetch stores
    const { stores, isPending, deleteStore, isDeleting } = useStores();

    // State for Dialogs
    const [selectedStore, setSelectedStore] = useState();
    const [activeDialog, setActiveDialog] = useState(null);

    if (isPending) return <h1>Loading...</h1>;

    // ===== EVENT HANDLERS =====
    const onDeleteStore = () => {
        const store_id = selectedStore.store_id;

        deleteStore(store_id, {
            onSuccess: () => {
                toast.success('Store Deleted Successfully!', {
                    position: 'top-center',
                });
                handleCloseDialog();
            },
            onError: (error) => {
                toast.error(`Could not delete Store: ${error}`, {
                    position: 'top-center',
                });
            },
        });
    };

    const handleCloseDialog = () => {
        setActiveDialog(null);
        setSelectedStore(null);
    };

    return (
        <>
            <div className="space-y-6 max-w-234">
                {/* Header */}
                <TabHeader>
                    <TabTitle>Store Branches</TabTitle>
                    <Button
                        onClick={() => setActiveDialog('add')}
                        size="sm"
                        className="bg-[#293041] hover:bg-[#3F4759]"
                    >
                        <Plus />
                        Add Store
                    </Button>
                </TabHeader>

                {stores.length === 0 ? (
                    <EmptyState
                        title="No Stores added yet"
                        description="Add stores using the add store button"
                    />
                ) : (
                    <Table className="shadow-xl">
                        <TableHeader>
                            <TableRow className="hover:bg-inherit">
                                {STORE_COLUMNS.map((col) => (
                                    <TableHead key={col}>{col}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stores.map((store) => {
                                // get config for each store
                                const config = store.config[0];
                                const [
                                    configId,
                                    configStoreID,
                                    ...configValues
                                ] = Object.values(config);

                                return (
                                    <TableRow
                                        key={store.store_id}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        {/* Store Values */}
                                        <TableCell>{store.store_id}</TableCell>
                                        <TableCell>{store.location}</TableCell>
                                        <TableCell className="max-w-30 truncate">
                                            {store.password}
                                        </TableCell>
                                        <TableCell className="max-w-25 truncate">
                                            {store.endpoint}
                                        </TableCell>

                                        {/* Config Values */}
                                        {configValues.map((value, index) => (
                                            <TableCell
                                                key={index + value}
                                                className="max-w-25 truncate"
                                            >
                                                {value}
                                            </TableCell>
                                        ))}

                                        {/* Action Menu */}
                                        <TableCell>
                                            <TableActionMenu
                                                handleEdit={() => {
                                                    setSelectedStore(store);
                                                    setActiveDialog('edit');
                                                }}
                                                handleDelete={() => {
                                                    setSelectedStore(store);
                                                    setActiveDialog('delete');
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Dialogs */}
            {activeDialog === 'add' && (
                <StoreDialog onClose={handleCloseDialog} />
            )}

            {activeDialog === 'edit' && (
                <StoreDialog
                    store={selectedStore}
                    onClose={handleCloseDialog}
                />
            )}

            {activeDialog === 'delete' && (
                <DeleteConfirmationDialog
                    title="Delete Store"
                    onClose={handleCloseDialog}
                    onDelete={onDeleteStore}
                    isDeleting={isDeleting}
                />
            )}
        </>
    );
}
