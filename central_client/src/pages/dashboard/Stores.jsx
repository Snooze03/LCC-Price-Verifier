import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

import { useStores } from '@/hooks/useStores';
import { TableActionMenu } from './table-action-menu';

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
    'Actions',
];

function StoresTab() {
    const { stores, isPending, isError, error } = useStores();

    if (isPending) return <h1>Loading...</h1>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border border-gray-200 rounded-md shadow-sm">
                <h1 className="text-lg font-bold">Stores</h1>
                <Button size="sm" className="bg-[#293041] hover:bg-[#3F4759]">
                    <Plus />
                    Add Store
                </Button>
            </div>

            {/* Table */}
            <Table className="shadow-xl">
                <TableHeader>
                    <TableRow className="hover:bg-inherit">
                        {columns.map((col) => (
                            <TableHead key={col}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {stores.map((store) => {
                        const config = store.config[0];
                        const [id, store_id, ...configValues] =
                            Object.values(config);

                        return (
                            <TableRow
                                key={store.store_id}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <TableCell>{store.store_id}</TableCell>
                                <TableCell>{store.location}</TableCell>
                                <TableCell className="max-w-25 truncate">
                                    {store.password}
                                </TableCell>

                                {configValues.map((value, index) => (
                                    <TableCell key={index + value}>
                                        {value}
                                    </TableCell>
                                ))}

                                <TableActionMenu />
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export { StoresTab };
