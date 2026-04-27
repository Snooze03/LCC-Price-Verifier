import { Plus } from 'lucide-react';
import { useState } from 'react';

import { useAccounts } from '@/hooks/useAccounts';
import { ACCOUNT_COLUMNS } from './columns';
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
import { TableActionMenu } from './components/table-action-menu';
import { EmptyState } from '@/components/empty-state';
import { AddAccountDialog } from './dialogs/account-dialog';

function AccountsTab() {
    const { accounts, isPending, isError, error } = useAccounts();
    const [activeDialog, setActiveDialog] = useState();

    if (isPending) return <h1>Loading...</h1>;

    const handleAddAccount = () => {
        setActiveDialog('add');
    };

    const handleEditAccount = () => {
        setActiveDialog('edit');
    };

    const handleDeleteAccount = () => {
        setActiveDialog('delete');
    };

    const handleCloseDialog = () => {
        setActiveDialog(null);
    };

    return (
        <>
            <div className="space-y-6">
                <TabHeader>
                    <TabTitle>Accounts</TabTitle>
                    <Button
                        onClick={handleAddAccount}
                        size="sm"
                        className="bg-[#293041] hover:bg-[#3F4759]"
                    >
                        <Plus />
                        Add Account
                    </Button>
                </TabHeader>

                {accounts.length === 0 ? (
                    <EmptyState
                        title="No Accounts added yet"
                        description="Add an account using the add account button"
                    />
                ) : (
                    <Table className="shadow-xl">
                        <TableHeader>
                            <TableRow className="hover:bg-inherit">
                                {ACCOUNT_COLUMNS.map((col) => (
                                    <TableHead key={col}>{col}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.map((account) => {
                                const [id, ...accountValues] =
                                    Object.values(account);

                                return (
                                    <TableRow
                                        key={account.id}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        {accountValues.map((value) => (
                                            <TableCell
                                                key={value}
                                                className="max-w-25 truncate"
                                            >
                                                {value}
                                            </TableCell>
                                        ))}

                                        <TableCell>
                                            <TableActionMenu
                                                handleEdit={handleEditAccount}
                                                handleDelete={
                                                    handleDeleteAccount
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>

            {activeDialog === 'add' && (
                <AddAccountDialog onClose={handleCloseDialog} />
            )}
        </>
    );
}

export { AccountsTab };
