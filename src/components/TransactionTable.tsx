import { GetTransactionHistoryResType } from "@/app/api/transaction-history/route";
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
];


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
