// 테이블의 각 파일 목록 행

import React from 'react';
import { Button } from 'react-bootstrap';

function FileTableRow({ /* 🔷TODO */ }) {
  // 이미지 확장자 판별 로직을 Row 컴포넌트 내부로 격리
  // 🔷TODO 

  return (
    <tr>
      <td>{ "🔷TODO" }</td>
      <td>{ "🔷TODO" }</td>
      <td>{ "🔷TODO" }</td>
      <td className="text-truncate" style={{ maxWidth: '150px' }} title={ "🔷TODO" }>
        { "🔷TODO" }
      </td>
      <td>{ "🔷TODO" }</td>
      <td>
        <Button 
          variant="outline-success" 
          size="sm" 
          className="me-2"
          onClick={() => { /* 🔷TODO */ }}
        >
          다운로드
        </Button>
        { /* 🔷TODO */ }
          <Button 
            variant="outline-info" 
            size="sm"
            onClick={() => { /* 🔷TODO */ }}
          >
            이미지 보기
          </Button>
        {/*  🔷TODO  */}
      </td>
    </tr>
  );
}

export default FileTableRow;