/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SaveForm = () => {

  const navigate = useNavigate();

  // 사용자 입력값도 '상태'  <- 서버로 넘기기 편해진다.
  const [book, setBook]= useState({
    title: "",
    author: "",
  })

  const changeValue = e => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const submitBook = e => {
    e.preventDefault();   
    axios({
      method: 'post',
      url: 'http://localhost:8000/book',
      headers: {"Content-Type": "application/json;charset=utf-8"},
      data: JSON.stringify(book),   // 편하다~
    })
    .then(response => {
      const {data, status, statusText} = response;
      if(status === 201){   // 201 CREATED 성공
        console.log('🎃책 작성완료', data);
        navigate(`/book/${data.id}`);   // 방금 생성된 id 값 사용!
      } else {
        alert("등록 실패");
      }
    });
  };

  return (
    <div>
      <h1>책 등록하기</h1>
      <Form onSubmit={submitBook}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" onChange={changeValue} name="title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Enter Author" onChange={changeValue} name="author" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SaveForm;