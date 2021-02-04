const station = {
    name: "ZB1",
    readings: [
        {temp: 47, time: "2020-11-1 09:10"},
        {temp: 47, time: "2020-11-1 09:20"},
        {temp: 47, time: "2020-11-1 09:30"},
        {temp: 47, time: "2020-11-1 09:40"},
        {temp: 47, time: "2020-11-1 09:50"},
    ]
};

class NumberRange {
    constructor(min, max) {
        this._data = {min: min, max: max};
    }
    get min() {return this._data.min;}
    get max() {return this._data.max;}
    contaings(arg) {
        return (arg >= this.min && arg <= this.max); 
    }
}

function readingOutsideRange(station, range) {
    return station.readings.filter(r => r.temp < range.min || r.temp > range.max);
}

