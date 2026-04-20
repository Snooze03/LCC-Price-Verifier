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

import { useStores } from '@/hooks/useStores';

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
    const { data, isLoading, isError, error } = useStores();
    console.log(data);

    if (isLoading) return <p>Loading...</p>;
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-5 py-3 border border-gray-200 rounded-md shadow-sm">
                <h1 className="text-lg font-bold">Stores</h1>
                <Button size="sm">
                    <Plus />
                    Add Store
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((store) => (
                        <TableRow key={store.store_id}>
                            <TableCell>{store.store_id}</TableCell>
                            <TableCell>{store.location}</TableCell>
                            <TableCell>{store.password}</TableCell>
                            <TableCell>{store.db_connection_string}</TableCell>
                            <TableCell>{store.db_user_name}</TableCell>
                            <TableCell>{store.db_password}</TableCell>
                            <TableCell>{store.image_path}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export { StoresTab };
