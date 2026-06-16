import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import instance from "../docs/instance";

const Write = () => {

  const navigate = useNavigate();

  const [board, setBoard] = useState({
    user: "",
    subject: "",
    content: "",
  })

  const changeValue = e => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const submitBoard = e => {
    e.preventDefault();
    instance({
      method: 'post',
      url: 'write',
      data: JSON.stringify(board),
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 201) {
          alert("등록 성공");
          console.log('게시글 작성완료', data);
          navigate(`/detail/${data.id}`);
        } else {
          console.log('게시글 작성실패', status, statusText);
          alert("등록 실패");
        }
      });
  };

  return (
    <div>
      <h1>작성</h1>
      <hr />
      <Form onSubmit={submitBoard}>
        <Form.Group className="mb-3" controlId="formBasicUser">
          <Form.Label>작성자</Form.Label>
          <Form.Control type="text" placeholder="Enter User" onChange={changeValue} name="user" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicSubject">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="Enter Subject" onChange={changeValue} name="subject" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContent">
          <Form.Label>내용</Form.Label>
          <Form.Control type="text" placeholder="Enter Content" onChange={changeValue} name="content" />
        </Form.Group>

        <Button variant="secondary" type="submit">작성완료</Button>
        <Button variant="primary" onClick={() => navigate("/list")}>목록</Button>
      </Form>
    </div>
  );
};

export default Write;