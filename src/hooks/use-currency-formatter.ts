import { getFormatterForCurrency } from "@/lib/helpers";
import { useMemo } from "react";

export function useCurrencyFormatter(currency: string): Intl.NumberFormat {
  return useMemo(() => getFormatterForCurrency(currency), [currency]);
}
