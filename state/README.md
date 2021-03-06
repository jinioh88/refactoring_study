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

8. 다형성을 활용해 계산 코드 재구성하기
- 조건부 로직을 명확한 구조로 보안하는 방법중 하나는 조건부 로직을 다형성으로 바꾸기다. 
- 이 리팩터링을 적용하려면 상속 계층부터 정의해야 한다. 

---
## CH2 리팩터링 원칙
1. 리팩터링 정의
- 명사로써의 리팩터링: 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법.
- 동사로써의 리팩터링: 수프트웨어의 겉보기 동작은 그대로 유지한 채, 여러 가지 리팩터링 기법을 직용해 소프트웨어를 재구성하다. 
- 리팩터링 목적은 코드를 이해하고 수정하기 쉽게 만드는 것이다. 프로그램 성능은 좋아질 수도, 나빠질 수도 있다. 

2. 두 개의 모자
- 소프트웨어를 개발할 때 목적이 '기능추가'냐, 아니면 '리팩터링'이냐의 구분을 두 개의 모자라고 켄트백이 비유했다.
- 기능 추가는 기존 코드는 절대 건드리지 않고 새 기능을 추가하기만 한다. 
- 리팩토링할 때는 기능 추가는 절대 하지 않기로 다짐한 뒤 오로지 코드 재구성에만 전념한다. 

3. 리팩터링하는 이유
- 리팩터링하면 소프트웨어 설계가 좋아진다.
  - 리팩터링하지 않으면 소프트웨어의 내부 설계가 썩기 쉽다. 
  - 설계가 나쁘면 코드가 길어지기 십상이다. 
  - 중복 코드를 제거하면 모든 코드가 언제나 고유한 일을 수행함을 보장할 수 있고, 이는 바람직한 설계의 핵심이다. 
- 리팩터링하면 소프트웨어를 이해하기 쉬워진다.
  - 리팩터링은 코드가 더 잘 읽히게 도와준다. 코드의 목적이 더 잘 드러나게, 다시 말해 내 의도를 더 명확하게 전달하도록 개선할 수 있다. 
- 리팩터링하면 버그를 쉽게 찾을 수 있다.
  - 코드를 이해하기 쉽다는 말은 버그를 찾기 쉽다는 말이기도 하다. 
- 리팩터링하면 프로그래밍 속도를 높일 수 있다.
  - 내부 설계가 잘 된 소프트웨어는 새로운 기능을 추가할 지점과 어떻게 고칠지를 수비게 찾을 수 있다. 

4. 언제 리팩터링해야 할까?
- 준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기
  - 리팩터링하기 가장 좋은 시점은 코드베이스에 기능을 새로 추가하기 직전이다. 
  - 이 시점에 현재 코드를 살펴보면서, 구조를 살짝 바꾸면 다른 작업을 하기가 훨씬 쉬워질 만한 부분을 찾는다. 
- 이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기
  - 코드를 수정하려면 먼저 그 코드가 하는 일을 파악해야 한다. 
  - 코드를 파악할 때마다 그 코드의 의도가 더 명확하게 드러나도록 리팩터링할 여지는 없는지 찾아본다. 
- 쓰레기 줍기 리팩터링
  - 간단히 수정할 수 있는 것은 즉시 고치고, 시간이 좀 걸리는 일은 메모를 해두고 하던 일을 끝내고 나서 처리하는 방식이다. 
- 계획된 리팩터링과 수시로 하는 리팩터링
  - 리팩터링 작업 대부분은 드러나지 않게, 기회가 될 때마다 해야 한다. 
- 코드 리뷰에 리팩터링 활용하기
  - 리팩토링은 코드 리뷰의 결과를 더 구체적으로 도출하는 데 도움된다. 
  - 좋은 방법은 작성자와 나란히 앉아 코드를 훑어가면서 리팩터링하는 것이다. 자연스럽게 짝 프로그래밍이 된다. 
- 리팩터링하지 말아야 할 때
  - 외부 api 다루듯 호출해서 쓰는 코드라면 지저분해도 그냥 둔다. 내부 동작을 이해해야 할 시점에 리팩터링해야 효과를 제대로 볼 수 있다. 
  - 리팩터링하는 것보다 처음부터 새로 작성하는 게 쉬울 때도 리팩터링하지 않는다. 

