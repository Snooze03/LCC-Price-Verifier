import { Plus } from 'lucide-react';
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
import { TabHeader, TabTitle } from './components/tab-header';
import { useAccounts } from '@/hooks/useAccounts';
import { ACCOUNT_COLUMNS } from './columns';
import { TableActionMenu } from './components/table-action-menu';

function AccountsTab() {
    const { accounts, isPending, isError, error } = useAccounts();
    console.log(accounts);

    if (isPending) return <h1>Loading...</h1>;

    const handleEditAccount = () => {};

    const handleDeleteAccount = () => {};

    return (
        <div className="space-y-6">
            <TabHeader>
                <TabTitle>Accounts</TabTitle>
            </TabHeader>

            <Table className="shadow-xl">
                <TableHeader>
                    <TableRow className="hover:bg-inherit">
                        {ACCOUNT_COLUMNS.map((col) => (
                            <TableHead key={col}>{col}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {accounts.map((account) => (
                        <TableRow
                            key={account.id}
                            className="cursor-pointer hover:bg-gray-100"
                        >
                            {/* Store Values */}
                            <TableCell>{account.email}</TableCell>
                            <TableCell className="max-w-25 truncate">
                                {account.password}
                            </TableCell>
                            <TableCell>{account.role}</TableCell>

                            {/* Action Menu */}
                            <TableCell>
                                <TableActionMenu
                                    handleEdit={handleEditAccount}
                                    handleDelete={handleDeleteAccount}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export { AccountsTab };
