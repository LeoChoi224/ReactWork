/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import BookItem from '../components/BookItem';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [books, setBooks] = useState([]);

  // 백엔드 쪽에 cross origin 설정이 되어 있어야 한다.
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/book",
    })
    .then(response => {
      const { data, status, statusText } = response;
      console.log(data);
      setBooks(data);
    })
  }, []);

  const navigate = useNavigate();
  const writeBook = () => navigate("/saveForm");

  return (
    <div>
        <h1>책 목록</h1>
        <Button variant='secondary' className="me-2" onClick={writeBook}>작성</Button>
        {
          books.map(book => <BookItem key={book.id} book={book}/>)
        }
    </div>
  );
};

export default Home;