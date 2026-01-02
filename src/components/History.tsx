import { UserSettings } from "@prisma/client";
function History({ userSettings }: { userSettings: UserSettings }) {
  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
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

