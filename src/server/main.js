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

app.use(express.json());
app.use(morgan('tiny'));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log('connected to MongoDB');
  } catch (error) {
    console.error('error connection to MongoDB:', error.message);
  }
};

//app.use(middleware.unknownEndpoint);
app.use(routes);

connectDB().then(() => {
  ViteExpress.listen(app, config.PORT, () =>
    info(`Server is listening on port ${config.PORT}...`)
  );
});
