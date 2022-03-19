# udemy-web-developer-bootcamp-2022

Javascript
비동기 처리 인터프리트 언어
[JS는 컴파일 방식인가? 인터프리터 방식인가?](https://curryyou.tistory.com/237)

## 비동기 처리를 위한 함수들

(콜백 지옥 탈출!!!, 콜백이 매우 얽힌 형태를 nested라고 표현)

콜백 지옥에 빠지면?
읽기 힘들고, 이해하기 힘들고, 시간이 오래 걸리고, 유지보수 하기 힘들고, 버그가 발생하고, 서비스 장애, 매출 하락...
여러모로 문제가 많다..

이를 해결하기 위한 비동기 처리 방식이 몇가지 있다

- Promise (ES2015, ES6)
- async, await (ES2017, ES8)

### Promise

IE는 지원 안함
Promise는 객체.
특징
Promise의 Status는 3가지.
pending(대기), resolved(값을 받음), rejected(에러 혹은 시간 초과)
자기 자신(Promise)을 리턴할 수 있음.
(이 경우엔 Promise마다 에러 핸들링을.. 할 수가 없음?)
.then으로 처리를 연결, .catch로 에러 핸들링 가능
물론 콜백형식으로도 작성 가능. Promise마다 에러 핸들링 가능.

### async, await

!!! IE 지원 안함 !!!
함수에 async를 표기할 경우, Promise를 명시적으로 표기하지 않아도 Promise를 리턴함.
async 함수 안에 에러가 있거나, 우리가 에러를 던질 경우 Promise는 rejected(거절)됨.
값을 리턴할 경우, Promise는 resolved(해결?) 됨.

await 키워드를 사용할 때마다 비동기식 함수의 실행을 멈추게 하고
await가 붙은 비동기 함수의 Promise가 resolved될 때까지 기다림.

### Web API

http, server, request, json, information for app, not for free, giant string,

### JSON

사용하려면 JS에서 파싱할 필요가 있음.
JSON 객체를 String로 만들 수도 있음.
JSON -> JS : JSON.parse()
JS -> JSON : JSON.stringify()

### HTTP Request

툴이 몇가지 있음. Postman, Insomnia, ...
Header에 정보를 설정함으로써 JSON 습득 가능!
key: Accept, value: application/json

AXIOS: http request library...
Promise 기반 HTTP client...
IE11 지원, 요청 중단 가능, response timeout 쉽게 지정 가능, CSRF 보호 기능 내장, upload progress를 지원, JSON 자동 변환
http request의 헤더 지정 가능!
axios.get('URL', {headers: {Accept: 'application/json'}})

### Fetch API

[MDN Web Docs: Using Fetch](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch)
!!! IE 지원 안함 !!!
fetch는 기본적으로 모든 데이터가 return 되었을때 마치게 되는데<br>
fetch는 Promise 객체를 반환함.

.then을 사용하여 작성할 수도 있고, async, await를 사용하여 작성할 수도 있다.
async가 더 짧음. 읽기 쉬움.

### 이벤트 루프

JS는 싱글 스레드. 즉 콜 스택이 1개라는 의미.
이 상태에서 지연, blocking을 해결하기 위해 비동기 처리를 함.
이벤트 루프의 역할은 콜 스택과 태스크 큐를 주시하는 것.
콜 스택이 비워졌을 때, 태스크 큐의 내용이 콜 스택으로 들어감.

렌더큐?? 콜 스택에 뭔가 있을땐 렌더큐가 멈춤..
느린 코드를 짜지 마라: 콜 스택에 쓸데없는 걸 쌓지 마라

실제로 콜백 큐에 무슨 일이 일어나는지 보는게 좋다..