---
## CH3 코드에서 나는 악취
1. 기이한 이름
- 코드를 명료하게 표현하는 데 가장 중요한 요소 하나는 바로 '이름'이다. 
- 함수, 모듈, 변수, 클래스 등은 그 이름만 보고도 각각이 무슨 일을 하고 어떻게 사용해야 하는지 명확히 알 수 있도록 엄청나게 신경 써서 이름을 지어야 한다. 
- 마땅한 이름이 떠오르지 않는다면 설계에 더 근본적인 문제가 숨어 있을 가능성이 있다. 

2. 중복 코드
- 똑같은 코드 구조가 여러 곳에서 반복된다면 하나로 통합하여 더 나은 프로그램을 만들 수 있다. 

3. 긴 함수
- 짧은 함수로 구성된 코드를 이해하기 쉽게 만드는 가장 확실한 방법은 좋은 이름이다. 
- 주석을 달아야 할 만한 부분은 무조건 함수로 만든다. 
  - 그 함수 본문에는 원래 주석으로 설명하려던 코드가 담기고, 함수이름은 동작 방식이 아닌 '의도'가 드러나게 짓는다.
  - 즉 '무엇을 하는지'를 코드가 잘 설명해주지 못할수록 함수로 만드는 게 유리하다. 

4. 긴 매개변수 목록
- 클래스는 매개변수 목록을 줄이는 데 효과적인 수단이기도 하다. 

5. 전역 데이터
- 전역 데이터는 코드베이스 어디에서든 건드릴 수 있고 값을 누가 바꿨는지 찾아낼 메커니즘이 없다는 게 문제다. 

6. 가변 데이터

7. 뒤엉킨 변경
- 코드를 수정할 땐 시스템에서 고쳐야 할 딱 한 군데를 찾아 그 부분만 수정할 수 있길 바란다. 
- 뒤엉킨 변경은 단일 책임 원칙이 제대로 지켜지지 않을 때 나타난다. 

8. 산탄총 수술
- 뒤엉킨 변경과 비슷하면서도 정반대다.
- 이 냄새는 코드를 변경할 때마다 자잘하게 수정해야 하는 클래스가 많을 때 풍긴다. 

9. 기능 편애
- 기능 편애는 흔히 어떤 함수가 자기가 속한 모듈의 함수나 데이터보다 다른 모듈의 함수나 데이터와 상호작용 할 일이 더 많을 때 풍기는 냄새다. 

10. 데이터 뭉치
- 몰려다니는 데이터 뭉치는 보금자리를 따로 마련해줘야 한다. 

11. 기본형 집착

12. 반복되는 switch문
- 예전과 비교해 지금은 다형성이 널리 자리 잡아 단순히 switch문을 썻다고 자동으로 검토 대상이 되진 않는 세상이 되었다.
- 게다가 분기 조건에 몇 가지 기본형만 쓸 수 있던 예전과 달리, 문자열 등의 더 복잡한 타입까지 지원하는 발전된 switch문을 제공하는 언어도 많아졌다. 
- 그러니 이제는 똑같은 조건부 로직이 여러 곳에서 반복해 등장하는 코드에 집중하자. 

13. 반복문
- 반복문을 파이프라인으로 바꾸기를 적용해 시대에 걸맞지 않은 반복문을 제거할 수 있게 되었다. 

14. 성의 없는 요소
- 여기서 요소란 프로그래밍 언어가 제공하는 함수(메서드), 클래스, 인터페이스 등 코드 구조를 잡는 데 활용되는 요소를 뜻한다. 

15. 추측성 일반화
- 이 냄새는 '나중에 필요할 거야'라는 생각으로 당장은 필요 없는 모든 종류의 후킹 포인트와 특이 케이서 처리 로직을 작성해듄 코드에서 풍긴다. 
- 이 결과로 이해하거나 관리하기 어려워진 코드가 된다. 당장 치워버리자.

16. 임시 필드
- 간혹 특정 상황에서만 값이 설정되는 필드를 가진 클래스도 있다. 
- 객체를 가져올 때 당연히 모든 필드가 채워져 있으리라 기대하는 게 보통이라, 이렇게 임시 필드를 갖도록 작성하면 코드를 이해하기 어렵다. 

