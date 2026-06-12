import { Route, Routes } from "react-router-dom";
import Footer from "../14/components/Footer";
import Header from "../14/components/Header";
import HomePage from "../14/pages/HomePage";
import LoginPage from "./pages/LoginPage";

const App141 = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/login/:id" Component={LoginPage} />
                         {/* ↑ Dynamic segment : FastAPI 의 경로변수와 비슷 => LoginPage 의 props 으로 전달. */}
      </Routes>
      <Footer />
    </>
  );
};

export default App141;