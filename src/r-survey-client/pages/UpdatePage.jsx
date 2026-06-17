import { useEffect, useState } from 'react';
import { Container, Alert, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../docs/instance';

const UpdatePage = () => {

  let { id } = useParams();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

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
        const { data, status } = response;
        if (status === 200) {
          setSurvey(data);
        } else {
          window.alert('읽어오기 실패');
        }
      });
  }, []);

  const changeValue = e => {
    setSurvey({
      ...survey,
      [e.target.name]: e.target.value,
    });
  };

  // 체크박스 (이상형) 중복 선택 및 콤마(,) 조인 핸들러
  const handleCheckboxChange = e => {
    const { value, checked } = e.target;
    let selected = survey.favorite ? survey.favorite.split(',').map(v => v.trim()).filter(Boolean) : [];

    if (checked) {
      if (!selected.includes(value)) {
        selected.push(value);
      }
    } else {
      selected = selected.filter(v => v !== value);
    }

    setSurvey({
      ...survey,
      favorite: selected.join(',')
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!survey.age || !survey.gender || !survey.area || !survey.favorite) {
      setValidated(true);
      return;
    }

    instance({
      method: 'put',
      url: 'update/',
      data: JSON.stringify(survey),
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 200) {
          alert("수정완료");
          console.log('설문 작성완료', data);
          navigate(`/detail/${data.id}`);
        } else {
          console.log('설문 작성실패', status, statusText);
        }
      });
  };

  return (
    <Container className="mt-3" style={{ marginBottom: '200px' }}>
      <h2 className="display-6">설문 수정</h2>
      <hr />

      {/* 상단 알림 영역 */}
      <Alert variant="light" className="d-flex justify-content-between">
        <span>Id: {survey.id}</span>
        <span>{survey.created_at} 작성</span>
      </Alert>

      <Form onSubmit={handleSubmit}>
        {/* 이름 (읽기 전용) */}
        <Form.Group className="mt-3" controlId="name">
          <Form.Label>
            <h5>이름</h5>
          </Form.Label>
          <Form.Control type="text" value={survey.name} readOnly />
        </Form.Group>

        {/* 나이 (읽기 전용) */}
        <Form.Group className="mt-3" controlId="age">
          <Form.Label>
            <h5>나이</h5>
          </Form.Label>
          <Form.Control type="text" value={survey.age} readOnly />
          {validated && (!survey.age || survey.age <= 0) && (
            <div className="mt-1">
              <span className="text-danger">나이는 0이상의 값이어야 합니다</span>
            </div>
          )}
        </Form.Group>

        {/* 성별 (라디오 - 기존 선택: 남자) */}
        <Form.Group className="mt-3">
          <Form.Label>
            <h5>성별</h5>
          </Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="남자"
              name="gender"
              id="gender1"
              value="MALE"
              checked={survey.gender === "MALE"}
              onChange={changeValue}
              defaultChecked
            />
            <Form.Check
              type="radio"
              label="여자"
              name="gender"
              id="gender2"
              value="FEMALE"
              checked={survey.gender === "FEMALE"}
              onChange={changeValue}
            />
          </div>
          {validated && !survey.gender && (
            <div className="mt-1">
              <span className="text-danger">성별을 선택해주세요</span>
            </div>
          )}
        </Form.Group>

        {/* 거주지역 (셀렉트 - 기존 선택: 서울) */}
        <Form.Group className="mt-3" controlId="area">
          <Form.Label>
            <h5>거주지역 <small>(택1)</small></h5>
          </Form.Label>
          <Form.Select name="area" value={survey.area} onChange={changeValue}>
            <option value="" disabled>-- 거주지역을 선택해 주세요 --</option>
            <option value="서울">서울</option>
            <option value="경기도">경기도</option>
            <option value="기타">기타</option>
          </Form.Select>
          {validated && !survey.area && (
            <div className="mt-1">
              <span className="text-danger">거주지역을 선택해주세요</span>
            </div>
          )}
        </Form.Group>

        {/* 이상형 (체크박스) */}
        <Form.Group className="mt-3">
          <Form.Label>
            <h5>이상형 <small>(1개이상 선택)</small></h5>
          </Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              label="고윤정"
              name="favorite"
              id="favorite1"
              value="고윤정"
              checked={survey.favorite.split(',').includes("고윤정")}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              label="장원영"
              name="favorite"
              id="favorite2"
              value="장원영"
              checked={survey.favorite.split(',').includes("장원영")}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              label="카리나"
              name="favorite"
              id="favorite3"
              value="카리나"
              checked={survey.favorite.split(',').includes("카리나")}
              onChange={handleCheckboxChange}
            />
          </div>
          {validated && !survey.favorite && (
            <div className="mt-1">
              <span className="text-danger">한명이상은 반드시 골라야 합니다</span>
            </div>
          )}
        </Form.Group>

        {/* 하단 버튼 영역 */}
        <div className="my-3 d-flex">
          <Button type="submit" variant="outline-dark">
            수정완료
          </Button>
          <Button type="button" variant="outline-dark" onClick={() => navigate("/detail/" + id)} className="ms-1">
            이전으로
          </Button>
          <Button as="a" variant="outline-dark" onClick={() => navigate("/list")} className="ms-1">
            목록
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UpdatePage;