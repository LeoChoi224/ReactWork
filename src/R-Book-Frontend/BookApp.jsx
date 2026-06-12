import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import SaveForm from './pages/SaveForm';
import UpdateForm from './pages/UpdateForm';

import 'bootstrap/dist/css/bootstrap.min.css';

const BookApp = () => {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" Component={Home}></Route>  {/* 목록 */}
            <Route path="/book/:id" Component={Detail}></Route>  {/* 상세보기 */}
            <Route path="/saveForm" Component={SaveForm}></Route>  {/* 작성 */}
            <Route path="/updateForm/:id" Component={UpdateForm}></Route>  {/* 수정 */}
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default BookApp;