"use server";
import { Currencies } from "@prisma/client";
export async function UpdateUserCurrency(currency: Currencies) {
  const parsedBody = UpdateUserCurrencySchema.safeParse({
    currency,
  });

  if (!parsedBody.success) {
    throw parsedBody.error;
  }
}
