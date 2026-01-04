import { UserSettings } from "@prisma/client";
import HistoryPeriodSelector from "./HistoryPeriodSelector";
import { Badge } from "./ui/badge";
import SkeletonWrapper from "./SkeletonWrapper";
function History({ userSettings }: { userSettings: UserSettings }) {
  const [timeframe, settTmeframe] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
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
      </Card>
    </div>
  );
}

export default History;

function CustomTooltip({ active, payload, formatter }: any) {
  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
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
  return (
    <div className="flex items-center gap-2">
      <div className={cn("size-4 rounded-full", bgColor)}></div>
      </div>
    </div>
  );
}
