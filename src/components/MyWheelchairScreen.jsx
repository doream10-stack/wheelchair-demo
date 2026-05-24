import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle2, AlertTriangle, MapPin, Wrench, Siren, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 300, damping: 24 } 
  }
};

const MyWheelchairScreen = () => {
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAction = (message) => {
    setToastMessage(message);
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-app)', // off-white
        padding: '24px 20px',
        paddingTop: 'calc(var(--safe-area-top) + 20px)',
        overflowY: 'auto'
      }}
      className="no-scrollbar"
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>내 휠체어</h1>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--point-blue)', borderRadius: '50%' }} />
          </div>
          <div style={{ fontSize: '15px', color: 'var(--text-sub)', fontWeight: '500' }}>
            PosFrame LX2
          </div>
          <div style={{ fontSize: '12px', color: '#a0a0a0', marginTop: '4px' }}>
            최근 업데이트 2024. 05. 20 14:30
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
          <Bell size={24} color="var(--text-main)" />
          
          <div style={{ backgroundColor: 'var(--white)', padding: '12px 16px', borderRadius: '16px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={20} color="#00c853" />
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>정상</div>
            <div style={{ fontSize: '11px', color: 'var(--text-sub)' }}>연결됨</div>
          </div>
        </div>
      </motion.div>

      {/* Wheelchair Image Area */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '240px', marginBottom: '20px', position: 'relative' }}>
        <img 
          src="/blue_wheelchair.png" 
          alt="My Wheelchair" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'darken' }} 
        />
      </motion.div>

      {/* Status Cards */}
      <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {/* Battery Card */}
        <div style={{ flex: 1, backgroundColor: 'var(--white)', borderRadius: '20px', padding: '20px', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '8px' }}>배터리 상태</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
            <span style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1 }}>82</span>
            <span style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-sub)' }}>%</span>
          </div>
          
          <div style={{ height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', display: 'flex', marginBottom: '8px' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '82%' }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              style={{ backgroundColor: 'var(--point-blue)', height: '100%', borderRadius: '4px' }} 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
             <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--point-blue)' }}>양호</span>
          </div>
        </div>

        {/* Range Card */}
        <div style={{ flex: 1, backgroundColor: 'var(--white)', borderRadius: '20px', padding: '20px', boxShadow: 'var(--shadow)' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-sub)', marginBottom: '8px' }}>주행가능거리</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
            <span style={{ fontSize: '36px', fontWeight: '800', color: 'var(--point-blue)', lineHeight: 1 }}>18.6</span>
            <span style={{ fontSize: '20px', fontWeight: '600', color: 'var(--point-blue)' }}>km</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>
            표준 모드 기준
          </div>
        </div>
      </motion.div>

      {/* Warning Banner */}
      <motion.div variants={itemVariants} style={{ backgroundColor: '#fff8e1', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
        <AlertTriangle size={24} color="#ffb300" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#424242', marginBottom: '4px' }}>
            배터리 점검 권장 시기가 다가오고 있어요
          </div>
          <div style={{ fontSize: '13px', color: '#757575' }}>
            안정적인 주행을 위해 점검을 받아보세요.
          </div>
        </div>
        <ChevronRight size={20} color="#bdbdbd" style={{ alignSelf: 'center' }} />
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', paddingBottom: '30px' }}>
        <ActionButton 
          icon={<MapPin size={28} color="#00c853" />} 
          title="충전소 찾기" 
          subtitle="가까운 안내" 
          onClick={() => navigate('/recommend')} 
        />
        <ActionButton 
          icon={<Wrench size={28} color="#0066ff" />} 
          title="점검 예약" 
          subtitle="정기 신청" 
          onClick={() => handleAction('점검 예약이 가능합니다')} 
        />
        <ActionButton 
          icon={<Siren size={28} color="#ff3b30" />} 
          title="긴급 수리" 
          subtitle="빠른 도움" 
          onClick={() => handleAction('긴급 수리 요청이 접수되었습니다')} 
        />
      </motion.div>

      {/* Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '20px',
              right: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'var(--white)',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center',
              zIndex: 100,
              fontWeight: '600',
              boxShadow: 'var(--shadow)'
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ActionButton = ({ icon, title, subtitle, onClick }) => (
  <motion.div 
    onClick={onClick}
    whileTap={{ scale: 0.92 }}
    style={{ 
      flex: 1, 
      backgroundColor: 'var(--white)', 
      borderRadius: '16px', 
      padding: '20px 12px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      boxShadow: 'var(--shadow)',
      cursor: 'pointer'
    }}
  >
    <div style={{ marginBottom: '16px' }}>{icon}</div>
    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px', textAlign: 'center', wordBreak: 'keep-all' }}>{title}</div>
    <div style={{ fontSize: '11px', color: 'var(--text-sub)', textAlign: 'center', wordBreak: 'keep-all' }}>{subtitle}</div>
  </motion.div>
);

export default MyWheelchairScreen;
