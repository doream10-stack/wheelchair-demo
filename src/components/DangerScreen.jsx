import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Battery, BatteryWarning } from 'lucide-react';
import { motion } from 'framer-motion';

const DangerScreen = () => {
  const navigate = useNavigate();

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
        backgroundColor: 'var(--white)',
        padding: '24px 20px',
        paddingTop: 'var(--safe-area-top)',
        paddingBottom: 'calc(var(--safe-area-bottom) + 90px)',
        overflowY: 'auto',
      }}
      className="no-scrollbar"
    >
      {/* Header Warning */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <AlertTriangle size={64} color="var(--point-red)" fill="var(--point-red)" stroke="var(--white)" strokeWidth={1} style={{ marginBottom: '16px' }} />
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'var(--point-red)', marginBottom: '12px' }}>
          방전 위험 감지
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-main)', textAlign: 'center', lineHeight: '1.5', fontWeight: '500' }}>
          배터리 잔량이 부족하여 방전될 위험이 있습니다.<br />
          빠른 시일 내에 충전해주세요.
        </p>
      </div>

      {/* Wheelchair Image */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', margin: '30px 0' }}>
        <img 
          src="/wheelchair.png" 
          alt="Wheelchair" 
          style={{ width: '220px', height: '220px', objectFit: 'contain' }} 
        />
        <div style={{
          position: 'absolute',
          right: '40px',
          bottom: '20px',
          backgroundColor: 'var(--white)',
          padding: '12px',
          borderRadius: '20px',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
           <Battery size={36} strokeWidth={1.5} />
           <div style={{ position: 'absolute', left: '16px', width: '12px', height: '14px', backgroundColor: 'var(--point-red)', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Warning Card */}
      <div style={{
        backgroundColor: 'var(--bg-red-light)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <AlertTriangle size={24} color="var(--point-red)" fill="var(--point-red)" stroke="var(--white)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ color: 'var(--point-red)', fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>주행 가능 거리가 1km 밖에 남지 않았어요</div>
          <div style={{ color: 'var(--text-sub)', fontSize: '14px' }}>가까운 충전소를 확인하고 충전하세요.</div>
        </div>
      </div>

      {/* Battery Status */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '12px' }}>배터리 상태</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ color: 'var(--point-red)', fontSize: '32px', fontWeight: '700', fontFamily: 'system-ui' }}>8%</div>
          <div style={{ flex: 1, height: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: '8%', height: '100%', backgroundColor: 'var(--point-red)', borderRadius: '5px' }} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/loading')}
          style={{
            backgroundColor: 'var(--point-blue)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: '16px',
            padding: '18px',
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 102, 255, 0.3)',
          }}
        >
          <EvStation size={24} />
          가까운 충전소 찾기
        </button>
        <button 
          style={{
            backgroundColor: 'var(--white)',
            color: 'var(--text-main)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '18px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          확인
        </button>
      </div>
    </motion.div>
  );
};

// Simple EvStation Icon component for this specific use since lucide-react doesn't have an exact match for the Korean EV station icon
const EvStation = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22V6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v16" />
    <path d="M4 12h8" />
    <path d="M12 8v4" />
    <path d="M16 6v4" />
    <path d="M16 10h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2v4" />
    <path d="M9 16v2" />
    <path d="M7 16v2" />
  </svg>
);


export default DangerScreen;
