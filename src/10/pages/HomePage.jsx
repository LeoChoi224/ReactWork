/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Home from '../components/home/Home';
import Footer from '../components/Footer';

const HomePage = () => {
  // HomePage 에서 다운로드할까?  Home 에 다운로드할까?
  // '재사용'되는 쪽에는 다운로드 하지 않도록 합니다.
  // 따라서 데이터 다운로드는 HomePage 에서 하되
  // 다운받은 데이터를 Home 으로 전달(pass)되어야 한다

  const [boards, setBoards] = useState([]);
  const [number, setNumber] = useState(0);
  const [user, setUser] = useState({});

  // 최초(마운트) 에 실행될 작업?
  useEffect(() => {
    // 다운로드 받은 데이터..
    let data = [
      { id: 1, title: "제목1", content: "내용1" },
      { id: 2, title: "제목2", content: "내용2" },
      { id: 3, title: "제목3", content: "내용3" },
    ];

    // ⚠️주의 fetch 혹은 axcios 로 비동기 다운로드 주의!
    setBoards([...data]);
    setUser({id:1, username: "최홍묵"});

  }, []);

  return (
    <>
      <Header />
      <div>{number}</div>

      {/* 하위 component 로 데이터를 pass!  이를 props 라 한다 */}
      <Home boards={boards} id={1} setBoards={setBoards}
        number={number} setNumber={setNumber}
        userinfo={user} />
      <Footer />
    </>
  );
};

export default HomePage;