import { currencies } from "@/data/currencies";
export function dateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
}

const currencyLocaleMap = new Map(currencies.map((c) => [c.value, c.locale]));

export function getFormatterForCurrency(currency: string) {
  const locale = currencyLocaleMap.get(currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
}
