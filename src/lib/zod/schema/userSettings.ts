import { currencies } from "@/data/currencies";
import z from "zod";
export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((val) => {
    const found = currencies.some((c) => c.value === val);
    if (!found) throw new Error(`invalid currency ${val}`);
    return val;
  }),
});
