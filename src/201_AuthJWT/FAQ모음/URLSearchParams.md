```javascript
const params = new URLSearchParams();
params.append('username', username);
params.append('password', password);
```

`URLSearchParams`는 브라우저에 내장된 웹 표준 API로, **데이터를 `key=value&key=value` 형태의 쿼리 스트링(Query String) 혹은 폼 데이터(Form Data) 포맷으로 쉽게 가공하고 관리할 수 있도록 도와주는 내장 객체**입니다.

이 코드가 왜 쓰였는지 `URLSearchParams`이 가진 고유의 기능과 연관 지어 쉽게 풀어드릴게요.

---

### 1. `URLSearchParams` 객체의 기능과 역할

일반적으로 자바스크립트에서 데이터를 다룰 때는 객체(JSON) 형태를 주로 씁니다.

```javascript
const data = { username: 'user1', password: 'password123' };

```

하지만 이 상태 그대로 백엔드에 보내면 백엔드는 `{ "username": "user1", ... }` 문자열로 인식하게 됩니다.

반면, `new URLSearchParams()`를 생성하고 여기에 `.append(key, value)` 메서드를 사용해 데이터를 하나씩 추가하면, 이 객체는 내부적으로 해당 데이터를 **인터넷 주소창 뒤에 붙는 쿼리 스트링이나 HTML `<form>` 전송 규격**으로 변환할 준비를 마칩니다.

즉, 우리가 작성한 코드는 내부적으로 다음과 같은 문자열 포맷을 띄게 됩니다.

```text
username=user1&password=password123

```

---

### 2. 왜 우리 로그인 코드에 이 기능이 꼭 필요한가? (FastAPI 와의 정합성)

앞서 질문하셨던 백엔드 controllers.py의 **`OAuth2PasswordRequestForm`** 기억하시나요?

FastAPI의 이 표준 로그인 양식은 "JSON 데이터는 받지 않고, 오직 `application/x-www-form-urlencoded` 형식의 폼 데이터만 받겠다"고 선언된 규칙입니다.

따라서 프론트엔드에서도 백엔드가 원하는 규격에 맞춰 데이터를 포장해야만 정상적으로 통신이 이루어집니다.

```javascript
// 1. URLSearchParams를 생성하여 데이터를 폼 포맷 양식으로 적재합니다.
const params = new URLSearchParams();  
params.append('username', username); // 결과 반영: username=유저입력값
params.append('password', password); // 결과 반영: username=유저입력값&password=암호입력값

// 2. Axios를 통해 데이터를 전송할 때, 헤더에 'Content-Type'을 폼 양식으로 명시하고 가공된 params를 보냅니다.
const response = await api.post('/api/login', params, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

```

이렇게 `URLSearchParams` 객체를 통째로 Axios의 body 데이터로 넘겨주면, Axios가 똑똑하게도 이 객체를 자동으로 `username=입력값&password=입력값` 형태의 문자열로 최종 변환하여 백엔드로 쏘아 보냅니다.

---

### 📌 요약

* **`URLSearchParams`**: 데이터를 주소창 파라미터나 HTML 폼 데이터 형식(`key=value&key=value`)으로 안전하게 변환해 주는 브라우저 표준 도구.
* **존재 이유**: 백엔드의 `OAuth2PasswordRequestForm`이 요구하는 **`application/x-www-form-urlencoded` 표준 데이터 포맷** 조건을 맞추어 에러(422) 없이 안전하게 로그인을 성사시키기 위함.