import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BoardItem = (props) => {

  const { id, user, subject, viewcnt, created_at} = props.post;

  return (
    <Card>
      <Card.Body>
      <Card.Title>{id}: {subject}</Card.Title>
        <Card.Text>작정자: {user} | 조회수: {viewcnt} | 작성일: {created_at}</Card.Text>
        <Link to = {"/detail/" + id} className="btn btn-primary">상세보기</Link>
      </Card.Body>
    </Card>
  );
};

export default BoardItem;