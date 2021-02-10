class Order {
    constructor(data) {
        this._priority = data.priority;
    }

    get priority() {return this._priority;}
    get priorityString() {return this._priority.toString();}
    set priority(aString) {this._priority = new Priority(aString);}
}

class Priority {
    constructor(value) {
        if (value instanceof Priority) return value;
        this._value = value;
    }
    toString() {return this._value;}
}