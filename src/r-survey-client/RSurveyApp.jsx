import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import WritePage from "./pages/WritePage";
import UpdatePage from "./pages/UpdatePage";
import { Container } from "react-bootstrap";

const RSurveyApp = () => {
  return (
    <BrowserRouter>
    <Container>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />  {/* 목록 */}
        <Route path="/list" Component={ListPage}></Route>  {/* 목록 */}
        <Route path="/detail/:id" Component={DetailPage}></Route>  {/* 상세보기 */}
        <Route path="/write" Component={WritePage}></Route>  {/* 작성 */}
        <Route path="/update/:id" Component={UpdatePage}></Route>  {/* 수정 */}
      </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default RSurveyApp;