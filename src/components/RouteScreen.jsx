import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ThermometerSnowflake, Mountain, AlertTriangle, Cloud, Map as MapIcon, Navigation as NavigationIcon, ChevronRight, Home, BatteryCharging, Play, Square, ChevronUp, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const routeConfigs = {
  '1': {
    name: '치인고속화도로 충전소',
    distance: '0.4km',
    time: '5분',
    path: 'M 170 470 L 180 560 L 245 560 L 285 460 L 270 350',
    keyframes: {
      left: ['170px', '180px', '245px', '285px', '270px'],
      top: ['470px', '560px', '560px', '460px', '350px']
    },
    destPos: { left: '270px', top: '350px' },
    detourPath: 'M 170 470 L 130 450 L 100 400 L 110 330',
    detourWarningPath: 'M 100 400 L 110 330',
    warningPos: { left: '105px', top: '360px' },
    infoBubblePos: { top: '290px', left: '190px' }
  },
  '2': {
    name: '행복복지센터 충전소',
    distance: '0.6km',
    time: '8분',
    path: 'M 170 470 L 130 360 L 150 240 L 225 215 L 240 200',
    keyframes: {
      left: ['170px', '130px', '150px', '225px', '240px'],
      top: ['470px', '360px', '240px', '215px', '200px']
    },
    destPos: { left: '240px', top: '200px' },
    detourPath: 'M 170 470 L 130 450 L 100 400 L 110 330 L 150 280',
    detourWarningPath: 'M 110 330 L 150 280',
    warningPos: { left: '130px', top: '305px' },
    infoBubblePos: { top: '160px', left: '180px' }
  },
  '3': {
    name: '중앙공원 충전소',
    distance: '1.1km',
    time: '13분',
    path: 'M 170 470 L 130 360 L 150 240 L 225 215 L 230 140',
    keyframes: {
      left: ['170px', '130px', '150px', '225px', '230px'],
      top: ['470px', '360px', '240px', '215px', '140px']
    },
    destPos: { left: '230px', top: '140px' },
    detourPath: 'M 170 470 L 130 450 L 100 400 L 110 330 L 150 280 L 190 260',
    detourWarningPath: 'M 110 330 L 150 280',
    warningPos: { left: '130px', top: '305px' },
    infoBubblePos: { top: '90px', left: '180px' }
  }
};

