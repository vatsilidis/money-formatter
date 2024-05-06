/* eslint-disable array-callback-return */
import formatMoney, { FormattedMoneyTypes } from "../helpers/formatMoney";

const countriesEU = [{ name: "EUR", symbol: "€" }];

const countriesUSA = [{ name: "USA", symbol: "$" }];

const numberInputsEU = [
  { inVal: 0, money: "0,00", moneyNoDecimals: "0" },
  { inVal: 0.0, money: "0,00", moneyNoDecimals: "0" },
  { inVal: 1, money: "1,00", moneyNoDecimals: "1" },
  { inVal: 1.1, money: "1,10", moneyNoDecimals: "1" },
  { inVal: 123, money: "123,00", moneyNoDecimals: "123" },
  { inVal: 123.12, money: "123,12", moneyNoDecimals: "123" },
  { inVal: 123.12345, money: "123,12", moneyNoDecimals: "123" },
  { inVal: 123.126, money: "123,13", moneyNoDecimals: "123" },
];

const numberInputsUSA = [
  { inVal: 0, money: "0.00", moneyNoDecimals: "0" },
  { inVal: 0.0, money: "0.00", moneyNoDecimals: "0" },
  { inVal: 1, money: "1.00", moneyNoDecimals: "1" },
  { inVal: 1.1, money: "1.10", moneyNoDecimals: "1.10" },
  { inVal: 123, money: "123.00", moneyNoDecimals: "123" },
  { inVal: 123.12, money: "123.12", moneyNoDecimals: "123.12" },
  { inVal: 123.12345, money: "123.12", moneyNoDecimals: "123.12" },
  { inVal: 123.126, money: "123.13", moneyNoDecimals: "123.13" },
];

const stringInputsEU = [
  { inVal: "0", money: "0,00", moneyNoDecimals: "0" },
  { inVal: "0.0", money: "0,00", moneyNoDecimals: "0" },
  { inVal: "1", money: "1,00", moneyNoDecimals: "1" },
  { inVal: "1.1", money: "1,10", moneyNoDecimals: "1" },
  { inVal: "1.10", money: "1,10", moneyNoDecimals: "1" },
  { inVal: "123.12", money: "123,12", moneyNoDecimals: "123" },
  { inVal: "123.12345", money: "123,12", moneyNoDecimals: "123" },
  { inVal: "123.126", money: "123,13", moneyNoDecimals: "123" },
  { inVal: "1.000", money: "1,00", moneyNoDecimals: "1" },
  { inVal: "1.000.000", money: "1,00", moneyNoDecimals: "1" },
];

const stringInputsUSA = [
  { inVal: "0", money: "0.00", moneyNoDecimals: "0" },
  { inVal: "0.0", money: "0.00", moneyNoDecimals: "0" },
  { inVal: "1", money: "1.00", moneyNoDecimals: "1" },
  { inVal: "1.1", money: "1.10", moneyNoDecimals: "1.10" },
  { inVal: "1.10", money: "1.10", moneyNoDecimals: "1.10" },
  { inVal: "123.12", money: "123.12", moneyNoDecimals: "123.12" },
  { inVal: "123.12345", money: "123.12", moneyNoDecimals: "123.12" },
  { inVal: "123.126", money: "123.13", moneyNoDecimals: "123.13" },
  { inVal: "1.000", money: "1.00", moneyNoDecimals: "1" },
  { inVal: "1.000.000", money: "1.00", moneyNoDecimals: "1" },
];
const stringCommaDecimalsInputsEU = [
  { inVal: "0", money: "0,00" },
  { inVal: "0,0", money: "0,00" },
  { inVal: "1", money: "1,00" },
  { inVal: "1,1", money: "1,10" },
  { inVal: "1,10", money: "1,10" },
  { inVal: "123,12", money: "123,12" },
  { inVal: "123,12345", money: "123,12" },
  { inVal: "123,126", money: "123,13" },
  { inVal: "1,000", money: "1,00" },
  { inVal: "1,000,000", money: "1,00" },
];

const stringCommaDecimalsInputsUSA = [
  { inVal: "0", money: "0.00" },
  { inVal: "0.0", money: "0.00" },
  { inVal: "1", money: "1.00" },
  { inVal: "1.1", money: "1.10" },
  { inVal: "1.10", money: "1.10" },
  { inVal: "123.12", money: "123.12" },
  { inVal: "123.12345", money: "123.12" },
  { inVal: "123.126", money: "123.13" },
  { inVal: "1.000", money: "1.00" },
  { inVal: "1.000,000", money: "1.00" },
];

const expectedOutput: FormattedMoneyTypes = {
  currencySymbol: "",
  decimalPart: "",
  money: "",
};

describe("Format money tests", () => {
  it("Handles Number inputs correctly", () => {
    countriesEU.forEach((country) => {
      numberInputsEU.map((input) => {
        expect(
          formatMoney({ amount: input.inVal, country: country.name })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.money,
        });
      });
    });
  });

  it("Handles USA Number inputs correctly", () => {
    countriesUSA.forEach((country) => {
      numberInputsUSA.map((input) => {
        expect(
          formatMoney({ amount: input.inVal, country: country.name })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.money,
        });
      });
    });
  });

  it("Handles String inputs correctly", () => {
    countriesEU.forEach((country) => {
      stringInputsEU.map((input) => {
        expect(
          formatMoney({ amount: input.inVal, country: country.name })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.money,
        });
      });
    });
  });

  it("Handles USA String inputs correctly", () => {
    countriesUSA.forEach((country) => {
      stringInputsUSA.map((input) => {
        expect(
          formatMoney({ amount: input.inVal, country: country.name })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.money,
        });
      });
    });
  });

  it("Handles String inputs with comma decimals correctly", () => {
    countriesEU.forEach((country) => {
      stringCommaDecimalsInputsEU.map((input) => {
        expect(
          formatMoney({ amount: input.inVal, country: country.name })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.money,
        });
      });
    });
  });

  it("Handles USA String inputs with comma decimals correctly", () => {
    countriesUSA.forEach((country) => {
      stringCommaDecimalsInputsUSA.map((input) => {
        expect(
          formatMoney({ amount: input.inVal, country: country.name })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.money,
        });
      });
    });
  });

  it("Avoids zero decimals correctly", () => {
    countriesEU.forEach((country) => {
      numberInputsEU.map((input) => {
        expect(
          formatMoney({
            amount: input.inVal,
            country: country.name,
            avoidZeroDecimals: true,
          })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.moneyNoDecimals,
          decimalPart: "",
        });
      });
      stringInputsEU.map((input) => {
        expect(
          formatMoney({
            amount: input.inVal,
            country: country.name,
            avoidZeroDecimals: true,
          })
        ).toEqual({
          ...expectedOutput,
          currencySymbol: country.symbol,
          money: input.moneyNoDecimals,
          decimalPart: "",
        });
      });
    });
  });

  it("Handles no Country input correctly", () => {
    expect(formatMoney({ amount: "", country: "EUR" })).toEqual({
      ...expectedOutput,
      error: "The amount is not a valid input.",
    });

    expect(formatMoney({ amount: "123", country: "" })).toEqual({
      ...expectedOutput,
      money: "123,00",
      currencySymbol: "€",
    });
  });
});
