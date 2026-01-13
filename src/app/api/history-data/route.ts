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

