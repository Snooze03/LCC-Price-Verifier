import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useStores } from '@/hooks/useStores';
import { TabHeader, TabTitle } from './components/tab-header';
import { TableActionMenu } from './components/table-action-menu';
import { Button } from '@/components/ui/button';
import { AddStoreDialog } from './dialogs/add-store-dialog';
import { DeleteConfirmationDialog } from './dialogs/delete-confirm-dialog';
import { STORE_COLUMNS } from './columns';

export function StoresTab() {
    // Fetch stores
    const { stores, isPending, isError, error } = useStores();
    const { deleteStore, isDeleting, isDeleteError, deleteError } = useStores();

    // State for Dialogs
    const [selectedStore, setSelectedStore] = useState();
    const [activeDialog, setActiveDialog] = useState(null);

    if (isPending) return <h1>Loading...</h1>;

    // ===== EVENT HANDLERS =====
    const handleAddStore = () => {
        setActiveDialog('add');
    };

    const onDeleteStore = () => {
        const store_id = selectedStore.store_id;
        deleteStore(store_id);

        if (isDeleteError) {
            toast.error(`Could not delete Store: ${deleteError}`, {
                position: 'top-center',
            });
        } else {
            toast.success('Store Deleted Successfully!', {
                position: 'top-center',
            });
        }
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setActiveDialog(null);
        setSelectedStore(null);
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <TabHeader>
                    <TabTitle>Store Branches</TabTitle>
                    <Button
                        onClick={handleAddStore}
                        size="sm"
                        className="bg-[#293041] hover:bg-[#3F4759]"
                    >
                        <Plus />
                        Add Store
                    </Button>
                </TabHeader>

                {/* Table */}
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
                            const [configId, configStoreID, ...configValues] =
                                Object.values(config);

                            return (
                                <TableRow
                                    key={store.store_id}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    {/* Store Values */}
                                    <TableCell>{store.store_id}</TableCell>
                                    <TableCell>{store.location}</TableCell>
                                    <TableCell className="max-w-25 truncate">
                                        {store.password}
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
            </div>

            {/* Dialogs */}
            {activeDialog === 'add' && (
                <AddStoreDialog
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
