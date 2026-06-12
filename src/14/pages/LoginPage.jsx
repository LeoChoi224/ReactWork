import { useParams } from "react-router-dom";
import Login from "../components/login/Login";

const LoginPage = () => {
  let params = useParams();

  return (
    <>
    {/* dynamic segment의 id 값 */}
    {params.id}
      <Login />
    </>
  );
};

export default LoginPage;