/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styled from 'styled-components';

const StyleItemBoxDiv = styled.div`
  border: 1px solid black;
  padding: 10px;
  height: 30px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListPage = () => {

  // 폼 입력 데이터도 상태변수로 다룸
  const [post, setPost] = useState({id: "", title: "", content: ""});

  // 게시글 목록
  const [posts, setPosts] = useState([
    {id:1, title:"제목1", content: '내용1'},
    {id:2, title:"제목2", content: '내용2'},
    {id:3, title:"제목3", content: '내용3'},
    {id:4, title:"제목4", content: '내용4'},
    {id:5, title:"제목5", content: '내용5'},

  ]);

  const handleWrite = (e) => {
    e.preventDefault();     // form submit 시 기본액션을 중지.
    // setPosts() 로 새로운 글 추가
    // setPosts([...posts, post]);

    if(!isNaN(parseInt(post.id))){
      let idx = posts.findIndex(p => parseInt(p.id) === parseInt(post.id));
      if(idx === -1)
        setPosts([...posts, post]);  //  추가
      else
        setPosts(posts.map(p => parseInt(p.id) === parseInt(post.id) ? {...p, ...post} : p));  // 수정
    }
  };

  const handleChangeId = e => {
    console.log('Id:', e.target.value);
    setPost({...post, id: e.target.value});
  };
  const handleChangeTitle  = e => {
    console.log('Title:', e.target.value);
    setPost({...post, title: e.target.value});    
  };
  const handleChangeContent  = e => {
    console.log('Content:', e.target.value);
    setPost({...post, content: e.target.value});    
  };

  const handleForm = e => {
    console.log(e.target.name, e.target.value);   // name-value 확인

    setPost({...post, [e.target.name]: e.target.value });
    console.log(post.id, post.title, post.content);  // 바뀌었는지 확인.    
  };

  // 삭제
  const handleDelete = (id) => {
    setPosts(posts.filter( p => parseInt(p.id) !== parseInt(id)));
  }


  return (
    <>
      <h4>글목록페이지</h4>
      <form onSubmit={handleWrite}>
        id: <input type="number" placeholder='id 입력...' value={post.id} onChange={handleForm} name="id"/><br/>
        제목: <input type="text" placeholder='제목을 입력하세요...' value={post.title} onChange={handleForm} name="title"/><br/>
        내용: <input type="text" placeholder='내용을 입력하세요...' value={post.content} onChange={handleForm} name="content"/><br/>
        <button type="submit">글쓰기</button><br/>
      </form>      

      <hr/>
      {posts.map(post => 
        <StyleItemBoxDiv>
          <div>
            🟠번호:{post.id} 🟡제목:{post.title} 🟣내용:{post.content}
          </div>
          <button onClick={() => handleDelete(post.id)}>삭제</button>
        </StyleItemBoxDiv>
      )}
    </>
  );
};

export default ListPage;