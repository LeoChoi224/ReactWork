import { createSlice } from "@reduxjs/toolkit";

// '리듀서(reducer)' 는 상태(state) 를 관리하는 함수.
// Redux toolkit 의 createSlice() 를 사용해 간단하게 생성할수 있다.

// createSlice() 는 initialState, reducers (액션 로직) 등을 설정한 뒤 자동으로 리듀서를 생성합니다.
const counterSlice = createSlice({
  name: "counter",  // slice 이름.

  initialState: { value: 0 },  // 초기 상태

  // reducer 개념
  // (state, action) => (state)

  reducers: {
    // action: (기본 state) => {... state 변경 수행 ...}
    increment: (state) => {
      state.value += 1;  // state 를 직접 변경 가능.
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;  // 액션에서 전달 된 값 payload
    },

  },

});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// createSlice() 는 initialState, reducers (액션 로직) 등을 설정한 뒤 자동으로 리듀서를 생성합니다.
// 이때 counterSlice.reducer를 export default로 내보냈고, 이 리듀서를 counterReducer로 사용할 수 있습니다.
// 여기서 생성된 리듀서가 counterReducer입니다.
export default counterSlice.reducer;