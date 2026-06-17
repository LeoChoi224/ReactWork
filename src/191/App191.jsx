import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Modal, Alert, Card } from 'react-bootstrap';
import api from './api'; 

import 'bootstrap/dist/css/bootstrap.min.css';

// 분리한 컴포넌트 임포트
import FileForm from './components/FileForm';
import FileTable from './components/FileTable';
import ImageModal from './components/ImageModal';

const App191 = () => {
  // state 들 정의
  // 🔷TODO

  // 1. 파일 목록 가져오기
  // 🔷TODO

  // 파일 선택 핸들러
  // 🔷TODO

  // 2. 파일 업로드 핸들러
  // 🔷TODO

  // 3. 파일 다운로드 처리
  // 🔷TODO

  // 4. 이미지 보기 처리 (모달 팝업 실행)
  // 🔷TODO

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold text-primary">파일 업로드 및 관리 시스템</h2>
      
      {/* 알림 메시지 영역 */}
      <Alert variant="danger" onClose={() => {/* 🔷TODO */}} dismissible>{ "🔷TODO" }</Alert>
      <Alert variant="success" onClose={() => {/* 🔷TODO */}} dismissible>{ "🔷TODO" }</Alert>

      {/* [컴포넌트 1] 업로드 폼 카드 */}
      <FileForm 
          // 🔷TODO
      />

      {/* [컴포넌트 2 & 3] 업로드된 파일 목록 테이블 (내부적으로 Row 컴포넌트 호출) */}
      <h4 className="mb-3 fw-semibold">업로드된 파일 목록</h4>
      <FileTable 
        // 🔷TODO
      />

      {/* [컴포넌트 4] 이미지 미리보기 팝업 모달 */}
      {/* <ImageModal 
        // 🔷TODO
      /> */}
    </Container>
  );
};

export default App191;