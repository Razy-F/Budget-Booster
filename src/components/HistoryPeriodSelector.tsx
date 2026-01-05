import { GetHistoryPeriodResType } from "@/app/api/history-periods/route";
import { Period, Timeframe } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

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
        <Tabs
          value={timeframe}
          onValueChange={(value) => setTimeframe(value as Timeframe)}
        >
          <TabsList>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>
      <div className="flex flex-wrap items-center gap-2">
        <SkeletonWrapper
          isLoading={historyPeriods.isFetching}
          fullWidth={false}
        >
        </SkeletonWrapper>
      </div>
    </div>
  );
}

