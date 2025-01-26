const {
  storeReceipt,
  getReceiptById,
  calculatePoints,
  updateReceiptById,
  updateItemById,
} = require('../service/receipts-service');
const { Receipt, Item } = require('../model/receipts-model');
const { v4: uuidv4 } = require('uuid');

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

    //Create itemMap to map itemId -> Item object
    const itemMap = new Map();

    for (const item of items) {
      const itemId = uuidv4();
      const itemWithId = { ...item, id: itemId };
      itemMap.set(itemId, new Item(itemWithId));
    }

    //Make the new Receipt and store the Map
    const newReceipt = new Receipt({
      retailer,
      purchaseDate,
      purchaseTime,
      items: itemMap,
      total,
    });

    const receiptId = storeReceipt(newReceipt);

    //Convert the keys of the Map to array so we can display it nicely
    const itemsArr = Array.from(itemMap.values());

    return res.json({
      receiptId: receiptId,
      retailer: newReceipt.retailer,
      purchaseDate: newReceipt.purchaseDate,
      purchaseTime: newReceipt.purchaseTime,
      items: itemsArr,
      total: newReceipt.total,
    });
  } catch (error) {
    return res.status(400).json({ error: 'The receipt is invalid.' });
  }
}

// PUT /receipt/:id/update
// Need receiptId, itemId, body
function updateReceipt(req, res) {
  try {
    const receiptId = req.params.id;
    const body = req.body;
    const updatedReceipt = updateItemById(receiptId, body);
    const updatedPoints = calculatePoints(updatedReceipt);
    const itemsArr = Array.from(updatedReceipt.items.values());

    return res.json({
      receiptId: receiptId,
      retailer: updatedReceipt.retailer,
      purchaseDate: updatedReceipt.purchaseDate,
      purchaseTime: updatedReceipt.purchaseTime,
      items: itemsArr,
      total: updatedReceipt.total,
      updatedPoints,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ error: 'Recipt Not updated: ' + error.message });
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
