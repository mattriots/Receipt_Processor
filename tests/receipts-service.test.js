const {
  calculatePoints,
  storeReceipt,
  getReceiptById,
} = require('../service/receipts-service');

describe('test all receipts-service functions', () => {
  it('Should return 28 points for Target receipt', () => {
    const sampleReceipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
        {
          shortDescription: 'Mountain Dew 12PK',
          price: '6.49',
        },
        {
          shortDescription: 'Emils Cheese Pizza',
          price: '12.25',
        },
        {
          shortDescription: 'Knorr Creamy Chicken',
          price: '1.26',
        },
        {
          shortDescription: 'Doritos Nacho Cheese',
          price: '3.35',
        },
        {
          shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
          price: '12.00',
        },
      ],
      total: '35.35',
    };
    const id = storeReceipt(sampleReceipt);
    const receipt = getReceiptById(id);
    const points = calculatePoints(receipt);
    expect(points).toBe(28);
  });

  it('Should return 109 for the M&M Corner Market example receipt', () => {
    const sampleReceipt = {
      retailer: 'M&M Corner Market',
      purchaseDate: '2022-03-20',
      purchaseTime: '14:33',
      items: [
        {
          shortDescription: 'Gatorade',
          price: '2.25',
        },
        {
          shortDescription: 'Gatorade',
          price: '2.25',
        },
        {
          shortDescription: 'Gatorade',
          price: '2.25',
        },
        {
          shortDescription: 'Gatorade',
          price: '2.25',
        },
      ],
      total: '9.00',
    };
    const id = storeReceipt(sampleReceipt);
    const receipt = getReceiptById(id);
    const points = calculatePoints(receipt);
    expect(points).toBe(109);
  });

  it('Should return 15 for the Walgreens example receipt', () => {
    const sampleReceipt = {
      retailer: 'Walgreens',
      purchaseDate: '2022-01-02',
      purchaseTime: '08:13',
      total: '2.65',
      items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
        { shortDescription: 'Dasani', price: '1.40' },
      ],
    };
    const id = storeReceipt(sampleReceipt);
    const receipt = getReceiptById(id);
    const points = calculatePoints(receipt);
    expect(points).toBe(15);
  });

  it('Should return 31 for the short Target example receipt', () => {
    const sampleReceipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-02',
      purchaseTime: '13:13',
      total: '1.25',
      items: [{ shortDescription: 'Pepsi - 12-oz', price: '1.25' }],
    };
    const id = storeReceipt(sampleReceipt);
    const receipt = getReceiptById(id);
    const points = calculatePoints(receipt);
    expect(points).toBe(31);
  });
});
