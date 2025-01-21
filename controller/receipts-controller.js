const {
  storeReceipt,
  getReceiptById,
  calculatePoints,
  updateReceiptById,
} = require('../service/receipts-service');
const { Receipt, Item } = require('../model/receipts-model');

// POST /receipts/process;
function processReceipt(req, res) {
  try {
    const { retailer, purchaseDate, purchaseTime, items, total } = req.body;

    if (!retailer || !purchaseDate || !purchaseTime || !items || !total) {
      return res.status(400).json({ error: 'The receipt is invalid.' });
    }

    if (items.length < 1) {
      return res.status(400).json({ error: 'The receipt is invalid.' });
    }

    const itemObjects = items.map((item) => new Item(item));

    const newReceipt = new Receipt({
      retailer,
      purchaseDate,
      purchaseTime,
      items: itemObjects,
      total,
    });

    const id = storeReceipt(newReceipt);

    return res.json({ id });
  } catch (error) {
    return res.status(400).json({ error: 'The receipt is invalid.' });
  }
}

// PUT /receipt/:id/update
function updateReceipt(req, res) {
  try {
    const { id } = req.params;
    const body = req.body;
   
    const updatedReceipt = updateReceiptById(id, body);
    const updatedPoints = calculatePoints(updatedReceipt);
    return res.json({ id, updatedReceipt, updatedPoints });
  } catch (error) {
    return res.status(404).json({ error: 'Receipt was not updated.' });
  }
}

// GET /receipts/:id/points
function getReceiptPoints(req, res) {
  try {
    const { id } = req.params;
    const receipt = getReceiptById(id);
    const points = calculatePoints(receipt);
    return res.json({ points });
  } catch (error) {
    return res.status(404).json({ error: 'No receipt found for that ID.' });
  }
}

module.exports = {
  processReceipt,
  getReceiptPoints,
  updateReceipt,
};
