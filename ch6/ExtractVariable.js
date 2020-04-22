class Order {
    constructor(aRecord) {
        this.data = aRecord;
    }    

    get quantity() {
        return this.data.quantity;
    }

    get itemPrice() {
        return this.data.itemPrice;
    }

    get price() {
        return this.basePrice - this.quantityDiscount + this.shipping;
    }

    get basePrice() {this.quantity * this.itemPrice;}
    get quantityDiscount() {Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;}
    get shipping() {Math.min(order.quantity * order.itemPrice * 0.1, 100);}
}
