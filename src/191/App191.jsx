import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Modal, Alert, Card } from 'react-bootstrap';
import api from './api';

import 'bootstrap/dist/css/bootstrap.min.css';

// 분리한 컴포넌트 임포트
import FileForm from './components/FileForm';
import FileTable from './components/FileTable';
import ImageModal from './components/ImageModal';

const App191 = () => {
  // state 들 정의
  const [files, setFiles] = useState([]);

  const [title, setTitle] = useState(''); // 사용자 입력 : 파일 설명(제목?)
  const [selectedFile, setSelectedFile] = useState(null); // 사용자 선택 : 파일 객체

  const [error, setError] = useState('');     // 화면 상단에 노출할 경고/에러 메세지
  const [success, setSuccess] = useState(''); // 화면 상단에 노출할 성공처리 알림 메세지

  const [showModal, setShowModal] = useState(false);      // 이미지 미리보기 모달 노출 여부
  const [currentImgUrl, setCurrentImgUrl] = useState(''); // 모달 이미지 태그가 추적할 경로
  const [modalTitle, setModalTitle] = useState('');       // 모달 상단에 노출할 해당 이미지의 title 정보


  // 1. 파일 목록 가져오기
  const fetchFiles = async () => {
    try {
      const response = await api.get('');  // 'http://127.0.0.1:8000/api/files' 로 GET 요청
      setFiles(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || '💥목록을 불러오는데 실패했습니다');
    }
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);  // 첫번째 단일 선택 파일
    setError('');
  }

  // 2. 파일 업로드 핸들러
  //    폼 submit 
  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 제출전에 검증
    if (!selectedFile) {
      setError('업로드할 파일을 선택해주세요.');
      return;
    }
    if (!title.trim()) {
      setError('파일 설명을 입력해주세요.');
      return;
    }

    // 백엔드와 규격을 일치시켜 프론트 단에서 먼저 2MB 용량 초과 파일을 필터링합니다.
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError('파일 용량은 2MB를 초과할 수 없습니다.');
      return;
    }

    // 파일 전송을 위해 바이너리 포맷 객체인 FormData 생성
    const formData = new FormData();
    formData.append('file', selectedFile);   // 백엔드 파라미터 변수명 'file' 키로 요청 바디 설정

    try {
      const response = await api.post('/upload', formData, {
        params: { title: title },
        headers: { 'Content-Type': 'multipart/form-data' },   // ★ multipart 요청
      });

      // 정상적인 응답 코드 받으면 상태 초기화, 화면 새로고침 수행
      if (response.status === 200 || response.status === 201) {
        setSuccess('✅파일이 성공적으로 업로드 되었습니다');
        setTitle('');
        setSelectedFile(null);
        document.getElementById('fileInput').value = '';  // file input 초기화. 

        fetchFiles();  // 목록 재동기화 갱신
      }

    } catch (err) {
      setError(err.response?.data?.detail || '💥업로드 중 서버 오류가 발생했습니다.');
    }

  }

  // 3. 파일 다운로드 처리
  const handleDownload = (id) => {
    window.location.href = `${api.defaults.baseURL}/download/${id}`;
  }

  // 4. 이미지 보기 처리 (모달 팝업 실행)
  const handleViewImage = (id, fileTitle) => {
    setCurrentImgUrl(`${api.defaults.baseURL}/view/${id}`);
    setModalTitle(fileTitle);
    setShowModal(true);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center fw-bold text-primary">파일 업로드 및 관리 시스템</h2>

      {/* 알림 메시지 영역 (조건부 토글 렌더링) */}
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      {/* [컴포넌트 1] 업로드 폼 카드 */}
      <FileForm
        title={title}
        setTitle={setTitle}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
      />

      {/* [컴포넌트 2 & 3] 업로드된 파일 목록 테이블 (내부적으로 Row 컴포넌트 호출) */}
      <h4 className="mb-3 fw-semibold">업로드된 파일 목록</h4>
      <FileTable
        files={files}
        handleDownload={handleDownload}
        handleViewImage={handleViewImage}
      />

      {/* [컴포넌트 4] 이미지 미리보기 팝업 모달 */}
      <ImageModal
        showModal={showModal}
        setShowModal={setShowModal}
        currentImgUrl={currentImgUrl}
        modalTitle={modalTitle}
      />
    </Container>
  );
};

export default App191;