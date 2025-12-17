import { UserSettings } from "@prisma/client";
type Props = {
  userSettings: UserSettings;
  from: Date;
  to: Date;
};

function CategoriesStats({ userSettings, from, to }: Props) {
  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
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
  return (
    <Card className="h-80 w-full col-span-6">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === "income" ? "Incomes" : "Expenses"} by category
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
