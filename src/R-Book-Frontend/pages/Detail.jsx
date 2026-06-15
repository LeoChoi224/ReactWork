/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();

  let {id} = useParams();

  const [book, setBook] = useState({
    id: "",
    title: "",
    author: "",
    created_at: "",
  })

  useEffect(() => {
    axios.get("http://localhost:8000/book/" + id)
    .then(response => {
      const { data, status } = response;
      if(status === 200){
        console.log('🐹상세읽기', data);
        setBook(data);
      } else {
        alert('읽어오기 실패');
      }
    });
  }, []);


  const updateBook = () => navigate("/updateForm/" + id);

  const deleteBook = () => {
    if(!window.confirm("삭제하시겠습니까?")) return;

    axios.delete("http://localhost:8000/book/" + id)
    .then(response => {
      const { data, status, statusText }= response;
      if(status === 200){
        window.alert("삭제 성공");
        navigate("/");
      } else {
        window.alert("삭제 실패");
      }
    });
  };

  return (
    <div>
      <h1>상세보기: {book.id}</h1>
      <Button variant='warning' className="me-2" onClick={updateBook}>수정</Button>
      <Button variant='danger' className="me-2" onClick={deleteBook}>삭제</Button>
      <hr/>
      <h3>저자: {book.author}</h3>
      <h3>제목: {book.title}</h3>
      <p>등록일: {book.created_at}</p>
      <Button variant='secondary' className="me-2" onClick={() => navigate("/")}>목록으로</Button>
    </div>
  );
};

export default Detail;