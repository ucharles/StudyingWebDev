# Express.js

노드의 패키지 중 하나. 프레임워크<br>

### 프레임워크

프레임워크 또한 다른 사람들이 작성한 코드다.<br>
따라야하는 규칙이 있음. 통제받는 중.<br>
완전한 App을 작성하기 위해 도움을 줌.<br/>
개발속도 증가와 코드의 자유, 유연성을 교환<br/>
많은 사람들이 개발에 참여하는 경우라면 프레임워크를 사용하는 게 좋겠다.<br/>
러닝 커브가 존재한다. 적응 기간이 필요함.<br>

### 라이브러리

자신의 코드에 넣을지 말지 우리가 결정할 수 있음.

<hr>
애플리케이션 이름에 대문자를 넣지 말라는데? 왜지?<br>
NPM 패키지는 어플리케이션 이름에 대문자를 허용하지 않는다.<br>
왜냐하면 유닉스 파일 시스템이 대소문자를 구분하고, <br/>
이것이 혼란을 야기하고 비이동성 소프트웨어 제조법을 낳기 때문.<br>
(Windows는 대소문자를 구분하지 않기 때문에 별로 상관은 없다고 한다..)<br/>
<hr>

### 브라우저에서 요청을 받는 방법

app.use(req, res) : 브라우저에서 오는 모든 요청을 받음. 자주 안쓸거 같은데.. 언제 쓸수 있나..<br/>
이거 서버 닫을 때 쓸수 있는건가..? <br/>
자동 할당되는 매개변수 / req: 요청, res: 응답<br/>
HTTP Request는 자바스크립트 객체가 아님! 텍스트 정보이다.<br/>
서버 수정할 때마다 닫았다 열어야함.. 실시간 수정이 안되네..<br/>
nodemon으로 서버를 실시간 새로고침 가능!! 고민해결!!<br/>
[이 시스템에서 스크립트를 실행할 수 없으므로 어쩌고 해결하기-windows](https://singa-korean.tistory.com/21)

### 라우팅 Routing

경로를 지정하여 경로별로 응답을 다르게 할 수 있다..<br/>
라우팅 경로에 패턴 지정 가능, 변수 지정 가능!<br/>
경로에 변수를 지정하려면 :name 이렇게 쓰면 된다.<br/>

### EJS

html 내용을 분할 가능...!! ex) html 헤더를 다른 파일로 뺀다던가, nav를 따로 뺀다던가<br/>
분할 단위를 잘 정해야할 듯. 잘못쓰면 어디에 뭐가 포함되어있는지 몰라서 헷갈릴거 같다..<br/>
중요한 건 간단하게 재사용 가능한 단위로 분할해야 한다는 것<br/>
react의 컴포넌트 개념인가.

### REST

웹 어플리케이션을 설계할 때 따르는 규칙<br/>
균일한 인터페이스를 갖는다<br/>
HTTP를 통해
클라이언트와 서버
route, resource
HTTP를 통해 접근권한을

npm: UUID, 유니크 아이디를 생성해줌

### 브라우저의 HTML 양식은 GET, POST 요청만 보낼 수 있다?

