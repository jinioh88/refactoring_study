const organization = new Organization({name: "애크미 구스베리", country: "GB"});

function getOrganization() {return organization;}

class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    set name(aString) {this._data.name = aString;}
    get name() {return this._data.name;}
    set country(aCountryCode) {this._country = aCountryCode;}
    get country() {return this._country;}
}