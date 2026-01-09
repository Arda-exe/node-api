const { isValidYear, isValidURL, isNonEmptyString, isValidRating, isValidPrice, trim } = require('../utils/validators');

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

exports.validateGame = (req, res, next) => {
  req.body = trim(req.body);
  const { title, description, genre, release_year, platform, rating, price, developer_id } = req.body;
  const errors = [];

  if (!isNonEmptyString(title)) {
    errors.push('Title is required and cannot be empty');
  }

  if (!isNonEmptyString(description)) {
    errors.push('Description is required and cannot be empty');
  }

  if (!isNonEmptyString(genre)) {
    errors.push('Genre is required and cannot be empty');
  }

  if (!release_year) {
    errors.push('Release year is required');
  } else if (!isValidYear(release_year)) {
    errors.push('Release year must be between 1950 and current year');
  }

  if (!isNonEmptyString(platform)) {
    errors.push('Platform is required and cannot be empty');
  }

  if (rating === undefined || rating === null || rating === '') {
    errors.push('Rating is required');
  } else if (!isValidRating(rating)) {
    errors.push('Rating must be a number between 0 and 10');
  }

  if (price === undefined || price === null || price === '') {
    errors.push('Price is required');
  } else if (!isValidPrice(price)) {
    errors.push('Price must be a positive number');
  }

  if (!developer_id) {
    errors.push('Developer ID is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
};
