import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import instance from '../docs/instance';

const WritePage = () => {

  const navigate = useNavigate();

  // 폼 유효성 검사 상태 (제출 버튼 클릭 전까지는 에러 메시지를 숨김)
  const [validated, setValidated] = useState(false);

  const [survey, setSurvey] = useState({
    name: "",
    age: "",
    gender: "",
    area: "",
    favorite: "",
  });

  const changeValue = e => {
    setSurvey({
      ...survey,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = e => {
    const { value, checked } = e.target;
    // 기존에 선택된 리스트 가져오기 (콤마 기준 분리)
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

    // 필수 데이터 유효성 검사
    if (!survey.name || !survey.age || survey.age < 0 || !survey.gender || !survey.area || !survey.favorite) {
      setValidated(true); // 에러가 있는 상태에서 제출 시 에러 메시지 표시 활성화
      return;
    }

    instance({
      method: 'post',
      url: 'write',
      data: JSON.stringify(survey),
    })
      .then(response => {
        const { data, status, statusText } = response;
        if (status === 201) {
          alert("제출완료");
          console.log('설문 작성완료', data);
          navigate(`/detail/${data.id}`);
        } else {
          console.log('설문 작성실패', status, statusText);
        }
      });
  };

  return (
    <Container className="mt-3" style={{ marginBottom: '200px' }}>
      <h2 className="display-6">설문 작성</h2>
      <hr />

      <Form onSubmit={handleSubmit}>
        {/* 이름 입력 */}
        <Form.Group className="mt-3" controlId="name">
          <Form.Label>
            <h5>이름 <small>(필수)</small></h5>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="이름를 입력하세요"
            onChange={changeValue}
            name="name"
            value={survey.name}
            // required
          />
          {validated && !survey.name && (
            <div className="mt-1">
              <span className="text-danger">이름은 필수입니다</span>
            </div>
          )}
        </Form.Group>

        {/* 나이 입력 */}
        <Form.Group className="mt-3" controlId="age">
          <Form.Label>
            <h5>나이</h5>
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="나이을 입력하세요"
            onChange={changeValue}
            name="age"
            min="1"
            // required
          />
          {validated && (!survey.age || survey.age <= 0) && (
            <div className="mt-1">
              <span className="text-danger">나이는 0이상의 값이어야 합니다</span>
            </div>
          )}
        </Form.Group>

        {/* 성별 선택 (라디오) */}
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
              inline
            />
            <Form.Check
              type="radio"
              label="여자"
              name="gender"
              id="gender2"
              value="FEMALE"
              checked={survey.gender === "FEMALE"}
              onChange={changeValue}
              inline
            />
          </div>
          {validated && !survey.gender && (
            <div className="mt-1">
              <span className="text-danger">성별을 선택해주세요</span>
            </div>
          )}
        </Form.Group>

        {/* 거주지역 선택 (셀렉트) */}
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

        {/* 이상형 선택 (체크박스) */}
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

        {/* 하단 버튼 */}
        <div className="my-3">
          <Button type="submit" variant="outline-dark" className="me-2">
            작성완료
          </Button>
          <Button as="a" variant="outline-dark" onClick={() => navigate("/list")}>
            목록
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default WritePage;