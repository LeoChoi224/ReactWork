// 테이블의 각 파일 목록 행

import { Button } from 'react-bootstrap';

function FileTableRow({ file, handleDownload, handleViewImage }) {
  // 이미지 확장자 판별 로직을 Row 컴포넌트 내부로 격리
  const isImageFile = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();

    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext);
    // Python : ext in ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp']
  };

  return (
    <tr>
      <td>{file.id}</td>
      <td>{file.title}</td>
      <td>{file.original_name}</td>
      <td className="text-truncate" style={{ maxWidth: '150px' }} title={file.uploaded_name}>
        {file.uploaded_name}
      </td>
      <td>{new Date(file.uploaded_at).toLocaleString()}</td>
      <td>
        <Button
          variant="outline-success"
          size="sm"
          className="me-2"
          onClick={() => handleDownload(file.id)}
        >
          다운로드
        </Button>

        {isImageFile(file.original_name) && (
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => handleViewImage(file.id, file.title)}
          >
            이미지 보기
          </Button>
        )}
      </td>
    </tr>
  );
}

export default FileTableRow;