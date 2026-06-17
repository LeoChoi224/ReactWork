import { useEffect, useState } from 'react';
import { Container, Table, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import instance from '../docs/instance';
import SurveyItem from '../components/SurveyItem';

const ListPage = () => {

  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    instance({
      method: "get",
      url: "list",
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          console.log("목록 읽어오기 성공");
          setSurveys(data);
        } else {
          console.log('읽어오기 실패', statusText);
        }
      })
  }, []);


  return (
    <Container className="mt-3" style={{ marginBottom: '200px' }}>
      <h2>설문 목록</h2>
      <hr />

      {/* 목록 테이블 */}
      <Table hover responsive>
        <thead className="table-success">
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (<SurveyItem key={survey.id} survey={survey} />))}
        </tbody>
      </Table>

      {/* 하단 링크 버튼 */}
      <Row>
        <Col xs={12}>
          <Button as="a" variant="outline-dark" onClick={() => navigate("/write")}>
            작성
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ListPage;