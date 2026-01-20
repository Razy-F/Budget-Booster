import { UserSettings } from "@prisma/client";
import HistoryPeriodSelector from "./HistoryPeriodSelector";
import { Badge } from "./ui/badge";
import SkeletonWrapper from "./SkeletonWrapper";
import {
  ResponsiveContainer,
} from "recharts";
import { GetHistoryDataResType } from "@/app/api/history-data/route";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";
function History({ userSettings }: { userSettings: UserSettings }) {
  const [timeframe, settTmeframe] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const historyDataQuery = useQuery<GetHistoryDataResType>({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: () =>
      fetch(
        "/api/history-data?timeframe=" +
          timeframe +
          "&year=" +
          period.year +
          "&month=" +
          period.month
      ).then((res) => res.json()),
  });

  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0;

  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeframe={timeframe}
              setTimeframe={settTmeframe}
            />

            <div className="flex h-10 gap-2">
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <div className="size-4 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <div className="size-4 rounded-full bg-red-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
            {dataAvailable && (
              <ResponsiveContainer width={"100%"} height={300}>
                <BarChart
                  height={300}
                  data={historyDataQuery.data}
                  barCategoryGap={5}
                >
                  {/* define linear gradient for chart */}
                  <defs>
                    <linearGradient
                      id="incomeBar"
                      x1={"0"}
                      y1={"0"}
                      x2={"0"}
                      y2={"1"}
                    >
                      <stop
                        offset={"0"}
                        stopColor="#10b981"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#10b981"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                    <linearGradient
                      id="expenseBar"
                      x1={"0"}
                      y1={"0"}
                      x2={"0"}
                      y2={"1"}
                    >
                      <stop
                        offset={"0"}
                        stopColor="#ef4444"
                        stopOpacity={"1"}
                      />
                      <stop
                        offset={"1"}
                        stopColor="#ef4444"
                        stopOpacity={"0"}
                      />
                    </linearGradient>
                  </defs>
              </ResponsiveContainer>
            )}
            {!dataAvailable && (
              <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
                No data for the selected period
                <p className="text-sm text-muted-foreground">
                  Try selecting a different period or adding new transactions
                </p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  );
}

export default History;

function CustomTooltip({ active, payload, formatter }: any) {
  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <TooltipRow
        formatter={formatter}
        label="Expense"
        value={expense}
        bgColor="bg-red-500"
        textColor="text-red-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
      <TooltipRow
        formatter={formatter}
        label="Balance"
        value={income - expense}
        bgColor="bg-gray-100"
        textColor="text-foreground"
      />
    </div>
  );
}

function TooltipRow({
  formatter,
  label,
  value,
  bgColor,
  textColor,
}: {
  formatter: Intl.NumberFormat;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}) {
  const formattingFn = useCallback(
    (value: number) => formatter.format(value),
    [formatter]
  );
  return (
    <div className="flex items-center gap-2">
      <div className={cn("size-4 rounded-full", bgColor)}></div>
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          <CountUp
            duration={0.5}
            preserveValue
            end={value}
            decimals={0}
            formattingFn={formattingFn}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}
