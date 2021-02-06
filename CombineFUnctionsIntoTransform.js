reading = {customer: 'ivan', quantity: 10, month: 5, year: 2017};

// const rawReading = acquireReading();
// const aReading = enrichReading(rawReading);
// const baseCharge = aReading.baseCharge;

// const rawReading = acquireReading();
// const aREading =  enrichReading(rawReading);
// const taxableCharge = aReading.taxableCharge;

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseChargeAmount = aReading.baseCharge;

function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(original);
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
    return result;
}