const express = require('express');
const { PORT } = require('./config');
const { info } = require('./utils/logger');
const ViteExpress = require('vite-express');

const app = express();

app.get('/api/', (req, res) => {
  res.send("Jel' sve dela?");
});

ViteExpress.listen(app, PORT, () =>
  info(`Server is listening on port ${PORT}...`)
);
