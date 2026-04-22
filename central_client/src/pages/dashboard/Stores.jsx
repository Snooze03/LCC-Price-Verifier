import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DashboardDialog } from '@/dialog/dashboardDialog';
import { useStores } from '@/hooks/useStores';
import { useState } from 'react';

const columns = [
    'Store ID',
    'Location',
    'Password',
    'Connection Type',
    'DB User',
    'DB Password',
    'Host',
    'Port',
    'Database',
    'Image Path',
];

function StoresTab() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null); // ✅ track clicked store
    const { data, isLoading, isError, error } = useStores();
    console.log('stores', data);

    if (isLoading) return <p>Loading...</p>;

    const handleRowClick = (store) => {
        setSelectedStore(store); // ✅ set the clicked store
        setDialogOpen(true); // ✅ open dialog
    };

    const handleAddClick = () => {
        setSelectedStore(null); // ✅ clear store so dialog is in "add" mode
        setDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-5 py-3 border border-gray-200 rounded-md shadow-sm">
                <h1 className="text-lg font-bold">Stores</h1>
                <Button onClick={() => setDialogOpen(true)} size="sm">
                    <Plus />
                    Add Store
                </Button>
            </div>

            <DashboardDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                store={selectedStore}
            />
            <Table>
                <TableHeader className="bg-[#344573]">
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead className="text-white" key={col}>
                                {col}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((store) => {
                        const config = store.config?.[0] ?? {};
                        return (
                            <TableRow
                                key={store.store_id}
                                onClick={() => handleRowClick(store)} // ✅ click handler
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <TableCell>{store.store_id}</TableCell>
                                <TableCell>{store.location}</TableCell>
                                <TableCell className="max-w-[100px] truncate">
                                    {store.password}
                                </TableCell>
                                {console.log('fix', store)}
                                <TableCell>{config.connection_type}</TableCell>
                                <TableCell>{config.db_user}</TableCell>
                                <TableCell>{config.db_password}</TableCell>
                                <TableCell>{config.host}</TableCell>
                                <TableCell>{config.port}</TableCell>
                                <TableCell>{config.db_name}</TableCell>
                                <TableCell>{config.image_path}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export { StoresTab };
