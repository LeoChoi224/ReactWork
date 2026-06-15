import Top from './components/Top';
import Bottom from './components/Bottom';
import { Provider } from 'react-redux';
import { myStore } from './app/store';

// redux toolkit 사용 단계
// 1. 상태 slice 생성 -> createSlice()
// 2. 스토어 생성 -> configureStore()
// 3. useSelector, useDispatch로 상태 및 액션 연결 (React 컴포넌트와 Redux 연결)
//    -> provider()

const App182 = () => {

  return (
    <Provider store={myStore}>
      {/* Provider하위 component는 store을 구동하게 된다. */}
      <div className='container'>
        <h2>최상위 화면</h2>
        <Top />

        {/* Bottom 에서 변경한 내용이 Top에도 반영될까? */}
        <Bottom />
      </div>
    </Provider>
  );
};

export default App182;