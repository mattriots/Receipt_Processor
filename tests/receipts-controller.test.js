const request = require('supertest');
const app = require('../app');

describe('POST /receipts/process', () => {
  it('should return 400 and error since fields are missing', async () => {
    const invalidReceipt = {
      //no retailer or items
      purchaseDate: '2022-01-02',
      purchaseTime: '13:13',
      total: '1.25',
    };

    const postResponse = await request(app)
      .post('/receipts/process')
      .send(invalidReceipt);

    expect(400);
    expect(postResponse.body).toHaveProperty('error');
    expect(postResponse.body.error).toBe('The receipt is invalid.');
  });

  it('should return 200 and an id', async () => {
    const validReceipt = {
      retailer: 'Walgreens',
      purchaseDate: '2022-01-02',
      purchaseTime: '08:13',
      total: '2.65',
      items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
        { shortDescription: 'Dasani', price: '1.40' },
      ],
    };

    const response = await request(app)
      .post('/receipts/process')
      .send(validReceipt);

    expect(200);
    expect(response.body).toHaveProperty('id');
  });
});

describe('GET /receipts/:id/points', () => {
  it('should return 200 and points for a valid receipt id', async () => {
    const validReceipt = {
      retailer: 'Walgreens',
      purchaseDate: '2022-01-02',
      purchaseTime: '08:13',
      total: '2.65',
      items: [
        { shortDescription: 'Pepsi - 12-oz', price: '1.25' },
        { shortDescription: 'Dasani', price: '1.40' },
      ],
    };
    const response = await request(app)
      .post('/receipts/process')
      .send(validReceipt);

    const receiptId = response.body.id;
    const getResponse = await request(app).get(`/receipts/${receiptId}/points`);

    expect(200);
    expect(getResponse.body).toHaveProperty('points');
    expect(getResponse.body.points).toBe(15);
  });

  it('should return 400 because of invalid id', async () => {
    const receiptId = '123456789';
    const getResponse = await request(app).get(`/receipts/${receiptId}/points`);

    expect(400);
    expect(getResponse.body).toHaveProperty('error');
    expect(getResponse.body.error).toBe('No receipt found for that ID.');
  });
});
