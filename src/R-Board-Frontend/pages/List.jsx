/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../docs/instance";
import { Button } from "react-bootstrap";
import BoardItem from "../components/BoardItem";

const List = () => {

  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    instance({
      method: "get",
      url: "list",
    })
      .then(response => {
        const { data, status, statusText } = response;
        console.log(data);
        setBoards(data);
      })
  }, []);

  return (
    <div>
      <h1>목록</h1>
        {
          boards.map(post => <BoardItem key={post.id} post={post}/>)
        }
        <Button variant='primary' className="me-2" onClick={() => navigate("/write")}>작성</Button>
    </div>
  );
};

export default List;