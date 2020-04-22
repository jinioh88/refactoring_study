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

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        throw new Error('서브클래스에서 처리하도록 설계.');
    }

    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }
}

function statement(invoice, plays) {
   
    return renderPlainText(statementData, plays);
}

function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    
    return statementData;
}

function totalAmount() {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function totalVolumeCredits() {
    let volumeCredits = 0;
    for(let perf of data.performances) {
        volumeCredits += perf.volumeCredits;
    }

    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
}

function createPerformanceCalculator(aPerformance, aPlay) {
    switch(aPlay.type) {
        case "tragedy":
            return new TragedyCalculator(aPerformance, aPlay);
        case "comedy":
            return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error('알 수 없는 장르: ${aPlay.type}');
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;

        if(this.performance.audience > 30) {
            result += 1000 *(this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;

        if(this.performance.audience > 20) {
            result += 1000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}

function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function renderPlainText(data, plays) {
    let result = '청구 내역 (고객명: ${data.customer}\n';

    for(let perf of data.performances) {
        result += ' ${perf.play.name}}: ${usd(perf.amount)} (${perf.audience}석)\n';
    }

    result += '총액: ${data.totalAmount}\n';
    result += '적립 포인트: ${data.totalVolumeCredits}점\n';
    return result; 

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
    
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        volumeCredits += Math.max(aPerformance.audience - 30, 0);
        if("comedy" === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        }
        return result;
    }
    
    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", 
        { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100);
    }
}