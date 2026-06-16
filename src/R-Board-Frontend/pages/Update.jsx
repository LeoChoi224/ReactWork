import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../docs/instance";

const Update = () => {

  let { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState({
    id: "",
    subject: "",
    content: "",
  })

  useEffect(() => {
    instance({
      method: "get",
      url: "read/" + id,
    })
      .then(response => {
        const { data, status } = response;
        if (status === 200) {
          setBoard(data);
        } else {
          window.alert('읽어오기 실패');
        }
      });
  }, []);

  const changeValue = e => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };


  const submitBoard = e => {
    if (!window.confirm("수정하시겠습니까?")) return;
    e.preventDefault();
    instance({
      method: 'put',
      url: 'update/' + id,
      data: JSON.stringify(board),
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          alert("수정 성공");
          console.log('게시글 수정완료', data);
          navigate("/read/" + id);
        } else {
          console.log('게시글 수정실패', status, statusText);
          alert("수정 실패");
        }
      });
  };


  return (
    <div>
      <h1>수정</h1>
      <p>id: {board.id}</p>
      <p>조회수: {board.viewcnt}</p>
      <p>작성일: {board.created_at}</p>
      <p>작성자: {board.user}</p>
      <Form onSubmit={submitBoard}>

        <Form.Group className="mb-3" controlId="formBasicSubject">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="Enter Subject" onChange={changeValue} name="subject" value={board.subject}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContent">
          <Form.Label>내용</Form.Label>
          <Form.Control type="text" placeholder="Enter Content" onChange={changeValue} name="content" value={board.content}/>
        </Form.Group>

        <Button variant="secondary" type="submit">수정완료</Button>
        <Button variant="primary" onClick={() => navigate(`/detail/${id}`)}>이전으로</Button>
        <Button variant="primary" onClick={() => navigate("/list")}>목록</Button>

      </Form>
    </div>
  );
};

export default Update;