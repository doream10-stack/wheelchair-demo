import React from 'react';
import { useWheelchair } from '../context/WheelchairContext';
import { Battery, ShieldAlert, Sparkles, Navigation, RotateCcw, Trash2, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const DemoController = () => {
  const {
    battery,
    setBattery,
    isEcoMode,
    setIsEcoMode,
    isEmergencyShared,
    setIsEmergencyShared,
    reservedStation,
    setReservedStation,
  } = useWheelchair();

  const handleReset = () => {
    setBattery(8);
    setIsEcoMode(false);
    setIsEmergencyShared(false);
    setReservedStation(null);
  };

  const handleSetPreset = (type) => {
    if (type === 'danger') {
      setBattery(8);
      setIsEcoMode(false);
      setReservedStation(null);
    } else if (type === 'normal') {
      setBattery(75);
      setIsEcoMode(false);
    } else if (type === 'reserve') {
      setBattery(8);
      setIsEcoMode(true);
      setReservedStation({
        id: 1,
        name: '치인고속화도로 충전소',
        walkTime: '5분',
        distance: '0.4km',
        status: '사용 가능',
        statusColor: '#00c853',
        usage: '총 4대 중 2대 사용 중',
        image: '/station_1.png',
        canPhoneCharge: true,
        canReserve: true,
        lat: 37.5645,
        lng: 126.9790
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: 'var(--bg-app)',
        padding: '24px 20px',
        paddingTop: 'calc(var(--safe-area-top) + 20px)',
        paddingBottom: 'calc(var(--safe-area-bottom) + 90px)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
      className="no-scrollbar"
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>데모 컨트롤러</h1>
          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--point-blue)', borderRadius: '50%' }} />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-sub)' }}>
          전시회 시연 및 기능 테스트를 위한 가상 데이터 제어판입니다.
        </p>
      </div>

      {/* Quick Presets */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-sub)', marginBottom: '12px' }}>시연 퀵 프리셋</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleSetPreset('danger')}
            style={{
              flex: 1,
              padding: '12px 8px',
              borderRadius: '16px',
              backgroundColor: battery <= 15 ? 'var(--bg-red-light)' : 'var(--white)',
              color: battery <= 15 ? 'var(--point-red)' : 'var(--text-main)',
              border: battery <= 15 ? '1px solid var(--point-red)' : '1px solid var(--border)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow)',
              transition: 'all 0.2s ease'
            }}
          >
            🚨 방전 위험 (8%)
          </button>
          <button
            onClick={() => handleSetPreset('reserve')}
            style={{
              flex: 1,
              padding: '12px 8px',
              borderRadius: '16px',
              backgroundColor: reservedStation ? 'rgba(0, 102, 255, 0.08)' : 'var(--white)',
              color: reservedStation ? 'var(--point-blue)' : 'var(--text-main)',
              border: reservedStation ? '1px solid var(--point-blue)' : '1px solid var(--border)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow)',
              transition: 'all 0.2s ease'
            }}
          >
            📅 예약 완료 상태
          </button>
          <button
            onClick={() => handleSetPreset('normal')}
            style={{
              flex: 1,
              padding: '12px 8px',
              borderRadius: '16px',
              backgroundColor: (battery > 15 && !reservedStation) ? 'rgba(16, 185, 129, 0.08)' : 'var(--white)',
              color: (battery > 15 && !reservedStation) ? '#10b981' : 'var(--text-main)',
              border: (battery > 15 && !reservedStation) ? '1px solid #10b981' : '1px solid var(--border)',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: 'var(--shadow)',
              transition: 'all 0.2s ease'
            }}
          >
            🔋 정상 상태 (75%)
          </button>
        </div>
      </div>

      {/* Control sliders & switches */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        
        {/* Battery Slider */}
        <div style={{
          backgroundColor: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '18px',
          boxShadow: 'var(--shadow)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
              <Battery size={18} color={battery <= 15 ? 'var(--point-red)' : 'var(--point-blue)'} />
              배터리 잔량 시뮬레이션
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: '800',
              color: battery <= 15 ? 'var(--point-red)' : '#10b981'
            }}>{battery}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={battery}
            onChange={(e) => setBattery(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#e2e8f0',
              borderRadius: '3px',
              outline: 'none',
              cursor: 'pointer',
              accentColor: battery <= 15 ? 'var(--point-red)' : 'var(--point-blue)'
            }}
          />
        </div>

        {/* Eco Mode Toggle */}
        <div 
          onClick={() => setIsEcoMode(!isEcoMode)}
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border)',
            borderColor: isEcoMode ? 'rgba(16, 185, 129, 0.4)' : 'var(--border)',
            borderRadius: '20px',
            padding: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow)',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              배터리 절약 (Eco Mode) <Sparkles size={16} color={isEcoMode ? '#10b981' : 'var(--text-sub)'} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-sub)', marginTop: '4px' }}>
              절약 운전을 적용해 남은 주행 보장 거리를 시뮬레이션합니다.
            </div>
          </div>
          <div style={{
            width: '44px',
            height: '24px',
            backgroundColor: isEcoMode ? '#10b981' : '#cbd5e1',
            borderRadius: '12px',
            padding: '2px',
            display: 'flex',
            justifyContent: isEcoMode ? 'flex-end' : 'flex-start',
            alignItems: 'center',
            transition: 'background-color 0.2s ease'
          }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }} />
          </div>
        </div>

        {/* Location Share Toggle */}
        <div 
          onClick={() => setIsEmergencyShared(!isEmergencyShared)}
          style={{
            backgroundColor: 'var(--white)',
            border: '1px solid var(--border)',
            borderColor: isEmergencyShared ? 'rgba(0, 102, 255, 0.4)' : 'var(--border)',
            borderRadius: '20px',
            padding: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow)',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ flex: 1, paddingRight: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              보호자 긴급 위치 공유 <ShieldAlert size={16} color={isEmergencyShared ? 'var(--point-blue)' : 'var(--text-sub)'} />
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-sub)', marginTop: '4px' }}>
              안전 모드 적용 팝업 내 위치 공유 상태를 시뮬레이션합니다.
            </div>
          </div>
          <div style={{
            width: '44px',
            height: '24px',
            backgroundColor: isEmergencyShared ? 'var(--point-blue)' : '#cbd5e1',
            borderRadius: '12px',
            padding: '2px',
            display: 'flex',
            justifyContent: isEmergencyShared ? 'flex-end' : 'flex-start',
            alignItems: 'center',
            transition: 'background-color 0.2s ease'
          }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }} />
          </div>
        </div>

        {/* Clear Reservation */}
        {reservedStation && (
          <div 
            onClick={() => setReservedStation(null)}
            style={{
              backgroundColor: 'var(--bg-red-light)',
              border: '1px dashed rgba(255,59,48,0.3)',
              borderRadius: '20px',
              padding: '18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--point-red)' }}>예약 강제 취소</div>
              <div style={{ fontSize: '11px', color: 'var(--text-sub)', marginTop: '2px' }}>
                현재 진행 중인 충전기 예약 대기를 즉시 취소합니다.
              </div>
            </div>
            <Trash2 size={18} color="var(--point-red)" />
          </div>
        )}

      </div>

      {/* Reset System */}
      <button
        onClick={handleReset}
        style={{
          marginTop: 'auto',
          backgroundColor: 'var(--white)',
          color: 'var(--text-main)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '16px',
          fontSize: '15px',
          fontWeight: '700',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          marginBottom: '10px',
          boxShadow: 'var(--shadow)',
          transition: 'all 0.2s ease'
        }}
      >
        <RotateCcw size={16} />
        데모 데이터 초기화
      </button>
    </motion.div>
  );
};

export default DemoController;
