import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Navigation, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWheelchair } from '../context/WheelchairContext';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const { reservedStation } = useWheelchair();

  const stationName = reservedStation?.name || '치인고속화도로 충전소';
  const stationDistance = reservedStation?.distance || '0.4km';
  const stationTime = reservedStation?.walkTime ? `도보 ${reservedStation.walkTime}` : '약 5분';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      style={{
        flex: 1,
        width: '100%',
        minWidth: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-app)',
        padding: '20px',
        paddingTop: 'calc(var(--safe-area-top) + 20px)',
        paddingBottom: 'calc(var(--safe-area-bottom) + 90px)',
        overflowY: 'auto',
      }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          style={{ marginBottom: '24px' }}
        >
          <CheckCircle2 size={80} color="#00c853" />
        </motion.div>

        <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>
          충전소 예약 완료
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-sub)', marginBottom: '40px' }}>
          목적지까지 안전하게 안내해 드릴게요.
        </p>

        <div style={{ width: '100%', backgroundColor: 'var(--white)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow)', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: 'var(--point-blue)', fontWeight: '700', marginBottom: '8px' }}>예약 번호: #A8201</div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 16px 0' }}>{stationName}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f6ff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MapPin size={20} color="var(--point-blue)" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>거리</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{stationDistance}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#f0f6ff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Clock size={20} color="var(--point-blue)" />
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-sub)' }}>예상 소요 시간</div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text-main)' }}>{stationTime}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div style={{ paddingBottom: 'calc(var(--safe-area-bottom) + 80px)' }}>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/route', { state: { stationId: reservedStation?.id || 1 } })}
          style={{
            width: '100%',
            backgroundColor: 'var(--point-blue)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: '16px',
            padding: '20px',
            fontSize: '16px',
            fontWeight: '700',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 10px 20px rgba(0,102,255,0.3)'
          }}
        >
          <Navigation size={20} />
          충전소로 경로 안내 시작
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DashboardScreen;
