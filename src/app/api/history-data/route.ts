import prisma from "@/lib/prisma";
import { Period, Timeframe } from "@/lib/types";
import requireUserId from "@/utils";
import { z } from "zod";

const getHistoryDataSchema = z.object({
  timeframe: z.enum(["month", "year"]),
  month: z.coerce.number().min(0).max(11).default(0),
  year: z.coerce.number().min(2000).max(3000),
});
export async function GET(req: Request) {
  const userId = await requireUserId();
  const { searchParams } = new URL(req.url);

  const timeframe = searchParams.get("timeframe");
  const year = searchParams.get("year");
  const month = searchParams.get("month");

  const parsedBody = getHistoryDataSchema.safeParse({ timeframe, year, month });

  if (!parsedBody.success) {
    return Response.json(parsedBody.error.message, {
      status: 400,
    });
  }

  const data = await getHistoryData(userId, parsedBody.data.timeframe, {
    month: parsedBody.data.month,
    year: parsedBody.data.year,
  });

  return Response.json(data);
}

export type GetHistoryDataResType = Awaited<ReturnType<typeof getHistoryData>>;

async function getHistoryData(
  userId: string,
  timeframe: Timeframe,
  period: Period
) {
  switch (timeframe) {
    case "year":
      return await getYearHistoryData(userId, period.year);
    case "month":
      return await getMonthHistoryData(userId, period.year, period.month);
  }
}

async function getYearHistoryData(userId: string, year: number) {
}

async function getMonthHistoryData(
  userId: string,
  year: number,
  month: number
) {
}
