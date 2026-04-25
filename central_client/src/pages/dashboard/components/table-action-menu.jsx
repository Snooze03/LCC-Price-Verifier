import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Trash, Pencil } from 'lucide-react';

export function TableActionMenu({ handleEdit, handleDelete }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                <DropdownMenuGroup>
                    {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                    <DropdownMenuItem onClick={handleEdit}>
                        <Pencil />
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="text-destructive focus:bg-red-300 focus:text-red-500"
                    >
                        <Trash className="focus:text-red-500" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
