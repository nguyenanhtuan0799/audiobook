export const currencyFormat = (
  num: number,
  isShowLang: boolean = true,
  lang?: string,
  fixed: number = 0,
  format: string = "₫"
) => {
  if (!num || typeof num !== "number") return `0 ${format}`;
  switch (lang) {
    case "en":
      return (
        "$" + num?.toFixed(fixed)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      );
    case "vi":
      return (
        num?.toFixed(fixed)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
        " " +
        format
      );
    default:
      return (
        num?.toFixed(fixed)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
        " " +
        format
      );
  }
};
interface CalcCurrency {
  price: number;
  sale: number;
  numberReduced: number;
  restNumber: number;
}

export const calcCurrency = (
  price: number = 0,
  sale: number = 0
): CalcCurrency => {
  const numberReduced = price * sale;
  const restNumber = price - numberReduced;

  return {
    // Tiền default
    price,
    // số lần được giảm
    sale,
    // Tiền được giảm
    numberReduced,
    // Tiền còn lại
    restNumber,
  };
};
