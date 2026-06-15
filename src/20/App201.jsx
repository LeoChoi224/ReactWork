import { useState } from "react";

/**
 * form 에서 value, key, defaultValue
 *
 *  ■ value= 속성
 *    Controlled component <= 'React 상태(state)' 와 동기화 하여 로 제어
 *    초깃값(기본값) 없슴
 *    html 에서 value 와는 다르다!!
 *
 *
 *  ■ defaultValue= 속성
 *    Uncontrolled component <= 초깃값 설정만 하고, 이후 'React 상태'와 동기화 하진 않음
 *                              최초 렌더링 이후 DOM 에서 자체 관리
 *    초깃값(기본값) 가능
 *
 *  ■ key= 속성
 *    상태 초기화 강제 리렌더링용 <= key 값이 변경되면 리렌더링됨.
 *    초깃값(기본값) 가능
 */

/**
 * 리스트에서 key= 값
 *
 *  리스트를 렌더링할 때 각 요소에 고유한 key 속성이 없을 때 경고 발생  (개발자 도구에서 확인)
 *
 *  [key 가 필요한 이유]
 *
 *   React는 리스트의 각 요소를 렌더링하고 업데이트할 때 효율적으로 DOM을 관리하기 위해 key를 사용합니다.
 *   React는 Virtual DOM을 활용하여 변경된 부분만 실제 DOM에 반영하려고 하는데,
 *   key를 통해 각 요소를 고유하게 식별할 수 있으므로 변경 사항을 정확히 파악할 수 있습니다.
 *
 *   key 가 동일하면 동일한 컴포넌트로 간주.
 *
 *   key 값은 '고유한 식별자' 사용을 권장합니다
 *
 */

const App201 = () => {
  const [controlledValue, setControlledValue] = useState('grape')

    const [key, setKey] = useState(1);

  // useState() 로 등록된 setXX() 함수에 '함수' 를 전달하면
  //  매개변수(이전값) 을 받아서 새로이 set 할 값을 리턴하게 할수 있다.
  const resetSelect = () => setKey(prevKey => prevKey + 1);   // 기존 값을 +1 증가.

  // 리스트에서 key=
  const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
  ];


  return (
    <>
      {/* --------------------------------------------- */}
      <hr />
      <ul>
        {items.map(item => <li>id:{item.id}-{item.name}</li>)}
      </ul>

      <hr />
      <ul>
        {items.map(item => <li key={item.id}>id:{item.id}-{item.name}</li>)}
      </ul>
      {/* --------------------------------------------- */}

      <hr />
      <h2>Controlled Component (value=)</h2>
      <select
        value={controlledValue}
        onChange={e => setControlledValue(e.target.value)}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange </option>
        <option value="grape">Grape</option>
      </select>
      <p>Selected: {controlledValue}</p>
      {/* --------------------------------------------- */}

      <hr />
      <h2>Uncontrolled Component (defaultValue=)</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          alert(`You selected: ${e.target.elements.fruit.value}`)
        }}
      >
        <select defaultValue="banana" name="fruit"
        >
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange </option>
          <option value="grape">Grape</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {/* --------------------------------------------- */}

      <hr />
        <select key={key} defaultValue="orange">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange </option>
          <option value="grape">Grape</option>
        </select>
        <button onClick={resetSelect}>Reset Select</button>
    </>
  );
};

export default App201;