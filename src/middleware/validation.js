const { isValidYear, isValidURL, isNonEmptyString, trim } = require('../utils/validators');

exports.validateDeveloper = (req, res, next) => {
  req.body = trim(req.body);
  const { name, country, founded_year, website } = req.body;
  const errors = [];

  if (!isNonEmptyString(name)) {
    errors.push('Name is required and cannot be empty');
  }

  if (!isNonEmptyString(country)) {
    errors.push('Country is required and cannot be empty');
  }

  if (!founded_year) {
    errors.push('Founded year is required');
  } else if (!isValidYear(founded_year)) {
    errors.push('Founded year must be between 1950 and current year');
  }

  if (website && !isValidURL(website)) {
    errors.push('Website must be a valid URL');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
};
