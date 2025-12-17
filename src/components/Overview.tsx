"use client";

import { UserSettings } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { differenceInDays, format, startOfMonth } from "date-fns";
import { useState } from "react";

import { MAX_DATE_RANGE_DAYS } from "@/constants";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CategoriesStats from "./CategoriesStats";
import StatsCards from "./StatsCards";

import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
function Overview({ userSettings }: { userSettings: UserSettings }) {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <div>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
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
      </div>
      <div className="container flex w-full flex-col gap-2">
        <StatsCards userSettings={userSettings} from={date.from} to={date.to} />
        <CategoriesStats
          userSettings={userSettings}
          from={date.from}
          to={date.to}
        />
      </div>
    </div>
  );
}

export default Overview;
