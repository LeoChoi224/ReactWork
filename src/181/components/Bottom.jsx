import "../CSS/App.css";

const Bottom = (props) => {
  const { addNumber } = props;

  return (
    <div className='sub_container'>
      <h4>Bottom</h4>
      <button onClick={addNumber}>증가</button>
    </div>
  );
};

export default Bottom;