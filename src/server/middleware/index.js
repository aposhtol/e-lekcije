const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (request, response, next) => {
  request.user = jwt.verify(request.token, process.env.SECRET);

  if (!request.user.id) {
    return response.status(401).json({
      error: 'Token missing or invalid',
    });
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).send({ error: 'invalid token' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  }
  next(error);
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
