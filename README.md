## ch1 리팩터링: 첫 번째 예시
- 설계가 나쁜 시스템은 수정하기 어렵다. 
- 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다. 
  ```
  function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = '청구 내역 (고객명: ${invoice.customer}\n';
    const format = new Intl.NumberFormat("en-US", 
                    { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for(let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;

        switch(play.type) {
            case "tragedy":
                thisAmount = 40000;
                if(perf.audience > 30) {
                    thisAmount += 1000 *(perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if(perf.audience > 20) {
                    thisAmount += 10000 + 500 *(perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;W
            default:
                throw new Error('알 수 없는 장르: ${play.type}');
        }

        volumeCredits += Math.max(perf.audience - 30, 0);
        if("comedy" === play.type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }

        result += ' ${play.name}}: ${format(thisAmount/100)} (${perf.audience}석)\n';
        totalAmount + thisAmount;
    }
    result += '총액: ${format(totalAmount/100)}\n';
    result += '적립 포인트: ${volumCredits}점\n';
    return result;   
  }
  ```
  - 위 함수는 연극 장르와 공연료 정책이 달라질 때마다 statemnet 함수를 수정해야 한다.
  - 만약 HTML로 출력하는 htemlStatement()를 만든다면 statement 코드를 그대로 복사한 후 모든 수정이 두 함수에 일관되게 반영되도록 보장해야 한다. 

3. 리팩터링의 첫 단계
- 첫 단계는 항상 리팩터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드를 마련해야 한다. 
  - 테스트는 반드시 자가진단하도록 만든다.

4. statement() 함수 쪼개기
- 긴 함수를 리팩터링 할 때는 먼저 전체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다. 
- 코드 조각을 별도 함수로 추출하는 방식으로 앞의 조각낸 부분을 반영한다. (함수추출하기)
- 리팩터링 후 항상 테스트하는 습관을 들이자. 조금씩 수정하여 매번 테스트하자. 
- 임시변수는 나중에 문제를 일으킬 수 잇어 제거하는 것이 좋다. 

6. 계산 단계와 포맷팅 단계 분리하기
- 