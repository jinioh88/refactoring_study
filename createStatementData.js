class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    get amount() {
        let result = 0;
    
        switch (this.play.type) {
            case "tragedy":
                result = 40000;
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${this.play.type}`)
        }
    
        return result;
    }
}

module.exports = function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.customer = invoice.customer;
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance); // 얕은 복사
        result.play = calculator.play;
        result.amount = amountFor(result);
        result.volumCredits = volumCreditsFor(result);
        return result;
    }

    function volumCreditsFor(aPerformance) {
        let result  = 0;
    
        result += Math.max(aPerformance.audience - 30, 0);
        // 희극 고나객 5명 마다 포인트 제공
        if ("comedy" === aPerformance.play.type) {
            result += Math.floor(aPerformance.audience / 5);
        } 
    
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance) {
        return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
    }

    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumCredits, 0);
    }

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }
}