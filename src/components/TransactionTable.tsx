import { GetTransactionHistoryResType } from "@/app/api/transaction-history/route";
import { DataTableColumnHeader } from "./dataTable/ColumnHeader";
export type TransactionHistoryRow = GetTransactionHistoryResType[0];
const columns: ColumnDef<TransactionHistoryRow>[] = [
  {
    accessorKey: "category",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Category" />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell({ row }) {
      return (
        <div className="flex gap-2 capitalize">
          {row.original.categoryIcon}
          <div className="capitalize">{row.original.category}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
    cell({ row }) {
      return <div className="capitalize">{row.original.description}</div>;
    },
  },
  {
    accessorKey: "date",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Category" />;
    },
    cell({ row }) {
      const date = new Date(row.original.date);
      const formattedDate = date.toLocaleDateString("default", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return <div className="text-muted-foreground">{formattedDate}</div>;
    },
  },

function TransactionTable({ from, to }: { from: Date; to: Date }) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-2 py-4">
        <div className="flex gap-2">
      </div>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
        </div>
    </div>
  );
}

export default TransactionTable;

function RowActions({ transaction }: { transaction: TransactionHistoryRow }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={() => {
            setShowDeleteDialog((prev) => !prev);
          }}
        >
          <TrashIcon className="size-4 text-muted-foreground" />
          <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
