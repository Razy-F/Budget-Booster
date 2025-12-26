import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
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
      </div>
    </Card>
  );
}
