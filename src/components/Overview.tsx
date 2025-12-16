"use client";

import { UserSettings } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
function Overview({ userSettings }: { userSettings: UserSettings }) {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <div>
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-2 size-4 opacity-50" />
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
                          " days!"
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
  );
}

export default Overview;
