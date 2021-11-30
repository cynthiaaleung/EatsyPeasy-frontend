//use price level to get price icon in Single Results
export function getPriceIcon (price_level) {
  if (price_level === 1) {
    return "$";
  } else if (price_level === 2) {
    return "$$";
  } else if (price_level === 3) {
    return "$$$";
  } else if (price_level === 4) {
    return "$$$$";
  }
}