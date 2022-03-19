# JavaScript

---

## What is JavaScript?

- A high-level language
  - 관리와 같은 복잡한 것들에 대해 생각할 필요가 없음.
    컴퓨터가 실행되거나 프로그램되는 동안의 메모리.
    자바스크립트에는 추상화(abstractions)가 많이 있다.
- Object-oriented
  - 데이터를 저장하기 위한 객체 개념을 기반으로 하는 언어.
- Multi-paradigm
  - 매우 유연하고 다재다능하다.
    모든 종류의 다양한 프로그래밍 스타일을 사용할 수 있다.
    명령형 및 선언적 프로그래밍과 같은.. (imperative and declarative programming)

---

## ES6 / ES2015

- JavaScript 에서 가장 큰 업데이트
- 이때부터 모던 자바스크립트라고 불림
- let, const 도입
  - let: 재할당(reassinging) 가능, 재정의 불가, 블럭 스코프
  - const: 재할당 불가, 재정의 불가, 불변 변수(immutable variable), 블럭 스코프, 빈 const 변수 선언 불가
  - clean code 를 위해서는: 기본적으로 const 를 사용하고, let 은 미래에 변수가 변경된다고 확신할 때 사용할 것을 권장.
  - let, const 를 사용하지 않고 변수를 선언할 경우, 해당 변수는 전역 개체에 선언됨.

---

## ES5 (ES6 이전)

- var : 변수를 정의하는 오래된 방법. 지금은 사용하지 말 것. 레거시 대응 등의 이유로 동작 방식은 이해해야 한다.
  - 재할당 가능, 재정의 가능, 함수 스코프

---

## 명명 규칙 (Convention Rule)

### 변수

- 자바스크립트는 주로 camelCase를 사용.
- 변수명에는 숫자, 문자, 밑줄(underscore, \_), 달러 사인만을 포함할 수 있음.
- 변수의 첫 글자로 숫자는 사용 불가. 예약어 사용 불가(new, function 등, 사용하고 싶은 경우 밑줄이나 달러 사인을 붙이자.).
- 문법을 어기는 것은 아니지만, 변수의 첫 글자로 영대문자는 사용하지 않는다.
- 실제 상수인 경우, 변수명을 대문자로 작성.(PI=3.1415)
- 변수명을 정의할 때, 변수가 보유하고 있는 값이 정확히 무엇인지 이해하기 쉬워야 함.

---

Value 는 Object(객체) 혹은 원시(primitive) 이다.
객체가 아닌 모든 경우는 원시적이다.

### The 7 Primitive Data Types

1. Number
2. String
3. Boolean
4. Undefined (not yet defined, empty value, 선언만 하고 값을 할당하지 않은 변수)
5. null (empty value)
6. Symbol (ES2015, value that is unique and cannot be changed, not useful now)
7. BigInt (ES2020, Larger integers than the Number type can hold)

자바스크립트는 동적 타이핑(dynamic typing) 기능이 존재한다.
데이터 유형을 수동으로 정의할 필요가 없다.

---

## 연산자

2 \* 3 === 2 \* 2 \* 2 (지수 연산자)

사칙 연산자가 비교 연산자보다 먼저 실행됨.

[MDN 연산자 우선 순위](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
