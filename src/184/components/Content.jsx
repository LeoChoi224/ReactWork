import { UserContext } from "../context/UserContext";

const Content = () => {

  const user = UserContext(UserContext);

  return (
    <div>
      <p>홍묵이 오늘 점심 뭐 먹지?</p>
      <p>{user}님 오늘은 메뉴가 뭔가요?</p>
    </div>
  );
};

export default Content;