import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }
  const searchParams = request.nextUrl.searchParams.get("type");
  const validator = z
    .enum(["expense", "income"], {
      message: "No you have to choose between expense and income",
    })
    .nullable();

  const queryParams = validator.safeParse(searchParams);
  if (!queryParams.success) {
    return Response.json(queryParams.error, {
      status: 400,
    });
  }

  const type = queryParams.data;
  const categories = await prisma.category.findMany({
    where: {
      userId: user.user.id,
      ...(type && { type }), // include type in the filters if it's defined
    },
    orderBy: {
      name: "asc",
    },
  });
  return Response.json(categories);
}
