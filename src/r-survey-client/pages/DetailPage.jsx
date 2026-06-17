
import { useEffect, useState } from 'react';
import { Container, Alert, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../docs/instance';

const DetailPage = () => {

  const navigate = useNavigate();
  let { id } = useParams();

  const [survey, setSurvey] = useState({
    id: "",
    name: "",
    age: "",
    gender: "",
    area: "",
    favorite: "",
    created_at: "",
  });

  useEffect(() => {
    instance({
      method: "get",
      url: "detail/" + id,
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          console.log('상세 조회', data);
          setSurvey(data);
        } else {
          alert('읽어오기 실패', statusText);
        }
      });
  }, []);

  // 삭제 버튼 클릭 시 실행될 핸들러
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    instance({
      method: "delete",
      url: "delete/" + id,
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          console.log("삭제 성공", data);
          window.alert("삭제되었습니다");
          navigate("/list");
        } else {
          console.log("삭제 실패", status, statusText);
          window.alert("삭제 실패");
        }
      });
  };

  return (
    <Container className="mt-3" style={{ marginBottom: '200px' }}>
      <h2 className="display-6">설문 상세조회</h2>
      <hr />

      {/* 상단 알림 영역 */}
      <Alert variant="light" className="d-flex justify-content-between">
        <span>{survey.id}</span>
        <span>{survey.created_at} 작성</span>
      </Alert>

      {/* 상세 정보 영역 */}
      <section>
        <Form.Group className="mt-3">
          <h5>이름</h5>
          <Form.Control type="text" value={survey.name} readOnly />
        </Form.Group>

        <Form.Group className="mt-3">
          <h5>나이</h5>
          <Form.Control type="text" value={survey.age} readOnly />
        </Form.Group>

        <Form.Group className="mt-3">
          <h5>성별</h5>
          <Form.Control
          type="text"
          value={survey.gender === "MALE" ? "남자" : "여자"}
          readOnly
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <h5>거주지역</h5>
          <Form.Control type="text" value={survey.area} readOnly />
        </Form.Group>

        <Form.Group className="mt-3">
          <h5>이상형</h5>
          <Form.Control type="text" value={survey.favorite} readOnly />
        </Form.Group>
      </section>

      {/* 하단 버튼 영역 */}
      <div className="d-flex my-3">
        <Button as="a" variant="outline-dark" onClick={() => navigate("/update/" + id)}>
          수정
        </Button>
        <Button as="a" variant="outline-dark" className="ms-2" onClick={() => navigate("/list")}>
          목록
        </Button>
        <Button type="button" variant="outline-danger" className="ms-2" onClick={handleDelete}>
          삭제
        </Button>
        <Button as="a" variant="outline-dark" className="ms-2" onClick={() => navigate("/write")}>
          작성
        </Button>
      </div>
    </Container>
  );
};

export default DetailPage;