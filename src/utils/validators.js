function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year >= 1950 && year <= currentYear;
}

function isValidURL(url) {
  if (!url) return true; // URL is optional
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function isNonEmptyString(str) {
  return typeof str === 'string' && str.trim().length > 0;
}

function isValidRating(rating) {
  const num = parseFloat(rating);
  return !isNaN(num) && num >= 0 && num <= 10;
}

function isValidPrice(price) {
  const num = parseFloat(price);
  return !isNaN(num) && num >= 0;
}

function trim(obj) {
  const trimmed = {};
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      trimmed[key] = obj[key].trim();
    } else {
      trimmed[key] = obj[key];
    }
  }
  return trimmed;
}

module.exports = {
  isValidYear,
  isValidURL,
  isNonEmptyString,
  isValidRating,
  isValidPrice,
  trim
};
