import { Calendar } from "@/components/ui/calendar";
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
                <Calendar
                  autoFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  numberOfMonths={2}
                  onSelect={(value) => {
                    if (!value || !value.from || !value.to) return;
                    const { from, to } = value;
                    if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                      toast.error(
                        "The selected date range is too big. Max allowed range is " +
                          MAX_DATE_RANGE_DAYS +
                          " days!",
                      );
                      return;
                    }

                    setDate({
                      from: date.from,
                      to: date.to,
                    });
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionPage;
