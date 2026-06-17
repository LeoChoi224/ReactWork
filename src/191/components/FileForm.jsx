// 업로드 폼 카드
import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function FileForm({ /* 🔷TODO */ }) {
  return (
    <Card className="mb-5 shadow-sm">
      <Card.Body>
        <Form onSubmit={ "🔷TODO" }>
          <Form.Group className="mb-3" controlId="fileInput">
            <Form.Label className="fw-semibold">파일 선택 (최대 2MB)</Form.Label>
            <Form.Control type="file" onChange={ "🔷TODO" } />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fileTitle">
            <Form.Label className="fw-semibold">파일 설명</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="파일에 대한 설명을 적어주세요 (필수)" 
              value={ "🔷TODO" }
              onChange={(e) => {/* 🔷TODO */}}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            업로드 시작
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default FileForm;