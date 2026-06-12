import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


// styled.Link  <- 이런거 없다
const StyledHeadLink = styled(Link)`
  color: red;
  text-decoration: none;
`;

const StyledHeaderDiv = styled.div`
  border: 2px solid blue;
  margin: 10px;
`;

const Header = () => {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link className='nav-link' to={'/'}>Home</Link>
            <Link className='nav-link' to={'/login/80'}>/login/80</Link>
            <Link className='nav-link' to={'#pricing'}>Pricing</Link>
          </Nav>
        </Container>
      </Navbar>
      <StyledHeaderDiv>
        <ul>
          {/* <li><a href='/'>홈</a></li>
        <li><a href='/login'>로그인</a></li>
          🙅 안되는 이유: <a>태그는 페이지 자체를 새로 request 하는거다 (React에선 부하가 많이 걸린다)
        */}
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/login/10">로그인/10</Link>
          </li>
          <li>
            <StyledHeadLink to="/login/50">로그인/50</StyledHeadLink>
          </li>
        </ul>
      </StyledHeaderDiv>
    </>
  );
};

export default Header;