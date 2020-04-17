var plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Hamlet", "type": "tragedy"}
};

var invoice = [
    {
        "customer": "BingCo",
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
            }
        ]
    }
];

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = 'û�� ���� (����: ${invoice.customer}\n';
    const format = new Intl.NumberFormat("en-US", 
                    { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for(let perf of invoice.performances) {
        let thisAmount = amountFor(pref);

        volumeCredits += Math.max(perf.audience - 30, 0);
        if("comedy" === plplayFor(pref)) {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        result += ' ${plplayFor(pref).name}}: ${format(thisAmount/100)} (${perf.audience}��)\n';
        totalAmount + thisAmount;
    }
    result += '�Ѿ�: ${format(totalAmount/100)}\n';
    result += '���� ����Ʈ: ${volumCredits}��\n';
    return result;   
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function amountFor(aPerformance) {
    let result = 0;

    switch(plplayFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if(aPerformance.audience > 30) {
                result += 1000 *(aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if(aPerformance.audience > 20) {
                result += 10000 + 500 *(aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error('�� �� ���� �帣: ${plplayFor(aPerformance).type}');
    }

    return result;
}