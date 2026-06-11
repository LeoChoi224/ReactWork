/* eslint-disable react-refresh/only-export-components */
let num1 = 10, num2 = 20;

const Sub = () => {
  return (
    <div>
      Sub
    </div>
  );
};

// default export 는 1개만 가능.
export default Sub;

// 다른 것들도 export 하려면
export {num1 as num, num2};