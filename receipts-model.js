class Receipt {
  constructor({ retailers, purchaseDate, purchaseItem, items, total }) {
    this.retailers = retailers;
    this.purchaseDate = purchaseDate;
    this.purchaseItem = purchaseItem;
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
