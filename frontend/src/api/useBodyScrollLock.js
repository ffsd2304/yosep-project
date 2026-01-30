// src/hooks/useBodyScrollLock.js
import { useEffect } from 'react';

// 전역 변수로 잠금 요청 횟수를 관리합니다.
let lockCount = 0;

export default function useBodyScrollLock() {
  useEffect(() => {
    // 1. 마운트 시: 잠금 요청 증가
    lockCount++;
    if (lockCount === 1) {
      // 첫 번째 요청일 때만 실제로 body를 잠급니다.
      document.body.style.overflow = 'hidden';
    }

    // 2. 언마운트 시: 잠금 요청 감소
    return () => {
      lockCount--;
      if (lockCount === 0) {
        // 남은 요청이 없을 때만(모든 팝업이 닫혔을 때) 잠금을 풉니다.
        document.body.style.overflow = 'unset';
      }
    };
  }, []);
}