class Person {
    constructor() {
        this._tetelephoneNumber = new TelephoneNumber();
    }
    get name() {return this._name;}
    set name(arg) {this_.name = arg;}
    get telephoneNumber() {return this._tetelephoneNumber.toString();}
    set officeAreaCode(arg) {this._tetelephoneNumber.areacode = arg;}
    get officeAreaCode() {return this._tetelephoneNumber.areacode;}
    get officeNumber() {return this._tetelephoneNumber.number;}
    set officeNumber(arg) {this._tetelephoneNumber.number = arg;}
}

class TelephoneNumber {
    set areaCode(arg) {this.areaCode = arg;}
    get areaCode() {return this.areaCode;}
    get number() {return this.number;}
    set number(arg) {this.number = arg;}
    get telephoneNumber() {return `(${this.areaCode} ${this.number})`;}

}