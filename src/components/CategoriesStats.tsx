"use client";
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import {
  getCategoriesAction,
  getCategoriesActionDataType,
} from "@/lib/server/actions/categories";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  userSettings: UserSettings;
  from: Date;
  to: Date;
};

function CategoriesStats({ userSettings, from, to }: Props) {
  const statsQuery = useQuery({
    queryKey: ["overview", "stats", "categories", from, to],
    queryFn: () => getCategoriesAction({ from, to }),
  });

  const formatter = useCurrencyFormatter(userSettings.currency);

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          type="income"
          data={statsQuery.data ?? []}
        />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard
          formatter={formatter}
          type="expense"
          data={statsQuery.data ?? []}
        />
      </SkeletonWrapper>
    </div>
  );
}

export default CategoriesStats;

type CategoriesCardPropsType = {
  formatter: Intl.NumberFormat;
  type: "income" | "expense";
  data: getCategoriesActionDataType;
};
function CategoriesCard({ formatter, type, data }: CategoriesCardPropsType) {
  const filterData = data.filter((el) => el.type === type);
  const total = filterData.reduce((acc, el) => acc + (el._sum.amount || 0), 0);
  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === "income" ? "Incomes" : "Expenses"} by category
        </CardTitle>
      </CardHeader>
      <div className="flex items-center justify-between gap-2">
        {filterData.length === 0 && (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            <p>No data for the selecetd period</p>
            <p className="text-sm text-muted-foreground">
              Try selecting a different period or try adding new{" "}
              {type === "expense" ? "expense" : "income"}
            </p>
          </div>
        )}
        {filterData.length > 0 && (
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filterData.map((item) => {
                const amount = item._sum.amount || 0;
                const percentage = (amount * 100) / (total || amount);
                return (
                  <div className="flex flex-col gap-2" key={item.category}>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-400">
                        {item.categoryIcon} {item.category}
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatter.format(amount)}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      indicator={
                        type === "expense" ? "bg-red-500" : "bg-emerald-500"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
}