17. 메시지 체인
- 클라이언트가 한 객체를 통해 다른 객체를 얻은 뒤 방금 얻은 객체에 또 다른 객체를 요청하는 식으로, 다른 객체를 요청하는 작업이 연쇄적으로 이어지는 코드를 말한다. 
- 이는 클라이언트가 객체 내비게이션 구조에 종속됐음을 의미한다.
- 그래서 내비게이션 중간 단계를 수정하면 클라이언트 코드도 수정해야 한다. 

18. 중개자
- 캡슐화 하는 과정에서 위임이 자주 활용되는데, 너무 과하면 문제가 된다. 

19. 내부자 거래
- 개발자들은 모듈 사이에 벽을 두텁게 세우기를 좋아하며, 그래서 모듈사이의 데이터 거래가 많으면 결합도가 높아진다고 투덜댄다. 
- 일이 돌아가게 하려면 거래가 이뤄질 수 밖에 없지만, 그 양을 최소로 줄이고 모두 투명하게 처리해야 한다. 

20. 거대한 클래스
- 한 클래스가 너무 많은 일을 하려다 보면 필드 수가 상당히 늘어난다. 
- 클래스에 필드가 너무 많으면 중복 코드가 생기기 쉽다. 
- 코드량이 너무 많은 클래스도 중복 코드와 혼동을 일으킬 여지가 크다. 

21. 서로 다른 인터페이스의 대안 클래스
- 클래스를 사용할 떄 큰 장점은 필요헤 따라 언제든 다른 클래스로 교체할 수 있다는 점이다.
- 단, 교체하려면 인터페이스가 같아야 한다. 

22. 데이터 클래스
- 데이터 클래스란 데이터 필드와 게터/세터 메서드로만 구성된 클래스를 말한다. 

23. 상속 포기
- 서브 클래스는 부모로부터 메서드와 데이터를 물려받는데, 부모의 유산 중 관심 있는 몇 개만 받고 끝내려는 경우가 얼마든지 있을 수 있다. 

14. 주석
- 주석이 장황하게 달린 원인이 코드를 자롯 작성했기 때문인 경우가 의외로 많다. 
- 주석을 남겨야겠다는 생각이 들면, 가장 먼저 주석이 필요없는 코드로 리팩터링해본다. 
- 뭘 할지 모를 때라면 주석을 달아두면 좋다. 현재 진행 상황뿐만 아니라 확실하지 않은 부분에 주석에 남긴다. 

---
## CH06 기본적인 리팩터링 
1. 함수 추출하기
- 코드 조각을 찾아 무슨 일을 하는지 파악한 다음, 독립된 함수로 추출하고 목적에 맞는 이름을 붙인다. 
- 코드를 언제 독립된 함수로 묶어야 할지에 관한 의견은 수없이 많다.
  - 먼저, 길이를 기준으로 삼을 수 있다. 함수가 한 화면을 넘어가면 안된다는 규칙을 떠올릴 수 있다. 
  - 재사용성을 기준으로 할 수 도 있다. 두
    - 번 이상 사용될 코드는 함수로 만들고, 한 번만 쓰이는 코드는 인라인 상태로 놔두는 것이다. 
  - 코드를 보고 무슨 일을 하는지 파악하는 데 한참이 걸리면 그 부분을 함수로 추출한 뒤 '무슨 일'에 걸맞는 이름을 짓는다. 
- 예시: 유효범위를 벗어나는 변수가 없을 때
  ```javascript
  function printOwing(invoice) {
    let outstanding = 0;

    console.log("****************");
    console.log("*** 고객 채무 ***")
    console.log("****************");

    for(const o of invoice.orders) {
        outstanding += o.amount;
    }

    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    console.log('고객명: ${invoice.customer}');
    console.log('채무액: ${outstanding}');
    console.log('마감일: ${invoice.duDate.toLocaleDateString()}');
  }
  ```
  - 코드를 잘라 새 함수에 붙이고, 원래 자리에 새함수 호출문을 넣어보자.
  ```javascript
  function printOwing(invoice) {
    let outstanding = 0;

    printBanner();

    for(const o of invoice.orders) {
        outstanding += o.amount;
    }

    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    printDetails();
  }

  function printBanner() {
      console.log("****************");
      console.log("*** 고객 채무 ***")
      console.log("****************");
  }

  function printDetails() {
  console.log('고객명: ${invoice.customer}');
      console.log('채무액: ${outstanding}');
      console.log('마감일: ${invoice.duDate.toLocaleDateString()}');
  }
  ```
