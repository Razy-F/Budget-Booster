import { cn } from "@/lib/utils";
function TransactionPage() {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Transactions history</p>
          </div>
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                    <span>Pick a date</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionPage;
