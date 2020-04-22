function printOwing(invoice) {
    printBanner();

    const outstanding = calculateOutstading(invoice);

    recordDueDate(invoice);

    printDetails(invoice, outstanding)
}

function calculateOutstading(invoice) {
    let result = 0;  
    for(const o of invoice.orders) {
        result += o.a
        mount;
    }
    return result;  // 값이 변경되 반환.
}

function printBanner() {
    console.log("****************");
    console.log("*** 고객 채무 ***")
    console.log("****************");
}

function printDetails(invoice, outstanding) {
    console.log('고객명: ${invoice.customer}');
    console.log('채무액: ${outstanding}');
    console.log('마감일: ${invoice.duDate.toLocaleDateString()}');
}

function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

