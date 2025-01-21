const express = require('express');
const {
  processReceipt,
  getReceiptPoints,
  updateReceipt
} = require('../controller/receipts-controller');

const router = express.Router();

//POST
router.post('/process', processReceipt);

//GET
router.get('/:id/points', getReceiptPoints);

//PUT
router.put('/:id/update', updateReceipt)

module.exports = router;