- 예시: 지역 변수를 사용할 때
  - 지역 변수와 관련해 가장 간단한 경우는 변수를 사용하지만 다른 값을 다시 대입하지 않을 때다.
  - 이 경우 지역 변수들을 그냥 매개변수로 넘기면 된다. 
  ```javascript
  function printOwing(invoice) {
    let outstanding = 0;

    printBanner();

    for(const o of invoice.orders) {
        outstanding += o.amount;
    }

    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

    printDetails(invoice, outstanding)
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
  ```
  - 지역변수가 데이터구조(배열, 레코드, 객체)라면 똑같이 매개변수로 넘긴 후 필드 값을 수정할 수 있다. 
  ```javascript
  function printOwing(invoice) {
    let outstanding = 0;

    printBanner();

    for(const o of invoice.orders) {
        outstanding += o.amount;
    }

    recordDueDate(invoice);

    printDetails(invoice, outstanding)
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
  ```
- 예시: 지역 변수의 값을 변경할 때
  - 만약 매개변수에 값을 대입하는 코드를 발견하면 곧바로 그 변수를 쪼개서 임시 변수를 새로 하나 만들어 그 변수에 대입하게 한다. 
  - 대입 대상이 되는 임시 변수는 크게 두 가지다
    - 먼저 변수가 추출된 코드 안에서만 사용될 때다. 
    - 다음은 변수가 추출한 함수 밖에서 사용될 때다. 이경우 변수에 대입된 새 값을 반환해야 한다. 
  ```javascript
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
  ```
- 값을 반환할 변수가 여러 개라면?
  - 함수가 값 하나만 반환하는 방식을 선호하기 때문에 각각을 반환하는 함수 여러 개로 만든다. 

2. 함수 인라인하기
- 배경
  - 때때로 함수 본문이 이름만큼 명확한 경우가 있다. 
  - 이럴 경우 함수를 제거한다. 간접 호출은 유용할 수도 있지만 쓸데없는 간접 호출은 거슬린다. 
  - 리팩터링 과정에서 잘못 추출된 함수들도 다시 인라인한다. 
- 예시
  ```javascript
  function rating(aDriver) {
      return moreThanFiveLateDeilveries(aDriver) ? 2 : 1;
  }

  function moreThanFiveLateDeilveries(aDriver) {
      return aDriver.numberOfLateDeliveries > 5;
  }
  ```
  - 좀더 복잡한 경우
  ```javascript
  function reportLines(aCustomer) {
      const lines = [];
      gatherCustomerData(lines, aCustomer);
      return lines;
  }

  function gatherCustomerData(out, aCustomer) {
      out.push(["name", aCustomer.name]);
      out.push(["location", aCustomer.location]);
  }
  ```
  - 단 계를 잘게 나눠 하나씩 처리하자 
  ```javascript
  function reportLines(aCustomer) {
      const lines = [];
      lines.push(["name", aCustomer.name]);
      lines.push(["location", aCustomer.location]);
      return lines;
  }  
  ```

3. 변수 추출하기
- 배경
  - 표현식이 너무 복잡하면 지역 변수를 활용해 표현식을 쪼개 관리하기 쉽게 만들 수 있다. 
  - 이 과정에서 추가한 변수는 디버깅에도 도움이 된다. 
  - 변수추출을 고려해 표현식에 이름을 붙이기로 했다면 이름이 들어갈 문맥도 살펴야 한다. 
    - 현재 함수 안에서만 의미가 있다면 변수로 추출하는 것이 좋다. 
    - 함수를 벗어난 문맥에서까지 의미가 된다면 그 넓은 범위에서 통용되는 이름을 생각해야 한다. 
      - 즉 변수가 아닌 (주로) 함수로 추출해야 한다. 
- 예시
  ```javascript
  function price(order) {
      return order.quantity * order.itemPrice - 
          Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + 
          Math.min(order.quantity * order.itemPrice * 0.1, 100);
  }
  ```
  - 변수 이름을 지어주고 교체하자
  ```javascript
  function price(order) {
      const basePrice = order.quantity * order.itemPrice;
      const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
      const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100);
      
      return basePrice - quantityDiscount + shipping;
  }  
  ```
