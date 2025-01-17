const { v4: uuidv4 } = require('uuid');

// Store the receipts in-memory here
// ID -> Receipt
const receiptsMap = new Map();

function storeReceipt(receipt) {
  const id = uuidv4();
  receiptsMap.set(id, receipt);
  return id;
}

function getReceiptById(id) {
  return receiptsMap.get(id);
}

function calculatePoints(receipt) {
  let points = 0;

  //Local variables for easy handling
  let retailer = receipt.retailer;
  let purchaseDate = parseInt(receipt.purchaseDate.split('-')[2], 10);
  let purchaseTime = receipt.purchaseTime;
  let total = parseFloat(receipt.total);
  let items = receipt.items;

  // 1. One point for every alphanumeric character in the retailer name.
  for (let i = 0; i < retailer.length; i++) {
    const char = retailer[i];
    if (
      (char >= 'a' && char <= 'z') ||
      (char >= 'A' && char <= 'Z') ||
      (char >= '0' && char <= '9')
    ) {
      points += 1;
    }
  }

  console.log('1: ' + points);

  //2. 50 points if the total is a round dollar amount with no cents.
  if (total % 1 === 0) {
    points += 50;
  }
  console.log('2: ' + points);

  //3. 25 points if the total is a multiple of 0.25.
  if (total % 0.25 === 0) {
    points += 25;
  }

  console.log('3: ' + points);

  //4. 5 points for every two items on the receipt.

  const itemCount = items ? items.length : 0;
  points += 5 * Math.floor(itemCount / 2);

  console.log('4: ' + points);

  //5. If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  // Go through all the items, trim the description, see if its length is multiple of 3, parse the item price,
  // Multiply by 0.2 and round up then add to points
  if (items) {
    for (const item of items) {
      const trimDesc = item.shortDescription.trim();
      if (trimDesc.length % 3 === 0) {
        const itemPrice = parseFloat(item.price);
        const itemPoints = Math.ceil(itemPrice * 0.2);
        points += itemPoints;
      }
    }
  }

  console.log('5: ' + points);

  //7. 6 points if the day in the purchase date is odd.
  if (purchaseDate % 2 == 1) {
    points += 6;
  }

  console.log('6: ' + points);

  //8. 10 points if the time of purchase is after 2:00pm and before 4:00pm.

  if (between2pmAnd4pm(purchaseTime)) {
    points += 10;
  }

  console.log('8: ' + points);

  return points;
}

function between2pmAnd4pm(purchaseTime) {
  const [hour, minute] = purchaseTime.split(':').map((n) => parseInt(n, 10));

  if ((hour > 14 || (hour === 14 && minute > 0)) && hour < 16) {
    return true;
  }
}

//Add the Example receipts

// Total Points: 28
// storeReceipt({
//   retailer: 'Target',
//   purchaseDate: '2022-01-01',
//   purchaseTime: '13:01',
//   items: [
//     {
//       shortDescription: 'Mountain Dew 12PK',
//       price: '6.49',
//     },
//     {
//       shortDescription: 'Emils Cheese Pizza',
//       price: '12.25',
//     },
//     {
//       shortDescription: 'Knorr Creamy Chicken',
//       price: '1.26',
//     },
//     {
//       shortDescription: 'Doritos Nacho Cheese',
//       price: '3.35',
//     },
//     {
//       shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
//       price: '12.00',
//     },
//   ],
//   total: '35.35',
// });

// // Total Points: 109
// storeReceipt({
//   retailer: 'M&M Corner Market',
//   purchaseDate: '2022-03-20',
//   purchaseTime: '14:01',
//   items: [
//     {
//       shortDescription: 'Gatorade',
//       price: '2.25',
//     },
//     {
//       shortDescription: 'Gatorade',
//       price: '2.25',
//     },
//     {
//       shortDescription: 'Gatorade',
//       price: '2.25',
//     },
//     {
//       shortDescription: 'Gatorade',
//       price: '2.25',
//     },
//   ],
//   total: '9.00',
// });

console.log(receiptsMap);
// calcPoints(receiptsMap.get(2));


module.exports = {
  storeReceipt,
  getReceiptById,
  calculatePoints,
};