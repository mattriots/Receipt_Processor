class Receipt {
  constructor({ retailer, purchaseDate, purchaseTime, items, total }) {
    this.retailer = retailer;
    this.purchaseDate = purchaseDate;
    this.purchaseTime = purchaseTime;
    this.items = items;
    this.total = total;
  }
}

class Item {
  constructor({ shortDescription, price }) {
    this.shortDescription = shortDescription;
    this.price = price;
  }
}

module.exports = {
  Receipt,
  Item,
};
