import { auth } from "@/auth";
import { getFormatterForCurrency } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { overviewSchema } from "@/lib/zod/schema/overview";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const queryParams = overviewSchema.safeParse({
    from,
    to,
  });

  if (!queryParams.success) {
    return Response.json(queryParams.error.message, {
      status: 400,
    });
  }

  return Response.json(
    await getTransactionHistory(
      user.user.id,
      queryParams.data.from,
      queryParams.data.to
    )
  );
}

export type GetTransactionHistoryResType = Awaited<
  ReturnType<typeof getTransactionHistory>
>;
async function getTransactionHistory(userId: string, from: Date, to: Date) {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId,
    },
  });
  if (!userSettings) {
    throw new Error("user settings not found");
  }

  const formatter = getFormatterForCurrency(userSettings.currency);

  const transaction = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transaction.map((transaction) => ({
    ...transaction,
    formattedAmount: formatter.format(transaction.amount),
  }));
}
