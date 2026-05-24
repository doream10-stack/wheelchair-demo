import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/recommend');
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--white)',
        padding: '20px',
      }}
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{
          width: '50px',
          height: '50px',
          border: '4px solid var(--border)',
          borderTop: '4px solid var(--point-blue)',
          borderRadius: '50%',
          marginBottom: '24px'
        }}
      />
      
      <p style={{
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--text-main)',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        AI가 현재 위치와<br />
        배터리 상태를 분석 중입니다
      </p>
    </motion.div>
  );
};

export default LoadingScreen;
