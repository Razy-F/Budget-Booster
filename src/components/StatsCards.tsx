"use client";
import { getBalanceAction } from "@/lib/server/actions/balance";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { Card } from "./ui/card";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";

type Props = {
  userSettings: UserSettings;
  from: Date;
  to: Date;
};

function StatsCards({ userSettings, from, to }: Props) {
  const statsQuery = useQuery({
    queryKey: ["overview", "stats", from, to],
    queryFn: () =>
      getBalanceAction({ from: dateToUTCDate(from), to: dateToUTCDate(to) }),
  });
  const formatter = useCurrencyFormatter(userSettings.currency);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;

  const balance = income - expense;

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatsCard
          formatter={formatter}
          value={income}
          title="income"
          icon={
            <TrendingUp className="size-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  );
}

export default StatsCards;

type StatsCardProps = {
  formatter: Intl.NumberFormat;
  value: number;
  title: string;
  icon: ReactNode;
};
function StatsCard({ formatter, value, title, icon }: StatsCardProps) {
  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
}
