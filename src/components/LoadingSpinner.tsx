import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  loadingMent: string;
  imageSrc: string;
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loadingMent,
  imageSrc,
  fullScreen = false,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      // 좌우 흔들리는 애니메이션
      gsap.to(imgRef.current, {
        rotateY: 70,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <div
      style={{
        position: fullScreen ? "fixed" : "relative",
        top: fullScreen ? 0 : undefined,
        left: fullScreen ? 0 : undefined,
        width: fullScreen ? "100vw" : "auto",
        height: fullScreen ? "100vh" : "auto",
        backgroundColor: fullScreen ? "rgba(255,255,255,0.9)" : "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: fullScreen ? 9999 : "auto",
      }}
    >
      <img
        ref={imgRef}
        src={imageSrc}
        alt="로딩 이미지"
        style={{
          width: fullScreen ? "500px" : "200px",
          height: fullScreen ? "300px" : "100px",
        }}
      />
      <p
        style={{
          marginTop: "2rem",
          fontSize: "1rem",
          color: "#818181",
        }}
      >
        {loadingMent}
      </p>
    </div>
  );
};

export default LoadingScreen;
