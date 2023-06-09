const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const config = require('./config');
const morgan = require('morgan');
const cors = require('cors');
const { info } = require('./utils/logger');
const middleware = require('./middleware');
const routes = require('./routes');
const ViteExpress = require('vite-express');
const { request } = require('./controllers/register');

const app = express();
app.use(morgan('tiny'));

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);
    console.log(`connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error('error connection to MongoDB:', error.message);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(routes);
app.use(middleware.errorHandler);

connectDB().then(() => {
  ViteExpress.listen(app, config.PORT, () =>
    info(`Server is listening on port ${config.PORT}...`)
  );
});
