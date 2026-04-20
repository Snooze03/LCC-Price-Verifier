import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { DashboardModal } from '@/modals/dashboardModal';

export function DashboardRoot() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            {showModal && <DashboardModal setShowModal={setShowModal} />}
            <div className="flex flex-row p-3 gap-4 justify-end ">
                <button className="w-30 h-10 border rounded-md bg-[#A3ABC0] hover:bg-[#BFC6DC] shadow-lg text-sm p-1">
                    Edit Branch
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-40 h-10 border text-white shadow-lg rounded-md bg-[#002B73] hover:bg-[#0040A2] text-sm p-1"
                >
                    Add New Branch
                </button>
            </div>
            <div className="p-6">
                <div className="rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                    {/* ✅ rounded + overflow-hidden together */}
                    <Table>
                        <TableCaption className="mb-4">
                            A list of your current accounts.
                        </TableCaption>
                        <TableHeader>
                            <TableRow className="bg-[#344573] text-xs hover:bg-[#344573]">
                                <TableHead className="w-[100px] text-white">
                                    Store Id
                                </TableHead>
                                <TableHead className="text-white">
                                    Location
                                </TableHead>
                                <TableHead className="text-white">
                                    Password
                                </TableHead>
                                <TableHead className="text-white ">
                                    DB Connection String
                                </TableHead>
                                <TableHead className="text-white ">
                                    DB Username
                                </TableHead>
                                <TableHead className="text-white ">
                                    DB Password
                                </TableHead>
                                <TableHead className="text-white">
                                    Image Path
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    INV001
                                </TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-left">
                                    $250.00
                                </TableCell>
                                <TableCell>/images/store1.png</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
