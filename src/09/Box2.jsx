/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

// box 컴포넌트가 마운팅이 되면 createBoxStyle 함수를 prop으로 전달됨
const Box2 = ({ createBoxStyle }) => {
  const [style, setStyle] = useState({});

  // 1. box 가 맨처음 렌더링 될 때
  // 2. props으로 받은 createBoxStyle 변경이 될때 불리게 됨
  useEffect(() => {
    console.log("🎨 Box2 키우기");
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  return <div style={style}>Box2</div>;
};
export default Box2;
