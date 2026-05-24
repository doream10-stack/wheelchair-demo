import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Battery, BatteryWarning, CheckCircle2, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DangerScreen = () => {
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [isEmergencyShared, setIsEmergencyShared] = useState(false);
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
          <div style={{ color: 'var(--point-red)', fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>
            주행 가능 거리가 {isEcoMode ? '1.3km (에코)' : '0.9km'} 밖에 남지 않았어요
          </div>
          <div style={{ color: 'var(--text-sub)', fontSize: '14px' }}>
            {isEcoMode ? '배터리 절약 모드가 작동 중입니다. 최적 경로로 충전소로 이동하세요.' : '가까운 충전소를 확인하고 충전하세요.'}
          </div>
        </div>
      </div>

      {/* Battery Status */}
      <div style={{
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>배터리 상태</div>
          {isEcoMode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#e2f9e9', color: '#10b981', padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}>
              <Sparkles size={12} /> 에코 모드 활성화됨
            </div>
          )}
        </div>
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
          onClick={() => setShowSafetyModal(true)}
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

      {/* Safety Guard Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                backgroundColor: 'var(--white)',
                borderRadius: '24px',
                padding: '24px',
                width: '100%',
                maxWidth: '340px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ backgroundColor: '#fff0f0', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--point-red)' }}>
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>안전 조치 가이드</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-sub)' }}>방전 대비 최적 주행 설정을 적용하세요.</p>
                </div>
              </div>

              {/* Toggles Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Eco Mode Toggle */}
                <div 
                  onClick={() => setIsEcoMode(!isEcoMode)}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isEcoMode ? '#f0fdf4' : 'transparent',
                    borderColor: isEcoMode ? '#86efac' : 'var(--border)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      배터리 절약 모드 <Sparkles size={14} color={isEcoMode ? '#10b981' : 'var(--text-sub)'} />
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-sub)', marginTop: '4px', lineHeight: '1.4' }}>
                      모터 토크 제한으로 이동 거리를 1.3km까지 보장합니다.
                    </div>
                  </div>
                  
                  {/* Switch UI */}
                  <div style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: isEcoMode ? '#10b981' : '#e5e7eb',
                    borderRadius: '12px',
                    padding: '2px',
                    display: 'flex',
                    justifyContent: isEcoMode ? 'flex-end' : 'flex-start',
                    alignItems: 'center',
                    transition: 'background-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} />
                  </div>
                </div>

                {/* Emergency Contact Toggle */}
                <div 
                  onClick={() => setIsEmergencyShared(!isEmergencyShared)}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: isEmergencyShared ? '#eff6ff' : 'transparent',
                    borderColor: isEmergencyShared ? '#bfdbfe' : 'var(--border)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      보호자 긴급 위치 공유 <PhoneCall size={14} color={isEmergencyShared ? 'var(--point-blue)' : 'var(--text-sub)'} />
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-sub)', marginTop: '4px', lineHeight: '1.4' }}>
                      방전 직전에 미리 등록된 보호자에게 현재 GPS 주소를 전송합니다.
                    </div>
                  </div>
                  
                  {/* Switch UI */}
                  <div style={{
                    width: '44px',
                    height: '24px',
                    backgroundColor: isEmergencyShared ? 'var(--point-blue)' : '#e5e7eb',
                    borderRadius: '12px',
                    padding: '2px',
                    display: 'flex',
                    justifyContent: isEmergencyShared ? 'flex-end' : 'flex-start',
                    alignItems: 'center',
                    transition: 'background-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }} />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => setShowSafetyModal(false)}
                style={{
                  backgroundColor: 'var(--text-main)',
                  color: 'var(--white)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <CheckCircle2 size={18} />
                설정 및 안전 모드 적용
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