- 예시: 클래스 안에서
  ```javascript
  class Order {
      constructor(aRecord) {
          this.data = aRecord;
      }    

      get quantity() {
          return this.data.quantity;
      }

      get itemPrice() {
          return this.data.itemPrice;
      }

      get price() {
          return this.quantity * this.itemPrice - 
              Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 + 
              Math.min(order.quantity * order.itemPrice * 0.1, 100);
      
      }
  }
  ```
  - 추출하려는 변수 이름이 price() 메서드 범위를 넘어 주문을 표현하는 Order 클래스 전체에 적용된다. 
  - 클래스 전체에 영향을 줄 때는 변수가 아닌 메서드로 추출한다. 
  ```javascript
  class Order {
      constructor(aRecord) {
          this.data = aRecord;
      }    

      get quantity() {
          return this.data.quantity;
      }

      get itemPrice() {
          return this.data.itemPrice;
      }

      get price() {
          return this.basePrice - this.quantityDiscount + this.shipping;
      }

      get basePrice() {this.quantity * this.itemPrice;}
      get quantityDiscount() {Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;}
      get shipping() {Math.min(order.quantity * order.itemPrice * 0.1, 100);}
  }
  ```

4. 변수 인라인하기
- 배경
  - 변수 이름이 원래 표현식과 다를 바 없을 때도 있다. 
  - 또 변수가 주변 코드를 리팩터링하는 데 방해가 되기도 한다 .이럴 때 그 변수를 인라인하는 것이 좋다.


5. 함수 선언 바꾸기
- 배경
  - 함수는 프로그램ㅇ르 작은 부분으로 나누는 주된 수단이다. 
  - 함수 선언은 소프트웨어 시스템의 구성 요소를 조립하는 연결부 역할을 한다. 
  - 이런 연결부에서 가장 중요한 요소는 함수의 이름이다. 
    - 함수 호출문만 보고도 무슨일을 하는지 파악할 수 있다. 
  - 좋은 이름을 떠올리는데 효과적인 방법 중 하나는 주석을 이용해 함수의 목적을 설명해 보는 것이다. 
- 예시: 함수 이름 바꾸기(간단한 절차)
  ```javascript
  function circum(radius) {
      return 2 * Math.PI * radius;
  }
  ```
    - 각 단계를 순서대로 함수 이름 바꾸고 테스트하고 매개변수 변경하고 테스트 하는식으로 진행한다. 
  ```javascript
  function circumference(radius) {
      return 2 * Math.PI * radius;
  }
  ```
- 예시: 함수 이름 바꾸기(마이그레이션 절차)
  ```javascript 
  function circum(radius) {
      circumference(radius);
  }

  function circumference(radius) {
      return 2 * Math.PI * radius;
  }
  ```
  - circumference 함수를 만들고 잠시 리팩터링 작업을 멈춘다.
  - 가능하면 circum 함수는 폐기될 예정을 알린다. 
  - 클라이언트 모두가 circum 에서 circumference로 갈아탓다면 circum 함수를 삭제한다. 
  - 예시: 매개변수 속성으로 바꾸기
    ```javascript
    function inNewEngland(aCustomer) {
        return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
    }
    ```
    - 위 함수의 매개변수로 고객 대신 주 식별코드로 받도록 리팩토링하면 고객에 대한 의존성이 제거되어 더 넓은 문맥에 활용 될 수 있다. 

6. 변수 캡슐화하기 (다시보기)
- 배경
  - 데이터는 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 동작한다. 
  - 유효범위가 넓어질수록 다루기가 어려워진다. 
  - 접근할 수 있는 범위가 넓은 데이터를 옮길 땐 먼저 그 데이터로의 접근을 독점하는 함수를 만드는 식으로 캡슐화하는 것이 가장 조은 방법일 때가 많다. 
  - 불변 데이터는 가변 데이터보다 캡슐화할 이유가 적다. 
- 예시
  ```javascript
  // 전역변수에 데이터가 담겨 있는 경우
  let defaultOwner = {firstName: "마틴", lastName: "파울러"};
  ```
  

 
