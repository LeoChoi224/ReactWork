import { configureStore } from "@reduxjs/toolkit";

// {} 없이 import하면 해당 파일의 default export를 가져온다.
// counterSlice에서 default export한 것을 원하는 이름으로 import 한다.
import counterReducer from "../features/counterSlice"

// 여기서 export 한 store를 <provider store=...>에 설정
export const myStore = configureStore({
  reducer: {
    counter: counterReducer,  // 원하는 이름으로 key 설정 가능.  -> 나중에 useSelector 에서 접근 가능. 
  },

  // counterReducer는 Redux Slice에서 생성된 '리듀서'를 가져온 것입니다
  // '리듀서'는 상태(state)를 관리하는 함수로,
  // Redux Toolkit에서는 createSlice를 사용해 간단하게 생성할 수 있습니다.    

});