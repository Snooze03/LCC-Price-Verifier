import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

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
import { DeleteConfirmationDialog } from './dialogs/delete-confirm-dialog';

function AccountsTab() {
    // Hooks
    const { accounts, isPending, isError, error } = useAccounts();
    const { deleteAccount, isDeleting, isDeleteError, deleteError } =
        useAccounts();

    // States
    const [selectedAccount, setSelectedAccount] = useState();
    const [activeDialog, setActiveDialog] = useState();

    if (isPending) return <h1>Loading...</h1>;

    // ===== EVENT HANDLERS =====
    const handleAddAccount = () => {
        setActiveDialog('add');
    };

    const onDeleteAccount = () => {
        deleteAccount(selectedAccount.id);
        if (isDeleteError) {
            toast.error(`Cloud not delete account: ${deleteError}`, {
                position: 'top-center',
            });
        } else {
            toast.success('Account Deleted Successfully!', {
                position: 'top-center',
            });
        }
        handleCloseDialog();
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
                                                handleEdit={() => {
                                                    setSelectedAccount(account);
                                                    setActiveDialog('edit');
                                                }}
                                                handleDelete={() => {
                                                    setSelectedAccount(account);
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

            {activeDialog === 'add' && (
                <AddAccountDialog onClose={handleCloseDialog} />
            )}

            {activeDialog === 'delete' && (
                <DeleteConfirmationDialog
                    title="Delete Account"
                    onClose={handleCloseDialog}
                    onDelete={onDeleteAccount}
                    isDeleting={isDeleting}
                />
            )}
        </>
    );
}

export { AccountsTab };