[stackoverflow](https://stackoverflow.com/questions/16805956/why-dont-browsers-support-put-and-delete-requests-and-when-will-they)<br/>
정확히는 브라우저는 PUT, DELETE를 지원하지만, HTML이 지원하지 않는 것.<br/>
예를 들어, 브라우저는 JS로 AJAX를 통해 PUT를 요청할 수 있지만,<br/>
HTML의 form 으로는 불가능하다.<br/>
브라우저는 궁극적으로 HATEOAS 클라이언트다?<br/>
HATEOAS(Hypermedia as Engine of Application State)<br>
REST API를 사용하는 클라이언트가, 전적으로 서버와 동적인 상호작용이 가능하도록 하는 것.<br/>
예를 들어, 한 유저의 계좌 정보를 요청하면, 계좌번호와 잔액을 응답한다고 하자.<br>
HATEOAS를 사용할 경우, 해당 계좌의 상태에 따라 접근 가능한 추가 API들이 links라는 이름으로 제공된다.<br/>
자신의 상세 정보를 다시 조회한다거나, 예금인출을 하거나, 예금 송금을 한다거나... <br/>
[HATEOAS란? REST API란?](https://joomn11.tistory.com/26)<br/>

### SQL ? NOSQL ?

NOSQL의 종류<br>
key:value 방식... Redis, Cassandra

### 왜 데이터베이스를 사용하는가?

데이터의 지속성. <br/>
우리의 데이터가 없어지지 않고 지속되기를 원함. 저장하고 싶음.<br/>
데이터베이스는 데이터를 효율적으로 접근하게 하고, 압축하여 더 작은 용량을 차지하게 할 수도 있음.<br/>
데이터를 정렬해주고, 탐색해주고, 확장이 용이하다<br/>

### BSON

Binary JSON, 몽고는 바이너리로 저장함<br/>
바이너리로 변환함으로써, 메모리 사용량이 적고 가벼움.<br/>
JSON은 날짜 타입을 저장할 수 없지만, 몽고는 가능.<br/>
몽고는 컬렉션을 자동 생성해줌. 좋다.<br/>

Database, Collection, Documents<br>
Database, Table, Row(Tuple)<br>

### Mongoose

Schema: Document의 형태를 정의. 테이블의 형태를 정의?<br>
Model: Collection의 이름을 정의. Model을 정의할 때 그 속의 Document의 형태도 정의해야 함. Schema를 이용. <br>
모델 이름은 다르지만 같은 스키마를 이용하여 정의할 수도 있겠지<br>
Collection: RDB에선 테이블. Document의 집합.<br>
Documents: RDB에선 Row, Tuple. element의 집합<br>

<hr>
ODM(object data mapper), ORM<br/>
유효성 검사, 스키마 정의, 데이터나 문서를 JS 객체에 매핑할 것.<br/>
Model: 자바스크립트의 class. 컬렌션의 정보를 구체적으로, 나타내도록 함.<br>
!!중요!! 모델의 이름은 단수이고, 첫 글자는 대문자<br>
mongoose는 모델을 복수화 하고 소문자로 만들 것이다.<br>
Schema: 용어 설명서, 청사진, 게임 계획? DDL?<br>
Mongo -> JS, 다른 타입으로 가기 위한 콜렉션 키의 매핑<br>
Mongo의 데이터 타입이 다르고, JS의 데이터 타입이 다르니..<br>
새 모델로 인스턴스를 만든다는 것은, 객체가 save를 부를 때 까지는 데이터베이스에서 아무것도 할 수가 없다..<br/>
<hr>
[mongo 연산자](https://docs.mongodb.com/manual/reference/operator/query/)<br>
<hr>
비동기 await와 함께 exec()를 사용해야하는 이유??<br>
await Model.findOne();<br>
await Model.findOne().exec();<br>
위 둘이 수행하는 기능은 동일. 그러나 .exec()는 더 나은 스택 추적(stack trace)?? 을 제공하기 때문에 쓰는게 좋다.<br>
에러 추적에 관련된 내용인듯.. 예외 상황이 발생했을 때 출력되는 에러메시지가 약간 다름.<br>
exec()를 쓰면 정확히 어디서 에러가 난건지 집어주는듯. 안쓰면 라이브러리 안에서 에러 지적하고 끝남.<br>
<hr>
mongoose의 유효성 검사. Number 타입에 스트링 타입인 '숫자'를 넣으면 에러가 안나네..<br/>
[Schema type options](https://mongoosejs.com/docs/schematypes.html#schematype-options)
update할 때도 유효성 검사를 유지하고자 한다면, 3번째 인자에 옵션을 설정해줘야함..<br>
findOneAndUpdate({찾을 값}, {업데이트 할 값}, {옵션})<br>
<hr>
인스턴스 메소드 (Instance Method)[https://mongoosejs.com/docs/guide.html#methods]<br>
모델의 인스턴스는 도큐먼트이다. 도큐먼트는 자체적인 많은 빌트인 인스턴스 메소드를 갖고 있다.<br>
또한 커스텀 인스턴스 메소드도 정의할 수 있다.<br>
인스턴스 메소드는 스키마에서 정의.<br>
