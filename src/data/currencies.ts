export const currencies = [
  { value: "USD", label: "$ Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "ILS", label: "₪ Shekel", localse: "il-IL" },
  { value: "GBP", label: "£ Pound", localse: "il-IL" },
];

export type Currency = (typeof currencies)[0];
