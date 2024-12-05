"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/lib/zod/schema/userSettings";
import { Currencies } from "@prisma/client";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: Currencies) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({
    currency,
  });

  if (!parsedBody.success) {
    throw parsedBody.error;
  }

  const user = await auth();
  if (!user || !user.user || !user.user.id) {
    redirect("/log-in");
  }
  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.user.id,
    },
    data: {
      currency,
    },
  });

  return userSettings;
}
