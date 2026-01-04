import { Period, Timeframe } from "@/lib/types";
function HistoryPeriodSelector({
  period,
  setPeriod,
  timeframe,
  setTimeframe,
}: {
  period: Period;
  setPeriod: (period: Period) => void;
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
    </div>
  );
}

