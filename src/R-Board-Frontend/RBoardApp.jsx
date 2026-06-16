import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./pages/List";
import Detail from "./pages/Detail";
import Write from "./pages/Write";
import Update from "./pages/Update";

const RBoardApp = () => {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/" Component={List}></Route>  {/* 목록 */}
            <Route path="/list" Component={List}></Route>  {/* 목록 */}
            <Route path="/detail/:id" Component={Detail}></Route>  {/* 상세보기 */}
            <Route path="/read/:id" Component={Detail}></Route>  {/* 상세보기 */}
            <Route path="/write" Component={Write}></Route>  {/* 작성 */}
            <Route path="/update/:id" Component={Update}></Route>  {/* 수정 */}
          </Routes>
        </Container>
      </BrowserRouter> 
    </>
  );
};

export default RBoardApp;