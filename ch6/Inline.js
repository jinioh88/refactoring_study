function rating(aDriver) {
    return moreThanFiveLateDeilveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeilveries(aDriver) {
    return aDriver.numberOfLateDeliveries > 5;
}