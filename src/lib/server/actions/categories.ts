"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  deleteCategorySchema,
  DeleteCategorySchemaType,
} from "@/lib/zod/schema/categories";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }

  const { name, icon, type } = parsedBody.data;

  return await prisma.category.create({
    data: {
      userId: user.user.id,
      name,
      type,
      icon,
    },
  });
}

export type getCategoriesActionDataType = Awaited<
  ReturnType<typeof getCategoriesAction>
>;

export async function getCategoriesAction(data: OverviewSchemaType) {
  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }
  const parsedBody = overviewSchema.safeParse(data);
  if (!parsedBody.success) {
    throw new Error(parsedBody.error.message);
  }
  const { from, to } = parsedBody.data;
}

