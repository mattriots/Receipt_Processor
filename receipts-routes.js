const express = require('express');
const { processReceipt, getReceiptPoints } = require('./receipts-controller');

const router = express.Router();

//POST
router.post('/process', processReceipt);

//GET
router.get('/:id/points', getReceiptPoints);

module.exports = router;
