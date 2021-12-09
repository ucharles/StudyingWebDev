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
fetch -> fetch의 성공 여부 체크 -> fetch 결과의 json 습득 -> 성공 여부에 따라 에러를 던짐<br>\

앱을 개발하는 순서

1. 아이디어 구상
2. 디자인 만들기, 스케치 하기
3. 데이터 모델 구상
4. 엔드 포인트 구현(API, Backend), 페이지 구현(SPA, Frontend)
