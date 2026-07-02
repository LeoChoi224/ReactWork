import { Spinner } from 'react-bootstrap';

const LoadingIndicator = ({ label = 'Agent가 분석을 준비하고 있습니다...' }) => {
  return (
    <div className="loading-indicator">
      {/* animation="border": 원형으로 빙글빙글 도는 기본 부트스트랩 스피너 스타일 */}
      <Spinner animation="border" variant="primary" role="status" />
      <span>{label}</span>
    </div>
  );
};

export default LoadingIndicator;