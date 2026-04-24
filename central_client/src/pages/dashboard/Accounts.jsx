import { useState } from 'react';
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
import { useAccount } from '@/hooks/useAccounts';
import { AccountDialog } from '@/dialog/accountDialog';

const columns = ['Email', 'Role', 'Password'];

function AccountsTab() {
    const { data, isLoading, isError, error } = useAccount();
    const [selectedAccount, setSelectedAccount] = useState(null);

    if (isLoading)
        return <p className="p-4 text-sm text-gray-500">Loading accounts...</p>;
    if (isError)
        return (
            <p className="p-4 text-sm text-red-500">Error: {error?.message}</p>
        );

    const handleRowClick = (account) => {
        setSelectedAccount(account);
    };

    const handleAddClick = () => {
        setSelectedAccount(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-5 py-3 border border-gray-200 rounded-md shadow-sm">
                <h1 className="text-lg font-bold">Accounts</h1>
                <Button
                    onClick={handleAddClick}
                    size="sm"
                    className="bg-[#293041] hover:bg-[#3F4759]"
                >
                    <Plus />
                    Add Account
                </Button>
            </div>
            <AccountDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                account={selectedAccount}
            />
            <Table className="shadow-xl">
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
                    {(data ?? []).map((account) => (
                        <TableRow
                            key={account.id}
                            onClick={() => handleRowClick(account)}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            <TableCell>{account.email}</TableCell>
                            <TableCell>{account.role}</TableCell>
                            <TableCell className="max-w-[100px] truncate">
                                {account.password}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export { AccountsTab };
