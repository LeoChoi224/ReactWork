// 업로드된 파일 목록 테이블

import React from 'react';
import { Table } from 'react-bootstrap';
import FileTableRow from './FileTableRow';

function FileTable({ /* 🔷TODO */ }) {
  return (
    <div className="table-responsive shadow-sm rounded">
      <Table striped bordered hover align="middle" className="m-0">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>파일 설명</th>
            <th>원본 파일명</th>
            <th>저장된 파일명</th>
            <th>업로드 시간</th>
            <th style={{ width: '200px' }}>액션</th>
          </tr>
        </thead>
        <tbody>
          { /* 🔷TODO */ }
              <FileTableRow 
          
              />
          
        </tbody>
      </Table>
    </div>
  );
}

export default FileTable;