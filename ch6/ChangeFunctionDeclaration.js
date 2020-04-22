function circum(radius) {
    circumference(radius);
}

function circumference(radius) {
    return 2 * Math.PI * radius;
}

function inNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
