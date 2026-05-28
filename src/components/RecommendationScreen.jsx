import React, { useState, useEffect } from 'react';
import { ChevronDown, Navigation, Star, Search, MapPin, Battery } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useWheelchair } from '../context/WheelchairContext';

const RecommendationScreen = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const dragControls = useDragControls();
  const navigate = useNavigate();
  const { setReservedStation } = useWheelchair();

  const toggleFavorite = (stationId, stationName) => {
    setFavorites(prev => {
      const isAlreadyFav = prev.includes(stationId);
      if (isAlreadyFav) {
        setToastMessage(`${stationName}이(가) 즐겨찾기에서 해제되었습니다.`);
        return prev.filter(id => id !== stationId);
      } else {
        setToastMessage(`${stationName}이(가) 즐겨찾기에 추가되었습니다.`);
        return [...prev, stationId];
      }
    });
  };

  const initialStations = [
    {
      id: 1,
      name: '치인고속화도로 충전소',
      walkTime: '5분',
      distance: '0.4km',
      status: '사용 가능',
      statusColor: '#00c853',
      usage: '총 4대 중 2대 사용 중',
      image: '/station_1.png',
      canPhoneCharge: true,
      canReserve: true
    },
    {
      id: 2,
      name: '행복복지센터 충전소',
      walkTime: '8분',
      distance: '0.6km',
      status: '사용 가능',
      statusColor: '#00c853',
      usage: '총 3대 중 2대 사용 중',
      image: '/station_2.png',
      canPhoneCharge: true,
      canReserve: true
    },
    {
      id: 3,
      name: '중앙공원 충전소',
      walkTime: '13분',
      distance: '1.1km',
      status: '여유 있음',
      statusColor: '#00c853',
      usage: '총 5대 중 1대 사용 중',
      image: '/station_3.png',
      canPhoneCharge: true,
      canReserve: true
    }
  ];

  const [stations, setStations] = useState(initialStations);
  const [sortType, setSortType] = useState('distance');

  const toggleSort = () => {
    if (sortType === 'distance') {
      setSortType('usage');
      const sorted = [...stations].sort((a, b) => {
        // Usage priority: id 3 (여유) > id 1 (보통) > id 2 (혼잡)
        const priority = { 3: 1, 1: 2, 2: 3 };
        return priority[a.id] - priority[b.id];
      });
      setStations(sorted);
    } else {
      setSortType('distance');
      const sorted = [...stations].sort((a, b) => {
        return parseFloat(a.distance) - parseFloat(b.distance);
      });
      setStations(sorted);
    }
  };

  const handleReserve = (station) => {
    if (station.canReserve) {
      setReservedStation(station);
      navigate('/dashboard');
    } else {
      setToastMessage('현재 예약이 꽉 차서 불가합니다.');
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

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
        backgroundColor: 'var(--white)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mock Map Area */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#e8f0f6',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <motion.div 
          drag
          dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
          dragElastic={0.2}
          style={{
            position: 'absolute',
            top: -40,
            left: -40,
            right: -40,
            bottom: -40,
            backgroundImage: 'url(/map_bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
            cursor: 'grab'
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div style={{ position: 'absolute', top: '40px', left: '40px', right: '40px', bottom: '40px' }}>
            {/* Current Location Marker */}
            <div style={{ position: 'absolute', top: '55%', left: '35%', transform: 'translate(-50%, -50%)', zIndex: 2 }}>
               <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(0, 102, 255, 0.2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--point-blue)', borderRadius: '50%', border: '2px solid var(--white)' }} />
               </div>
            </div>

            {/* Station Markers */}
            <MapMarker top="30%" left="50%" number="2" />
            <MapMarker top="45%" left="70%" number="3" />
            <MapMarker top="70%" left="60%" number="1" />
          </div>
        </motion.div>

        {/* Map UI Elements (Static) */}
        <div style={{ position: 'absolute', top: 'var(--safe-area-top)', left: '20px', backgroundColor: 'var(--white)', padding: '12px 16px', borderRadius: '16px', boxShadow: 'var(--shadow)', zIndex: 2 }}>
          <div>
            <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>추천 충전소</div>
            <div style={{ color: 'var(--text-sub)', fontSize: '13px' }}>반경 2km 내</div>
          </div>
        </div>

        <div style={{ position: 'absolute', top: 'var(--safe-area-top)', right: '20px', width: '48px', height: '48px', backgroundColor: 'var(--white)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow)', zIndex: 2 }}>
          <Navigation size={22} color="var(--text-main)" />
        </div>

        <div style={{ position: 'absolute', bottom: '180px', right: '20px', backgroundColor: 'var(--white)', padding: '8px 12px', borderRadius: '20px', boxShadow: 'var(--shadow)', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 2, fontSize: '13px', fontWeight: '600' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--point-blue)', borderRadius: '50%' }} />
          내 위치
        </div>
      </div>

      {/* List Area / Bottom Sheet */}
      <motion.div 
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 350 }}
        dragElastic={0.1}
        onDragEnd={(event, info) => {
          if (info.offset.y > 60) {
            setIsCollapsed(true);
          } else if (info.offset.y < -60) {
            setIsCollapsed(false);
          }
        }}
        animate={{ y: isCollapsed ? 350 : 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '520px',
          backgroundColor: 'var(--white)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '16px 20px',
          paddingBottom: 'calc(var(--safe-area-bottom) + 90px)',
          zIndex: 3,
          overflowY: 'auto',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)'
        }} 
        className="no-scrollbar"
      >
        {/* Grabber Handle */}
        <div 
          id="sheet-grabber"
          onPointerDown={(e) => dragControls.start(e)}
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ width: '40px', height: '5px', backgroundColor: '#d0d0d0', borderRadius: '3px', margin: '0 auto 20px', cursor: 'ns-resize', touchAction: 'none' }} 
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>가까운 충전소</h2>
          <div onClick={toggleSort} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-sub)', fontSize: '14px', gap: '4px', cursor: 'pointer' }}>
            {sortType === 'distance' ? '거리순' : '여유순'} <ChevronDown size={16} />
          </div>
        </div>

        {/* Station List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {stations.map((station) => (
            <div key={station.id} style={{ display: 'flex', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
              
              <div style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={station.image} alt={station.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '4px', left: '4px', backgroundColor: 'var(--point-blue)', color: 'var(--white)', width: '24px', height: '24px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', fontWeight: '700' }}>
                  {station.id}
                </div>
                <div style={{ position: 'absolute', bottom: '4px', right: '4px', backgroundColor: 'var(--white)', color: 'var(--point-blue)', padding: '2px 6px', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}>
                  {station.distance}
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>{station.name}</h3>
                  <motion.div 
                    whileTap={{ scale: 1.3 }} 
                    onClick={() => toggleFavorite(station.id, station.name)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', margin: '-4px' }}
                  >
                    <Star 
                      size={20} 
                      color={favorites.includes(station.id) ? '#ffb300' : '#d0d0d0'} 
                      fill={favorites.includes(station.id) ? '#ffb300' : 'transparent'} 
                    />
                  </motion.div>
                </div>
                
                <div style={{ fontSize: '13px', color: 'var(--text-sub)', marginBottom: '8px' }}>
                  도보 {station.walkTime} <span style={{ margin: '0 4px', color: '#e0e0e0' }}>|</span> {station.distance}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', backgroundColor: `${station.statusColor}20`, color: station.statusColor, fontWeight: '600' }}>
                    {station.status}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-sub)', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '6px' }}>
                    {station.usage}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-sub)', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Battery size={14} /> 폰 충전 가능
                    </div>
                    {station.canReserve ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--point-blue)' }}>
                        <MapPin size={14} /> 예약 가능
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--point-red)' }}>
                        <MapPin size={14} /> 예약 불가
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => navigate('/route', { state: { stationId: station.id } })}
                      style={{
                        backgroundColor: '#f2f2f7',
                        color: 'var(--point-blue)',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      경로 안내
                    </button>
                    <button 
                      onClick={() => handleReserve(station)}
                      style={{
                        backgroundColor: 'var(--point-blue)',
                        color: 'var(--white)',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      예약
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner */}
        <div style={{ backgroundColor: '#f0f6ff', borderRadius: '12px', padding: '16px', marginTop: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ color: 'var(--point-blue)', flexShrink: 0 }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
          </div>
          <div>
            <div style={{ color: 'var(--point-blue)', fontWeight: '700', fontSize: '14px', marginBottom: '4px' }}>인기 장소 방문 전 미리 예약하세요!</div>
            <div style={{ color: 'var(--text-sub)', fontSize: '13px' }}>많은 이용자가 몰리는 장소의 충전소는 사전 예약을 추천드려요.</div>
          </div>
        </div>
        <div style={{ height: '30px' }} /> {/* Padding for bottom */}
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

const MapMarker = ({ top, left, number }) => (
  <div style={{ position: 'absolute', top, left, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--point-blue)', borderRadius: '16px 16px 16px 4px', transform: 'rotate(-45deg)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 8px rgba(0,102,255,0.4)' }}>
       <div style={{ transform: 'rotate(45deg)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V6c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v16"/><path d="M4 12h8"/><path d="M12 8v4"/><path d="M16 6v4"/><path d="M16 10h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2v4"/><path d="M9 16v2"/><path d="M7 16v2"/></svg>
       </div>
    </div>
    <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '20px', height: '20px', backgroundColor: 'var(--white)', color: 'var(--text-main)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: '700', boxShadow: 'var(--shadow)' }}>
      {number}
    </div>
  </div>
);

export default RecommendationScreen;
