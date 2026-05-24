import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, ThermometerSnowflake, Mountain, AlertTriangle, Cloud, Map as MapIcon, Navigation as NavigationIcon, Search, ChevronRight, Home, BatteryCharging, Plus, Play, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RouteScreen = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [showSimModal, setShowSimModal] = useState(false);
  const [favorites, setFavorites] = useState([
    { id: 'home', iconName: 'home', label: '집', path: '/' },
    { id: 'station', iconName: 'battery', label: '내 충전소', path: '/recommend' },
    { id: 'wheelchair', iconName: 'navigation', label: '휠체어', path: '/wheelchair' },
  ]);
  const navigate = useNavigate();

  const handleAddFavorite = () => {
    const newId = Date.now();
    setFavorites([...favorites, { id: newId, iconName: 'map', label: `목적지 ${favorites.length + 1}`, path: '#' }]);
    setToastMessage('새로운 장소가 즐겨찾기에 추가되었습니다.');
  };

  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'home': return <Home size={24} color="#0066ff" />;
      case 'battery': return <BatteryCharging size={24} color="#0066ff" />;
      case 'navigation': return <NavigationIcon size={24} color="#0066ff" />;
      case 'map': default: return <MapIcon size={24} color="#0066ff" />;
    }
  };

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
            <path d="M 170 470 L 130 450 L 100 400 L 110 330 L 150 280 L 190 260" stroke="#8892a0" strokeWidth="4" strokeDasharray="8 6" fill="none" />
            {/* Red warning segment on detour */}
            <path d="M 110 330 L 150 280" stroke="#ff3b30" strokeWidth="4" strokeDasharray="8 6" fill="none" />
            
            {/* AI Recommended Route (Solid Blue) */}
            <motion.path 
              d="M 170 470 L 230 380 L 190 320 L 250 270 L 210 210 L 230 140" 
              stroke="#0066ff" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.path 
              d="M 170 470 L 230 380 L 190 320 L 250 270 L 210 210 L 230 140" 
              stroke="#4d94ff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>

          {/* Markers (Start & End) */}
          <motion.div 
            initial={{ left: '170px', top: '470px' }}
            animate={isSimulating ? {
              left: ['170px', '230px', '190px', '250px', '210px', '230px'],
              top: ['470px', '380px', '320px', '270px', '210px', '140px']
            } : { left: '170px', top: '470px' }}
            transition={isSimulating ? { duration: 10, ease: 'linear' } : { duration: 0 }}
            style={{ position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 4 }}
          >
            <div style={{ width: '32px', height: '32px', backgroundColor: 'rgba(0, 102, 255, 0.3)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px rgba(0,102,255,0.5)' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: '#0066ff', borderRadius: '50%', border: '3px solid #fff' }} />
            </div>
          </motion.div>
          
          <div style={{ position: 'absolute', top: '140px', left: '230px', transform: 'translate(-50%, -100%)', zIndex: 2 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#ff3b30" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="#fff"></circle>
            </svg>
          </div>
          <div style={{ position: 'absolute', top: '142px', left: '230px', transform: 'translate(-50%, -50%)', width: '8px', height: '3px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '50%', zIndex: 1 }} />

          {/* Danger Warning Triangle Icon */}
          <div style={{ position: 'absolute', top: '340px', left: '125px', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        style={{ position: 'absolute', top: '240px', left: '180px', backgroundColor: '#0066ff', color: '#fff', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 4px 12px rgba(0,102,255,0.4)', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>AI 추천 경로</div>
        <div style={{ fontSize: '12px', opacity: 0.9 }}>
          {isSimulating ? `${Math.max(0, Math.ceil(18 * (1 - simProgress)))}분 · ${Math.max(0, (3.6 * (1 - simProgress))).toFixed(1)}km` : '18분 · 3.6km'}
        </div>
      </motion.div>

      {/* Warning Bubble */}
      <div style={{ position: 'absolute', top: '320px', left: '16px', backgroundColor: '#fff', borderRadius: '12px', padding: '10px 12px', boxShadow: 'var(--shadow)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AlertTriangle size={20} color="#fff" fill="#ff3b30" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-main)' }}>급경사 구간</div>
          <div style={{ fontSize: '11px', color: 'var(--text-sub)' }}>배터리 소모 ↑</div>
        </div>
      </div>

      {/* Weather Impact Bubble */}
      <div style={{ position: 'absolute', top: '340px', right: '16px', backgroundColor: '#fff', borderRadius: '12px', padding: '12px', boxShadow: 'var(--shadow)', zIndex: 3, display: 'flex', alignItems: 'flex-start', gap: '10px', width: '130px' }}>
        <ThermometerSnowflake size={20} color="#0066ff" style={{ flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '2px' }}>저온 -2°C</div>
          <div style={{ fontSize: '11px', color: 'var(--text-sub)', lineHeight: '1.3' }}>예상 주행거리<br/>18% 감소</div>
        </div>
      </div>

      {/* Battery Saving Bubble near start */}
      <div style={{ position: 'absolute', top: '480px', left: '210px', backgroundColor: '#fff', borderRadius: '12px', padding: '8px 12px', boxShadow: 'var(--shadow)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Leaf size={16} color="#00c853" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-main)' }}>배터리 절약</div>
          <div style={{ fontSize: '12px', color: '#00c853', fontWeight: '700' }}>+12%</div>
        </div>
      </div>

      {/* Weather Small Icon */}
      <div style={{ position: 'absolute', bottom: '260px', right: '16px', backgroundColor: '#fff', borderRadius: '20px', padding: '8px 12px', boxShadow: 'var(--shadow)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Cloud size={16} color="#666" />
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>16°</span>
      </div>

      {/* Map Controls */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring' }}
        style={{ position: 'absolute', top: 'calc(var(--safe-area-top) + 20px)', right: '16px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow)', zIndex: 3, overflow: 'hidden' }}
      >
        <motion.div 
          onClick={() => {
            if (isSimulating) {
              setIsSimulating(false);
            } else {
              setShowSimModal(true);
            }
          }}
          whileTap={{ backgroundColor: '#f0f0f0' }} 
          style={{ padding: '12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'center', cursor: 'pointer', backgroundColor: isSimulating ? '#ffebee' : 'transparent' }}
        >
          {isSimulating ? <Square size={20} color="#ff3b30" /> : <Play size={20} color="#0066ff" />}
        </motion.div>
        <motion.div whileTap={{ backgroundColor: '#f0f0f0' }} style={{ padding: '12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
          <MapIcon size={20} color="#444" />
        </motion.div>
        <motion.div whileTap={{ backgroundColor: '#f0f0f0' }} style={{ padding: '12px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
          <NavigationIcon size={20} color="#444" />
        </motion.div>
      </motion.div>


      {/* --- Bottom Sheet --- */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          bottom: '0', 
          left: 0, 
          right: 0, 
          backgroundColor: '#fff', 
          borderTopLeftRadius: '24px', 
          borderTopRightRadius: '24px',
          padding: '16px 20px',
          paddingBottom: 'calc(var(--safe-area-bottom) + 90px)', // space for tab bar
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          zIndex: 10,
          maxHeight: '50vh',
          overflowY: 'auto'
        }}
        className="no-scrollbar"
      >
        {/* Grabber */}
        <div style={{ width: '40px', height: '5px', backgroundColor: '#d0d0d0', borderRadius: '3px', margin: '0 auto 20px' }} />

        {/* Search */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, backgroundColor: '#f2f2f7', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '10px 16px', gap: '8px' }}>
            <Search size={18} color="#888" />
            <input type="text" placeholder="Search Maps" style={{ border: 'none', background: 'transparent', flex: 1, fontSize: '15px', color: '#111', outline: 'none' }} readOnly />
          </div>
          <div style={{ width: '40px', height: '40px', backgroundColor: '#e5e5ea', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', fontWeight: '500', fontSize: '14px' }}>
            AA
          </div>
        </div>

        {/* Smart Suggestions */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-sub)', fontWeight: '600', marginBottom: '12px' }}>Smart Suggestions</div>
          
          <motion.div 
            onClick={handleLocationClick} 
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', cursor: 'pointer' }}
          >
            <div style={{ width: '48px', height: '48px', backgroundColor: '#0066ff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
              <NavigationIcon size={24} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>내 휠체어 위치</div>
              <div style={{ fontSize: '13px', color: 'var(--text-sub)' }}>290 m away, 치인고속화도로 인근</div>
            </div>
            <ChevronRight size={20} color="#ccc" />
          </motion.div>
        </div>

        {/* Favorites */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-sub)', fontWeight: '600' }}>Favorites</div>
            <div style={{ fontSize: '13px', color: '#0066ff', fontWeight: '600' }}>More</div>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '10px' }} className="no-scrollbar">
            {favorites.map(fav => (
              <FavoriteItem key={fav.id} icon={renderIcon(fav.iconName)} label={fav.label} onClick={() => navigate(fav.path)} />
            ))}
            <FavoriteItem icon={<Plus size={24} color="#0066ff" />} label="추가" isAdd onClick={handleAddFavorite} />
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
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '700', color: 'var(--text-main)' }}>예상 주행 시뮬레이션</h3>
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

const FavoriteItem = ({ icon, label, isAdd, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
  >
    <div style={{ width: '56px', height: '56px', backgroundColor: isAdd ? '#f2f2f7' : '#e6f0ff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {icon}
    </div>
    <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-main)' }}>{label}</div>
  </motion.div>
);

export default RouteScreen;
