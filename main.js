
const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
};
const invoices = 
    {
        "customer": "BigCo",
        "performances": [
            {
                "playID": "hamlet",
                "audience": 55
            },
            {
                "playID": "as-like",
                "audience": 35
            },
            {
                "playID": "othello",
                "audience": 40
            },
        ]
    }
;

function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`)
    }

    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function volumCreditsFor(aPerformance) {
    let volumeCredits  = 0;

    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    // 희극 고나객 5명 마다 포인트 제공
    if ("comedy" === playFor(aPerformance).type) {
        volumeCredits += Math.floor(aPerformance.audience / 5);
    } 

    return volumeCredits;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
        style: "currency", currency: "USD", minimumFractionDigits: 2
    }).format(aNumber/100);
}

function appleSauce() {
    let totalAmount = 0;
    for (let perf of invoice.performances) {
        totalAmount += amountFor(perf);
    }    

    return totalAmount;
}

function statement(invoice, plays) {
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;
    const format = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format;

    for (let perf of invoice.performances) {
        //  청구 내역 출력
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    }    
    let totalAmount = appleSauce();

    result += `총액: ${usd(totalAmount)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;

    return result;

    function totalVolumeCredits() {
        let volumeCredits = 0;
        for (let perf of invoice.performances) {
            // 포인트 적립
            volumeCredits += volumCreditsFor(perf);
        }    
    
        return volumeCredits;
    }
}

console.log(statement(invoices, plays));