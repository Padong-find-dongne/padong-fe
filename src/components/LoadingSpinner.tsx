/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

// 회전 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 점점점 애니메이션
const dots = keyframes`
  0% { content: ""; }
  33% { content: "."; }
  66% { content: ".."; }
  100% { content: "..."; }
`;

// 전체 화면 컨테이너
const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
`;

// 스피너 외곽 (회전하는 원)
const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 6px solid #e0e0e0;
  border-top: 6px solid #2e58e4;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: relative;
  margin-bottom: 20px;
`;

//스피넷 안에 이미지
const CenterImage = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 로딩중
const LoadingText = styled.div`
  font-size: 1.2rem;
  color: #555;

  &::after {
    display: inline-block;
    margin-left: 4px;
    animation: ${dots} 1.5s steps(3, end) infinite;
    content: "";
  }
`;

interface LoadingSpinnerProps {
  loadingMent: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loadingMent }) => {
  return (
    <SpinnerWrapper>
      <Spinner>
        <CenterImage src="/images/padong-icon.png" alt="Logo" />
      </Spinner>
      <LoadingText>{loadingMent}</LoadingText>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
