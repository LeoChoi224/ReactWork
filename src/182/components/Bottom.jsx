import { useDispatch, useSelector } from "react-redux";
import "../CSS/App.css";
import { decrement, increment, incrementByAmount } from "../features/counterSlice";

const Bottom = () => {

  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className='sub_container'>
      <h4>Bottom</h4>
      count: {count}
      <button onClick={() => dispatch(increment())}>증가</button>
      <button onClick={() => dispatch(decrement())}>감소</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>증가+2</button><br/>
    </div>
  );
};

export default Bottom;