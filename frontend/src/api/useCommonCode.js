import { useEffect, useState } from 'react';
import api from './axios';

/**
 * 공통 코드를 조회하는 커스텀 훅
 * @param {string} codeId - 조회할 공통 코드 ID (예: 'DLVR_REQ_TYPE')
 * @returns {Array} - 코드 목록 배열
 */
const useCommonCode = (codeId) => {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    if (!codeId) return;

    const fetchCodes = async () => {
      try {
        const res = await api.get(`/api/common/codes/${codeId}`);
        if (res.data.status === 'SUCCESS') {
          setCodes(res.data.codes);
        }
      } catch (err) {
        console.error(`공통 코드() 조회 실패:`, err);
      }
    };

    fetchCodes();
  }, [codeId]);

  return codes;
};

export default useCommonCode;
