import { useState } from 'react';
import { Plus } from 'lucide-react';

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
import { DeleteStoreDialog } from './dialogs/delete-store-dialog';
import { STORE_COLUMNS } from './columns';

export function StoresTab() {
    // Fetch stores
    const { stores, isPending, isError, error } = useStores();

    // State for Dialogs
    const [selectedStore, setSelectedStore] = useState();
    const [activeDialog, setActiveDialog] = useState(null);

    if (isPending) return <h1>Loading...</h1>;

    // ===== EVENT HANDLERS =====
    const handleAddStore = () => {
        console.log('Add Store');
        setActiveDialog('add');
    };

    const handleEditStore = (store) => {
        setSelectedStore(store);
        setActiveDialog('edit');
    };

    const handleDeleteStore = (store) => {
        setSelectedStore(store);
        setActiveDialog('delete');
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
                                        <TableCell key={index + value}>
                                            {value}
                                        </TableCell>
                                    ))}

                                    {/* Action Menu */}
                                    <TableCell>
                                        <TableActionMenu
                                            handleEdit={() =>
                                                handleEditStore(store)
                                            }
                                            handleDelete={() =>
                                                handleDeleteStore(store)
                                            }
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
                <DeleteStoreDialog
                    store={selectedStore}
                    onClose={handleCloseDialog}
                />
            )}
        </>
    );
}
