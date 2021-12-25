REST API  
Routes: URL 설정  
Controllers:  
Models: 데이터 스키마, 모델

IF ONLY FRONTEND  
서버에서 로직을 실행할 수 없다는 건 무엇을 뜻하는가??  
데이터를 저장하지 못한다는 얘기인가.

SERVER  
모든 요청에 개방되어 있음

웹의 프론트와 백은 HTTP request로 통신함..  
통신 data는 json 방식 javascript object notation

React SPA

Routes (with react-router-dom)  
: 라우트 설정, 페이지 요소  
State Management (Hooks, Redux)  
: 리덕스 로직, 리액트 훅, 커스텀 훅  
Components + Styling (CSS)

API를 정의하는 방법은 2가지.  
REST API: 여러개의 엔드포인트, 프론트가 엔드포인트를 다 알아야함..  
GraphQL API: 하나의 URL + HTTP 동사(= 하나의 엔드포인트, 일정한 엔드포인트, ONLY POST 요청), 그것은 query를 접수함.  
query를 사용하여 다른 작업을 트리거 하는 등..  
이건 백엔드가 알아야하나?

POST 방식은 데이터베이스에 실제로 무언가 저장하는 요청은 아님..

REST vs GraphQL

REST  
엔드포인트가 여러개.  
URL + HTTP method 조합으로 행동을 정의함. 직관적이고 배우기 쉬움.  
모든 프론트엔드와 독립적. 완전히 분리되어 있음. 재사용 가능, 다른 프론트엔드 연결 가능.  
가장 대중화된 API, 사용하기 쉽고, 문서화 하기 쉽고, 배우기 쉽다.

GraphQL  
엔드포인트가 하나(post)  
쿼리 표현식을 사용하여 리소스를 식별함.  
모든 프론트엔드와 독립적. 완전히 분리되어 있음 (REST와 공통점)  
유명하지만 대중적이지 않음, 쿼리를 배워야 한다.

node와 react를 연결하는 방법

1. 같은 도메인, 같은 서버에서 node와 react를 동시에 호스팅 하는 경우  
   같은 서버에 있지만 분리되어 있으므로 서로에 대해 알지 못함. api를 통해 통신함.
2. node와 react가 분리된 경우  
   node는 API 요청을 핸들링  
   정적 호스트에서 서빙되는 react SPA (서버측 코드를 실행할 필요가 없음), HTML, JS, CSS를 반환하는 서버.
3. node + express 서버가 SSR 페이지를 렌더링하고, react는 페이지의 일부만 제어하는 경우.

1,2번 모두 논리적으로 분리된 앱이다. node와 react는 물리적으로 같은 서버에 설치할 수 있음.

