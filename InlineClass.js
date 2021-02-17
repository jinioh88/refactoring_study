
class Shipping {
    get trackingInfo() {
        return this._trackingInformation.display;
    }
    get trackingInformation() {
        return this._trackingInformation;
    }
    set trackingInformation(aTrackingInformation) {
        this._trackingInformation = aTrackingInformation;
    }
    get trackingInfo() {
        return `${this.shippingCompany}: ${this.trackingNumber}`;
    }
    get shippingCompany() {return this._shippingCompany;}
    set shippingCompany(arg) {this._shippingCompany = arg;}
    get trackingNumber() {return this._trackingNumber;}
    set trakingNumber(arg) {this._trackingNumber = arg;}
}