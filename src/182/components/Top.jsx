import { useSelector } from "react-redux";
import "../CSS/App.css";

const Top = () => {
  
  const count = useSelector((state) => state.counter.value);

  return (
    <div className='sub_container'>
        <h4>Top</h4>
        count: {count} 
    </div>
  );
};

export default Top;