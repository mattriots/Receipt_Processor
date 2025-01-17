const express = require('express');
const receiptRouter = require('./router/receipts-routes');

const app = express();
app.use(express.json());

app.use('/receipts', receiptRouter);
const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
