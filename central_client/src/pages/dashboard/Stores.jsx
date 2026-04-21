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
];

function StoresTab() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { data, isLoading, isError, error } = useStores();
    console.log(data);

    // if (isLoading) return <p>Loading...</p>;
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-5 py-3 border border-gray-200 rounded-md shadow-sm">
                <h1 className="text-lg font-bold">Stores</h1>
                <Button onClick={() => setDialogOpen(true)} size="sm">
                    <Plus />
                    Add Store
                </Button>
            </div>

            <DashboardDialog open={dialogOpen} onOpenChange={setDialogOpen} />
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* {data.map((store) => (
                        <TableRow key={store.store_id}>
                            <TableCell>{store.store_id}</TableCell>
                            <TableCell>{store.location}</TableCell>
                            <TableCell>{store.password}</TableCell>
                            <TableCell>{store.connection_type}</TableCell>
                            <TableCell>{store.db_user}</TableCell>
                            <TableCell>{store.db_password}</TableCell>
                            <TableCell>{store.host}</TableCell>
                            <TableCell>{store.port}</TableCell>
                            <TableCell>{store.db}</TableCell>
                            <TableCell>{store.image_path}</TableCell>
                        </TableRow>
                    ))} */}
                </TableBody>
            </Table>
        </div>
    );
}

export { StoresTab };
