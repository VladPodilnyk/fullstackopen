const errorHandler = (error, _, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = errorHandler;