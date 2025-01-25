class Receipt {
  constructor({ retailer, purchaseDate, purchaseTime, items, total }) {
    this.retailer = retailer;
    this.purchaseDate = purchaseDate;
    this.purchaseTime = purchaseTime;
    this.items = items;
    this.total = total;
  }
}

//Add ID to item
class Item {
  constructor({ id, shortDescription, price }) {
    this.id = id;
    this.shortDescription = shortDescription;
    this.price = price;
  }
}

module.exports = {
  Receipt,
  Item,
};
