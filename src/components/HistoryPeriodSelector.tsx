import { Period, Timeframe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { GetHistoryPeriodResType } from "@/app/api/history-periods/route";
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
  const historyPeriods = useQuery<GetHistoryPeriodResType>({
    queryKey: ["overview", "history", "periods"],
    queryFn: () =>
      fetch("/api/history-periods", {
        next: {
          revalidate: 60,
        },
      }).then((res) => res.json()),
  });
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
      </SkeletonWrapper>
    </div>
  );
}

