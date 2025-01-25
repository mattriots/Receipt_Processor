const { v4: uuidv4 } = require('uuid');

// Store the receipts in-memory here
// ID -> Receipt
const receiptsMap = new Map();

//Map random UUID to Receipt Object
function storeReceipt(receipt) {
  const receiptId = uuidv4();
  receiptsMap.set(receiptId, receipt);
  console.log('receipt Map: ' + receiptsMap);
  return receiptId;
}

//Getter for Receipt by receiptiD
function getReceiptById(receiptId) {
  if (!receiptsMap.has(receiptId)) {
    throw new Error(`No Receipt found with ID: ${receiptId}`);
  }
  return receiptsMap.get(receiptId);
}

//Getter for Item by itemID
//Pass in a receiptId and body
//Extract itemId
//Return item object
//Else throw error
function getItemById(receiptId, body) {
  const itemId = body.id;
  const receipt = getReceiptById(receiptId);
  if (!receipt.items.get(itemId)) {
    throw new Error(`No Item found with ID: ${itemId}`);
  }
  return receipt.items.get(itemId);
}

//This can call getItemById
//Get the item, make the change
//Return the changed item
function updateItemById(receiptId, itemId, body) {}

//Older function that just updated the whole receipt
//Might be obsolete now
function updateReceiptById(id, body) {
  let oldReceipt = getReceiptById(id);
  const updatedReceipt = { ...oldReceipt, ...body };

  //put it back in the map and return the updated receipt
  receiptsMap.set(id, updatedReceipt);
  return updatedReceipt;
}

//Function to calculate all points
function calculatePoints(receipt) {
  let points = 0;

  //Local variables for easy handling
  let retailer = receipt.retailer;
  let purchaseDate = parseInt(receipt.purchaseDate.split('-')[2], 10);
  let purchaseTime = receipt.purchaseTime;
  let total = parseFloat(receipt.total);
  //This is now a map
  let items = receipt.items;

  // 1. One point for every alphanumeric character in the retailer name.
  let alphaNumCount = retailer.replace(/[^0-9a-z]/gi, '');
  points += alphaNumCount.length;

  //2. 50 points if the total is a round dollar amount with no cents.
  if (total % 1 === 0) {
    points += 50;
  }

  //3. 25 points if the total is a multiple of 0.25.
  if (total % 0.25 === 0) {
    points += 25;
  }

  //Updatd to work with itemMap
  //4. 5 points for every two items on the receipt.
  const itemCount = items ? items.size : 0;
  points += 5 * Math.floor(itemCount / 2);
  console.log('Itemscount: ' + itemCount);

  //Updated to work with itemMap
  //5. If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  if (items) {
    items.forEach((val, key) => {
      const trimDesc = val.shortDescription.trim();
      console.log(trimDesc);
      if (trimDesc.length % 3 === 0) {
        const itemPrice = parseFloat(val.price);
        const itemPoints = Math.ceil(itemPrice * 0.2);
        points += itemPoints;
      }
    });
  }

  console.log(points);

  //7. 6 points if the day in the purchase date is odd.
  if (purchaseDate % 2 == 1) {
    points += 6;
  }

  //8. 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  if (between2pmAnd4pm(purchaseTime)) {
    points += 10;
  }

  return points;
}

//Function to handle time between 2pm and 4pm
function between2pmAnd4pm(purchaseTime) {
  const [hour, minute] = purchaseTime.split(':').map((n) => parseInt(n, 10));

  if ((hour > 14 || (hour === 14 && minute > 0)) && hour < 16) {
    return true;
  }
}

module.exports = {
  storeReceipt,
  getReceiptById,
  getItemById,
  calculatePoints,
  updateReceiptById,
};
