const {
  storeReceipt,
  getReceiptById,
  calculatePoints,
  getReceiptKeys,
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

function getAllReceipts(req, res) {
  try {
    let returnArray = [];
    const receiptKeyArray = getReceiptKeys();
    for (const receiptKey of receiptKeyArray) {
      const receiptBody = getReceiptById(receiptKey);
      const receiptPoints = calculatePoints(receiptBody);
      console.log(receiptPoints);
      returnArray.push({
        id: receiptKey,
        retailer: receiptBody.retailer,
        purchaseDate: receiptBody.purchaseDate,
        receiptTime: receiptBody.purchaseTime,
        items: receiptBody.items,
        total: receiptBody.total,
        points: receiptPoints,
      });
    }
    console.log(returnArray);
    return res.json(returnArray);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}

module.exports = {
  processReceipt,
  getReceiptPoints,
  getAllReceipts,
};
