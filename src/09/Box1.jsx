import { useState, useEffect } from "react";

const Box1 = ({ createBoxStyle }) => {
    const [style, setStyle] = useState({});

    useEffect(() => {
      console.log("🎃 Box1 키우기");
      setStyle(createBoxStyle());
    }, [createBoxStyle]);



  return( 
    <div style={style}>Box1</div>
  );
};

export default Box1;
