const express = require('express');
const {
  processReceipt,
  getReceiptPoints,
  getAllReceipts,
} = require('../controller/receipts-controller');

const router = express.Router();

//GET All Receipts
router.get('/', getAllReceipts);

//POST
router.post('/process', processReceipt);

//GET Receipt Points
router.get('/:id/points', getReceiptPoints);

module.exports = router;