const RouteScreen = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [showSimModal, setShowSimModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const stationId = location.state?.stationId ? String(location.state.stationId) : '1';
  const currentRoute = routeConfigs[stationId] || routeConfigs['1'];

  // Auto-collapse bottom sheet when simulation starts
  useEffect(() => {
    if (isSimulating) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isSimulating]);

  useEffect(() => {
    let interval;
    let timeout1, timeout2, timeout3;

    if (isSimulating) {
      setToastMessage('자율주행 모드로 목적지로 출발합니다.');
      
      const startTime = Date.now();
      const duration = 10000; // 10 seconds

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setSimProgress(progress);
        if (progress >= 1) {
          setIsSimulating(false);
          clearInterval(interval);
        }
      }, 50);

      timeout1 = setTimeout(() => {
        setToastMessage('급경사 구간입니다. 안전 속도로 주행합니다.');
      }, 3000);

      timeout2 = setTimeout(() => {
        setToastMessage('배터리 절약 운전 중입니다.');
      }, 6000);

      timeout3 = setTimeout(() => {
        setToastMessage('목적지에 도착했습니다!');
      }, 10000);

    } else {
      setSimProgress(0); // reset if stopped manually
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [isSimulating]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleLocationClick = () => {
    setToastMessage('현재 위치를 확인했습니다.');
  };

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
        position: 'relative',
        backgroundColor: '#f2f4f7',
        overflow: 'hidden'
      }}
    >
      {/* Draggable Map Layer */}
      <motion.div 
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        dragElastic={0.2}
        style={{
          position: 'absolute',
          top: -50,
          left: -50,
          right: -50,
          bottom: -50,
          backgroundImage: 'url(/map_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1,
          cursor: 'grab'
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <div style={{ position: 'absolute', top: '50px', left: '50px', right: '50px', bottom: '50px' }}>
          {/* SVG Map Routes Overlay */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
            {/* Detour / Steep area route (Gray/Red Dashed) */}
            <path d={currentRoute.detourPath} stroke="#8892a0" strokeWidth="4" strokeDasharray="8 6" fill="none" />
            <path d={currentRoute.detourWarningPath} stroke="#ff3b30" strokeWidth="4" strokeDasharray="8 6" fill="none" />
            
            {/* AI Recommended Route (Solid Blue) */}
            <motion.path 
              key={`${stationId}-recommended-path`}
              d={currentRoute.path} 
              stroke="#0066ff" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path 
              key={`${stationId}-recommended-path-glow`}
              d={currentRoute.path} 
              stroke="#4d94ff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>

          {/* Draggable Wheelchair Marker */}
          <motion.div 
            key={`${stationId}-marker`}
            initial={{ left: '170px', top: '470px' }}
            animate={isSimulating ? currentRoute.keyframes : { left: '170px', top: '470px' }}
            transition={isSimulating ? { duration: 10, ease: 'linear' } : { duration: 0 }}
            style={{ position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 4 }}
          >
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(0, 102, 255, 0.3)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px rgba(0,102,255,0.5)' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#0066ff', borderRadius: '50%', border: '3px solid #fff' }} />
            </div>
          </motion.div>
          
          {/* Destination Marker */}
          <div style={{ position: 'absolute', top: currentRoute.destPos.top, left: currentRoute.destPos.left, transform: 'translate(-50%, -100%)', zIndex: 2 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#ff3b30" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="#fff"></circle>
            </svg>
          </div>
          <div style={{ position: 'absolute', top: `calc(${currentRoute.destPos.top} + 2px)`, left: currentRoute.destPos.left, transform: 'translate(-50%, -50%)', width: '8px', height: '3px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '50%', zIndex: 1 }} />

          {/* Danger Warning Triangle Icon */}
          <div style={{ position: 'absolute', top: currentRoute.warningPos.top, left: currentRoute.warningPos.left, transform: 'translate(-50%, -50%)', zIndex: 2 }}>
            <AlertTriangle size={18} color="#fff" fill="#ff3b30" />
          </div>
        </div>
      </motion.div>

      {/* --- Floating Cards --- */}

      {/* AI Recommendation Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 24 }}
        style={{ position: 'absolute', top: 'calc(var(--safe-area-top) + 20px)', left: '16px', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '16px', boxShadow: 'var(--shadow)', zIndex: 3, width: '210px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#0066ff', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '8px' }}>AI</div>
          <div style={{ fontSize: '15px', fontWeight: '700', color: '#0066ff' }}>AI 경로 추천</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}><Leaf size={14} color="#00c853" /> 배터리 절약</div>
            <div style={{ color: '#00c853', fontWeight: '600' }}>+12%</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}><ThermometerSnowflake size={14} color="#a0a0a0" /> 저온 영향 고려</div>
            <div style={{ color: '#0066ff', fontWeight: '600' }}>-18%</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}><Mountain size={14} color="#888" /> 오르막 회피</div>
            <div style={{ color: '#00c853', fontWeight: '600' }}>완만</div>
          </div>
        </div>
      </motion.div>

      {/* AI Route Info Bubble */}
      <motion.div 
        key={`${stationId}-bubble`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        style={{ position: 'absolute', top: currentRoute.infoBubblePos.top, left: currentRoute.infoBubblePos.left, backgroundColor: '#0066ff', color: '#fff', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,102,255,0.4)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>AI 추천 경로</div>
        <div style={{ fontSize: '12px', opacity: 0.9 }}>
          {isSimulating ? `${Math.max(0, Math.ceil(parseInt(currentRoute.time) * (1 - simProgress)))}분 · ${Math.max(0, (parseFloat(currentRoute.distance) * (1 - simProgress))).toFixed(1)}km` : `${currentRoute.time} · ${currentRoute.distance}`}
        </div>
      </motion.div>

      {/* Warning Bubble */}
      <div style={{ position: 'absolute', top: '340px', left: '16px', backgroundColor: '#fff', borderRadius: '12px', padding: '10px 12px', boxShadow: 'var(--shadow)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AlertTriangle size={20} color="#fff" fill="#ff3b30" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>급경사 구간</div>
          <div style={{ fontSize: '11px', color: 'var(--text-sub)' }}>배터리 소모 ↑</div>
        </div>
      </div>

      {/* Weather Impact Bubble */}
      <div style={{ position: 'absolute', top: '350px', right: '16px', backgroundColor: '#fff', borderRadius: '12px', padding: '12px', boxShadow: 'var(--shadow)', zIndex: 3, display: 'flex', alignItems: 'flex-start', gap: '10px', width: '130px' }}>
        <ThermometerSnowflake size={20} color="#0066ff" style={{ flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '2px' }}>저온 -2°C</div>
          <div style={{ fontSize: '11px', color: 'var(--text-sub)', lineHeight: '1.3' }}>예상 주행거리<br/>18% 감소</div>
        </div>
      </div>

      {/* Weather Small Icon */}
      <div style={{ position: 'absolute', bottom: '280px', right: '16px', backgroundColor: '#fff', borderRadius: '20px', padding: '8px 12px', boxShadow: 'var(--shadow)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Cloud size={16} color="#666" />
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>16°</span>
      </div>

      {/* Floating GPS Action Button */}
      <div 
        onClick={handleLocationClick}
        style={{ position: 'absolute', bottom: '280px', left: '16px', width: '40px', height: '40px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow)', zIndex: 3, cursor: 'pointer' }}
      >
        <NavigationIcon size={20} color="var(--point-blue)" />
      </div>

      {/* --- Collapsible Bottom Sheet --- */}
      <motion.div 
        animate={{ y: isCollapsed ? 140 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{ 
          position: 'absolute', 
          bottom: '0', 
          left: 0, 
          right: 0, 
          backgroundColor: '#fff', 
          borderTopLeftRadius: '24px', 
          borderTopRightRadius: '24px',
          padding: '16px 20px 24px',
          paddingBottom: 'calc(var(--safe-area-bottom) + 85px)', // space for tab bar
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          zIndex: 10,
          height: '270px',
        }}
      >
        {/* Grabber */}
        <div 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ width: '40px', height: '5px', backgroundColor: '#d0d0d0', borderRadius: '3px', margin: '0 auto 12px', cursor: 'pointer' }} 
        />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>
              {currentRoute.name}
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-sub)', marginTop: '2px' }}>
              안전 유도 주행 경로가 추천되었습니다.
            </div>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ 
              border: 'none', 
              background: 'none', 
              color: 'var(--point-blue)', 
              fontWeight: '700', 
              fontSize: '13px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            {isCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {isCollapsed ? '자세히' : '접기'}
          </button>
        </div>

        {/* Dynamic Route Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--point-blue)' }}>
                {isSimulating ? `${Math.max(0, Math.ceil(parseInt(currentRoute.time) * (1 - simProgress)))}분` : currentRoute.time}
              </span>
              <span style={{ fontSize: '14px', color: 'var(--text-sub)' }}>
                {isSimulating ? `${Math.max(0, (parseFloat(currentRoute.distance) * (1 - simProgress))).toFixed(1)}km` : currentRoute.distance} 남음
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#e6f0ff', color: 'var(--point-blue)', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
              <Leaf size={14} color="#0066ff" /> 배터리 절약 경로
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => {
                if (isSimulating) {
                  setIsSimulating(false);
                } else {
                  setShowSimModal(true);
                }
              }}
              style={{
                flex: 1,
                backgroundColor: isSimulating ? 'var(--point-red)' : 'var(--point-blue)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isSimulating ? 'none' : '0 4px 12px rgba(0, 102, 255, 0.15)'
              }}
            >
              {isSimulating ? (
                <>
                  <Square size={16} fill="#fff" />
                  모의 주행 중단
                </>
              ) : (
                <>
                  <Play size={16} fill="#fff" />
                  모의 주행 시작
                </>
              )}
            </button>
            
            {!isSimulating && (
              <button 
                onClick={() => navigate('/recommend')}
                style={{
                  padding: '14px 20px',
                  backgroundColor: '#f2f2f7',
                  color: 'var(--text-main)',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                닫기
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Simulation Modal */}
      <AnimatePresence>
        {showSimModal && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '80%', maxWidth: '320px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            >
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>모의 주행 시뮬레이션</h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: 'var(--text-sub)', lineHeight: 1.5, wordBreak: 'keep-all' }}>
                실제 출발 전, 경로 상의 위험 구간과 배터리 예상 소모량을 미리 확인하시겠습니까?
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setShowSimModal(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#f2f2f7', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer' }}
                >
                  취소
                </button>
                <button 
                  onClick={() => {
                    setShowSimModal(false);
                    setIsSimulating(true);
                  }}
                  style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#0066ff', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                >
                  시작하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'absolute',
              bottom: '100px',
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

export default RouteScreen;
