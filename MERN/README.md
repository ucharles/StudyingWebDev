REST API<br/>
Routes: URL 설정<br/>
Controllers:<br/>
Models: 데이터 스키마, 모델<br/>

IF ONLY FRONTEND<br/>
서버에서 로직을 실행할 수 없다는 건 무엇을 뜻하는가??<br/>
데이터를 저장하지 못한다는 얘기인가.<br/>

SERVER<br/>
모든 요청에 개방되어 있음<br/>

웹의 프론트와 백은 HTTP request로 통신함..<br/>
통신 data는 json 방식 javascript object notation<br/>

React SPA<br/>

Routes (with react-router-dom)<br/>
: 라우트 설정, 페이지 요소<br>
State Management (Hooks, Redux)<br/>
: 리덕스 로직, 리액트 훅, 커스텀 훅<br>
Components + Styling (CSS)<br/>

API를 정의하는 방법은 2가지.<br/>
REST API: 여러개의 엔드포인트, 프론트가 엔드포인트를 다 알아야함..<br/>
GraphQL API: 하나의 URL + HTTP 동사(= 하나의 엔드포인트, 일정한 엔드포인트, ONLY POST 요청), 그것은 query를 접수함.<br/>
query를 사용하여 다른 작업을 트리거 하는 등..<br/>
이건 백엔드가 알아야하나?<br/>

POST 방식은 데이터베이스에 실제로 무언가 저장하는 요청은 아님..<br/>

REST vs GraphQL<br/>

REST<br/>
엔드포인트가 여러개.<br/>
URL + HTTP method 조합으로 행동을 정의함. 직관적이고 배우기 쉬움.<br/>
모든 프론트엔드와 독립적. 완전히 분리되어 있음. 재사용 가능, 다른 프론트엔드 연결 가능.<br/>
가장 대중화된 API, 사용하기 쉽고, 문서화 하기 쉽고, 배우기 쉽다.<br/>

GraphQL<br/>
엔드포인트가 하나(post)<br/>
쿼리 표현식을 사용하여 리소스를 식별함.<br/>
모든 프론트엔드와 독립적. 완전히 분리되어 있음 (REST와 공통점)<br/>
유명하지만 대중적이지 않음, 쿼리를 배워야 한다.<br/>

node와 react를 연결하는 방법<br/>

1. 같은 도메인, 같은 서버에서 node와 react를 동시에 호스팅 하는 경우<br/>
   같은 서버에 있지만 분리되어 있으므로 서로에 대해 알지 못함. api를 통해 통신함.<br/>
2. node와 react가 분리된 경우<br/>
   node는 API 요청을 핸들링<br/>
   정적 호스트에서 서빙되는 react SPA (서버측 코드를 실행할 필요가 없음), HTML, JS, CSS를 반환하는 서버.<br/>
3. node + express 서버가 SSR 페이지를 렌더링하고, react는 페이지의 일부만 제어하는 경우.<br/>

1,2번 모두 논리적으로 분리된 앱이다. node와 react는 물리적으로 같은 서버에 설치할 수 있음.<br>

CORS... 서버 헤더에 나오네 이게 무엇인가..<br>
[교차 출처 리소스 공유(CORS)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)<br>

fecth의 순서<br>
fetch -> fetch의 성공 여부 체크 -> fetch 결과의 json 습득 -> 성공 여부에 따라 에러를 던짐<br>

앱을 개발하는 순서<br>

1. 아이디어 구상<br>
2. 디자인 만들기, 스케치 하기<br>
3. 데이터 모델 구상<br>
4. 엔드 포인트 구현(API, Backend), 페이지 구현(SPA, Frontend)<br>

[React + TypeScript](https://freestrokes.tistory.com/159)<br>

리액트에 타입스크립트를 씌워보았다. 정말 하나하나 다 정하지 않으면 에러가 나고 컴파일이 안됨...<br>

1. component의 prop에 타입 지정을 제대로 안한 경우<br>
2. component에 리턴이 없는데 App에서 component 출력을 한 경우<br>

<hr>
const [최신 상태 스냅샷, 업데이트할 수 있는 함수] = useState(초기값);<br>
1. 내부에 저장된(초기값) 상태 데이터를 업데이트.<br>
2. 갱신된 내용만 부분 렌더링.<br>

중첩 라우팅(Nested routes with react router)<br/>
BrowserRouter: 라우트의 최상위에 위치.<br/>
Redirect: 보통 최하단에 위치. 세부경로 그 어디에도 해당이 안되는 경우 리다이렉트 가능.<br/>
Route: 반드시 BrowserRouter 안에 존재해야 함. 라우터의 세부경로 지정 가능. 최상위 Route에 exact를 안 붙이면 분기가 안됨.. 왜지?<br/>
react-route-dom v6부터는 생략 가능하다고 나와있는데.. 정확히 내용이 뭐지..<br>
Switch: 라우팅 경로를 IF문처럼 지정 가능.<br/>

코드를 분할하고 구조화 하는 방법은 만드는 사람에게 달려 있음.<br/>
가장 좋은 방법은 없고 올바른 방법은 없다.<br/>
하지만 모든 구성 요소가 상대적으로 작고, 집중되고, 세분화된 구조를 갖는 것이 나쁜 경우는 거의 없다.<br/>

props.children<br>
<부모 요소> {여기가 자식} </부모 요소><br/>

<React.Fragment><br/>
JS의 한계로, return 값에 할당할 수 있는 것은 단 하나뿐.<br>
return에 분리된 두 개의 요소가 있으면 syntax error.<br>
이를 해결하기 위한 react 요소가 react.fragment이다.<br>
실제로 html에 출력되지는 않음.<br>

react-router-dom<br>
useParams() ... URL에서 파라메터 습득 가능<br>

event.preventDefault()<br>
괄호를 안붙이면 새로고침됨..!!<br>

React Hook<br>
함수형 컴포넌트에서만 사용 가능. 클래스형에선 사용 불가.<br>
useState, useEffect, useReducer, useRef,<br>

useReducer: useState를 두개 쓰는 대신 사용함.. 좀더 복잡한 상태를 쉽게 관리 가능?
inter connect state?

useEffect, useCallback -> 공통점, 불필요한 렌더링을 피하기 위해 사용.<br>
변수가 어디에 뭐땜에 쓰이는지 알기가 힘듬..<br>
TypeScript 사용이 절실... 리액트... 상태관리 함수부터 난이도 급상승...<br>

JS에서 for는 예약어이므로, JSX에서 for를 쓰고 싶을 땐 htmlFor를 쓰자.<br>

API키는 외부에 공개해선 안된다.. 모르고 깃에 푸시했는데 1시간만에 메일옴.. URL 주면서 여기에 공개되었다고...<br>
ㅠㅠ 키 관리를 이렇게 해주는구나.. 반면 웹의 정보를 얼마나 수집하는건지.. 어떻게 이게 가능한거지..??<br>
React app에 API키를 보관하지 말라고 한다. 백엔드에 두라네..<br>

훅.. 이해가 안된다.. 내가 바보인건가.. 뭔말이야..