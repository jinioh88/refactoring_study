class Customer {
    constructor(name, discountRate) {
        this._name = name;
        this._contract = new CustomerContract(dateToday());
        this._setDiscountRate(discountRate);
    }

    get discountRate() {return this._contract._discountRate;}
    _setDiscountRate(aNumber) {this._contract._discountRate = aNumber;}
    becomePreferred() {
        this._setDiscountRate(this._discountRate + 0.03);
    }
    applyDiscount(amount) {
        return amount.subtract(amount.multiply(this._discountRate));
    }
}

class CustomerContract {
    constructor(startDate, discountRate) {
        this._startDate = startDate;
        this._discountRate = discountRate;
    }

    get discountRate() {return this._discountRate;}
    set discountRate(arg) {this._discountRate = arg;}
}