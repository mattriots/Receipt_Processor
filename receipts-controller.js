const {
  storeReceipt,
  getReceiptById,
  calculatePoints,
} = require('./receipts-service');
const { Receipt, Item } = require('./receipts-model');

// POST /receipts/process;
function processReceipt(req, res) {
  try {
    const { retailer, purchaseDate, purchaseTime, items, total } = req.body;
    const itemObjects = items.map((item) => new Item(item));
    const newReceipt = new Receipt({
      retailer,
      purchaseDate,
      purchaseTime,
      items: itemObjects,
      total,
    });
    const id = storeReceipt(newReceipt);
    console.log('ID: ' + id);
    res.json({ id });
  } catch (error) {
    res.status(400).json({ error: 'The receipt is invalid.' });
  }
}

// GET /receipts/:id/points

function getReceiptPoints(req, res) {
  const { id } = req.params;

  const receipt = getReceiptById(id);

  if (!receipt) {
    res.status(404).send('No receipt found for that ID.');
  }

  const points = calculatePoints(receipt);
  return res.json({ points });
}

module.exports = {
  processReceipt,
  getReceiptPoints,
};
