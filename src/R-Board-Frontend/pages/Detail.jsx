import { useEffect, useState } from 'react';
import instance from '../docs/instance';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Detail = () => {

  const navigate = useNavigate();
  let { id } = useParams();

  const [board, setBoard] = useState({
    id: "",
    user: "",
    subject: "",
    content: "",
    viewcnt: "",
    created_at: "",
  });

  useEffect(() => {
    instance({
      method: "get",
      url: "detail/" + id,
    })
      .then(response => {
        const { data, status } = response;
        if (status === 200) {
          console.log('상세 조회', data);
          setBoard(data);
        } else {
          alert('읽어오기 실패');
        }
      });
  }, []);

  const deleteBook = () => {
    if (!window.confirm("삭제하시겠습니까?")) return;

    instance({
      method: "delete",
      url: "delete/" + id,
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          console.log("삭제 성공", data);
          window.alert("삭제 성공");
          navigate("/list");
        } else {
          console.log("삭제 실패", status, statusText);
          window.alert("삭제 실패");
        }
      });
  };

  return (
    <div>
      <h1>조회 - {board.subject}</h1>
      <hr />
      <h3>id: {board.id}</h3>
      <h3>작성자: {board.user}</h3>
      <h3>제목: {board.subject}</h3>
      <h3>내용: {board.content}</h3>
      <p>조회수: {board.viewcnt}</p>
      <p>작성일: {board.created_at}</p>
      <Button variant='warning' className="me-2" onClick={() => navigate("/update/" + id)}>수정</Button>
      <Button variant='primary' className="me-2" onClick={() => navigate("/")}>목록</Button>
      <Button variant='danger' className="me-2" onClick={deleteBook}>삭제</Button>
      <Button variant='secondary' className="me-2" onClick={() => navigate("/write")}>작성</Button>
    </div>
  );
};

export default Detail;