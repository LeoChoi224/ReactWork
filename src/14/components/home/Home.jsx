import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = (props) => {

  const navigate = useNavigate();

  return (
    <div>
      <h1>홈페이지</h1>
      <button onClick={() => navigate("/login/20")}>/login/20</button>
      <button onClick={() => navigate("/login/30")}>/login/30</button>
      <hr />
      <Button>Primary</Button>{' '}
      <Button variant="secondary">secondary</Button>{' '}
      <Button variant="success" >Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>{' '}
      <Button variant="link">Link</Button>{' '}
      {/* https://react-bootstrap.netlify.app/ */}


    </div>
  );
};

export default Home;