CORS... 서버 헤더에 나오네 이게 무엇인가..  
[교차 출처 리소스 공유(CORS)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

fecth의 순서  
fetch -> fetch의 성공 여부 체크 -> fetch 결과의 json 습득 -> 성공 여부에 따라 에러를 던짐

앱을 개발하는 순서

1. 아이디어 구상
2. 디자인 만들기, 스케치 하기
3. 데이터 모델 구상
4. 엔드 포인트 구현(API, Backend), 페이지 구현(SPA, Frontend)

[React + TypeScript](https://freestrokes.tistory.com/159)

리액트에 타입스크립트를 씌워보았다. 정말 하나하나 다 정하지 않으면 에러가 나고 컴파일이 안됨...

1. component의 prop에 타입 지정을 제대로 안한 경우
2. component에 리턴이 없는데 App에서 component 출력을 한 경우

---

const [최신 상태 스냅샷, 업데이트할 수 있는 함수] = useState(초기값);

1. 내부에 저장된(초기값) 상태 데이터를 업데이트.
2. 갱신된 내용만 부분 렌더링.

중첩 라우팅(Nested routes with react router)  
BrowserRouter: 라우트의 최상위에 위치.  
Redirect: 보통 최하단에 위치. 세부경로 그 어디에도 해당이 안되는 경우 리다이렉트 가능.  
Route: 반드시 BrowserRouter 안에 존재해야 함. 라우터의 세부경로 지정 가능. 최상위 Route에 exact를 안 붙이면 분기가 안됨.. 왜지?  
react-route-dom v6부터는 생략 가능하다고 나와있는데.. 정확히 내용이 뭐지..  
Switch: 라우팅 경로를 IF문처럼 지정 가능.

코드를 분할하고 구조화 하는 방법은 만드는 사람에게 달려 있음.  
가장 좋은 방법은 없고 올바른 방법은 없다.  
하지만 모든 구성 요소가 상대적으로 작고, 집중되고, 세분화된 구조를 갖는 것이 나쁜 경우는 거의 없다.

props.children  
<부모 요소> {여기가 자식} </부모 요소>

<React.Fragment>  
JS의 한계로, return 값에 할당할 수 있는 것은 단 하나뿐.  
return에 분리된 두 개의 요소가 있으면 syntax error.  
이를 해결하기 위한 react 요소가 react.fragment이다.  
실제로 html에 출력되지는 않음.

react-router-dom  
useParams() ... URL에서 파라메터 습득 가능

event.preventDefault()  
괄호를 안붙이면 새로고침됨..!!

React Hook  
함수형 컴포넌트에서만 사용 가능. 클래스형에선 사용 불가.  
useState, useEffect, useReducer, useRef,

useReducer: useState를 두개 쓰는 대신 사용함.. 좀더 복잡한 상태를 쉽게 관리 가능?
inter connect state?

useEffect, useCallback -> 공통점, 불필요한 렌더링을 피하기 위해 사용.  
변수가 어디에 뭐땜에 쓰이는지 알기가 힘듬..  
TypeScript 사용이 절실... 리액트... 상태관리 함수부터 난이도 급상승...

JS에서 for는 예약어이므로, JSX에서 for를 쓰고 싶을 땐 htmlFor를 쓰자.

API키는 외부에 공개해선 안된다.. 모르고 깃에 푸시했는데 1시간만에 메일옴.. URL 주면서 여기에 공개되었다고...  
ㅠㅠ 키 관리를 이렇게 해주는구나.. 반면 웹의 정보를 얼마나 수집하는건지.. 어떻게 이게 가능한거지..??  
React app에 API키를 보관하지 말라고 한다. 백엔드에 두라네..

훅.. 이해가 안된다.. 내가 바보인건가.. 뭔말이야..

---

React의 상태관리! Context. 드디어 나왔다.
props를 사용하지 않고 상태를 관리할 수 있다고..?

---

### Node.js

참고: [Node.js에 관해 후회하는 10가지](https://www.youtube.com/watch?v=M3BM9TB-8yA&t=152s)

왜 노드로만 서버를 만들지 않는가?
[프레임워크가 없는 Node.js 서버](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework)
response 작업은 request 작업보다 수고가 훨씬 많이 들어감.
(method가 post인 경우.. if문을 걸어서 어쩌고 저쩌고..)
이러한 문제를 해결하기 위해 창의적인 해결책을 찾아야함.  
(솔직히 시간낭비다) => express를 사용하자.

### express

express의 핵심 철학! 미들웨어!  
모든 요청은 미들웨어 기능을 통해 전달된다. (GET, POST, ...)

const app = express();
app.xxx <- 이거 하나하나를 미들웨어라고 하는것 같다.
미들웨어란: A function that gets a request and may return a response  
(or edit request or response and move on to the next middleware)  
미들웨어는 함수다. 요청을 get 하고 응답을 return함.

Node.js는 서버가 실행될 때 모든 스크립트를 구동하고, 모든 미들웨어의 포인터를 메모리에 등록함.

express middleware 함수는 언제 실행되느냐?
요청이 미들웨어 함수에 도달할 때마다.

[import 와 require의 차이](https://qiita.com/minato-naka/items/39ecc285d1e37226a283)
한마디로 정리하면 브라우저용(ES6)과 서버용(node.js).  
import를 server에서 쓰고 싶으면 Webpack? 같은 걸 사용해야 한다고 함.
nest.js 같은 경우는 import 사용 가능.

---

### 유효성 검사 (Validation)는 언제 해야하는가?

유효하지 않은 값이라는 걸 어떻게 사용자에게 알릴 것인가?

1. 프론트 엔드 (POST로 데이터를 서버에 보내기 전에)
2. 백엔드 (프론트로부터 데이터를 받았을 때)
3. DB 삽입 전 ()

프론트엔드에서 JS로 유효성 검사를 한다 해도, 개발자 도구에서 쉽게
코드를 고칠 수 있기 때문에, 백엔드에서 다시 점검을 해야함..!

---

### SQL vs NoSQL

SQL  
테이블 정의가 필요, 테이블 안의 요소의 정의가 필요(자료형, 크기, ...)  
관계를 정의할 수 있음  
이커머스, 계약, 네트워크(소셜 네트워크?)

NoSQL  
SQL보단 데이터간 관계에 느슨함, Documents(테이블)은 독립적
Log, Orders, (Chat) Messages에 최적화.

### 프론트엔드와 DB를 직접 연결하지 않는 이유?

프론트엔드의 코드는 브라우저에서 실행되므로, 코드가 모든 사용자에게 노출됨.  
보안상 매우 위험. 데이터베이스는 코드가 노출되지 않는 백엔드에 연결해야함.

### 비동기 await와 함께 exec()를 사용해야하는 이유

await Model.findOne();  
await Model.findOne().exec();

위 둘이 수행하는 기능은 동일. 하지만 위쪽은 리턴값이 Promise가 아닌  
Promise 같은 다른 것이고, 아래쪽은 Promise를 리턴함.  
그리고 .exec()는 더 나은 스택 추적(stack trace)?? 을 제공하기 때문에 쓰는게 좋다.  
에러 추적에 관련된 내용인듯.. 예외 상황이 발생했을 때 출력되는 에러메시지가 약간 다름.  
exec()를 쓰면 정확히 어디서 에러가 난건지 집어주는듯. 안쓰면 라이브러리 안에서 에러 지적하고 끝남.

### mongoose의 id와 \_id

id: string, \_id: Object

몽고디비 뭔가 꼬임.. 컴파스로 바로 실행이 안되네.. 으음~~~  
트랜잭션 안되는거 해결할 때 몽고디비를 npm으로 깔았었는데 그때 뭔가 꼬인듯..
cmd에서 mongod로 실행하면 어떻게 연결은 된다..

### CORS

cross origin resource sharing

같은 서버에서 오는 데이터만 신뢰 가능.  
이것은 프론트엔드(브라우저)에서 차단하는 것.  
프론트엔드의 포트(3000)와 백엔드의 포트(5000)가 다르기 때문에,
이 두 서버는 "다른 서버"이다.
이것을 해결하기 위해선 백엔드 쪽에서 헤더에 편지를 써야함.  
모든 요청에 첨부해야 함.

---

### JSON 데이터 가공은 프론트에서? 백에서?

백에서 잘 가공하여, 프론트에서 가공할 일이 없게 해야하나?  
물론 이게 이상일 듯 한데... 백에서 JSON key 값이 바뀌면..?? 흠... 그런일이 일어나나?  
(잘 가공이라 함은, 이름도 정확히 정해져 문서화 되어있고,  
JSON 문서 계층 구성이 원하는 데이터를 찾아가기 쉽게 되어있다는 말..?)

### React... useState와 무한루프와 useCallback

아직 이해를 못했다. 왜 무한 루프가 발생한다는거지... 강의를 제대로 봐야겠다.
