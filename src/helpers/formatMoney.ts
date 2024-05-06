export interface CurrencyPosition {
  [key: string]: string;
}

interface CountryInfo {
  style: string;
  currency: string;
  minimumFractionDigits: number;
}

export interface FormatByCountry {
  [key: string]: CountryInfo;
}

export interface FormattedMoneyTypes {
  money: string;
  currencySymbol: string;
  decimalPart?: string;
  error?: string;
}

const currencyPosition: CurrencyPosition = {
  EUR: "el-GR",
  USA: "en-US",
  GBP: "en-GB",
};

const formatByCountry: FormatByCountry = {
  EUR: {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  },
  USA: {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  },
  GBP: {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  },
};

// Grab the formatting by country and validate it
function getFormatByCountry(country = "EU") {
  const defaultFormatSettings = {
    formatOptions: formatByCountry[country],
    currencyPosition: currencyPosition[country],
  };

  if (country.length !== 3) {
    return defaultFormatSettings;
  }

  return defaultFormatSettings;
}

// If  amount is String Convert it to valid Float
export function normalizeInput(amount: string | number): number {
  if (typeof amount === "string") return parseFloat(amount.replace(",", ".")); // "123,32" -> 123.32
  return amount;
}

/**
 * Basic steps
 * IF 'amount' === STRING --> CONVERT IT TO FLOAT
 * Check if is a valid number
 * GET Locale Settings BY 'country'
 * Check for desired decimal
 */

export interface FormatMoneyArgumentsTypes {
  amount: string | number;
  country: string;
  avoidZeroDecimals?: boolean;
  separateDecimals?: boolean;
  showMinusSign?: boolean;
}

export default function formatMoney({
  amount,
  country,
  avoidZeroDecimals = false,
  separateDecimals = false,
  showMinusSign = false,
}: FormatMoneyArgumentsTypes): FormattedMoneyTypes {
  const formattedAmountObject: FormattedMoneyTypes = {
    money: "",
    decimalPart: "",
    currencySymbol: "",
  };

  if (typeof country !== "string") {
    formattedAmountObject.error = "The country is not a valid input.";
    return formattedAmountObject;
  }

  const amountNumber = normalizeInput(amount);

  // eslint-disable-next-line no-restricted-globals
  if (!isFinite(amountNumber) || typeof amountNumber !== "number") {
    formattedAmountObject.error = "The amount is not a valid input.";
    return formattedAmountObject;
  }

  // eslint-disable-next-line no-shadow
  const { formatOptions, currencyPosition } = getFormatByCountry(
    country || "EUR"
  );

  // Format the amount according to fetched locale settings
  let decimalSeparator = ",";
  Intl.NumberFormat(currencyPosition, formatOptions)
    .formatToParts(amountNumber)
    // eslint-disable-next-line array-callback-return
    .map(({ type, value }) => {
      if (type === "minusSign" && showMinusSign)
        formattedAmountObject.money += value;
      if (type === "integer" || type === "group")
        formattedAmountObject.money += value;
      if (type === "currency") formattedAmountObject.currencySymbol = value;
      if (type === "decimal") decimalSeparator = value;
      if (type === "fraction" && !avoidZeroDecimals && !separateDecimals) {
        formattedAmountObject.money += decimalSeparator;
        formattedAmountObject.money += value;
      }
      if (type === "fraction" && separateDecimals && !avoidZeroDecimals) {
        formattedAmountObject.money += decimalSeparator;
        formattedAmountObject.decimalPart = value;
      }
    });

  return formattedAmountObject;
}
