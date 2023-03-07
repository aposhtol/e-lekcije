const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const morgan = require('morgan');
const cors = require('cors');
const { info } = require('./utils/logger');
const middleware = require('./middleware');
const routes = require('./routes');
const ViteExpress = require('vite-express');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use(routes);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message);
  });

app.use(middleware.unknownEndpoint);

ViteExpress.listen(app, config.PORT, () =>
  info(`Server is listening on port ${config.PORT}...`)
);
