const errorHandler = (error, _, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(404).send({ error: 'malformed id' });
    }

    next(error);
}

module.exports = errorHandler;