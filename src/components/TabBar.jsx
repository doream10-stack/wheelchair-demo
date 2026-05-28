import React from 'react';
import { Home, BatteryCharging, Navigation, Sliders } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine active tab based on route, default to EvStation for demo
  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '16px 20px',
        paddingBottom: 'var(--safe-area-bottom)',
        backgroundColor: 'var(--white)',
        borderTop: '1px solid var(--border)',
        zIndex: 10,
      }}
    >
      <TabItem 
        icon={<Home size={28} />} 
        label="Home" 
        active={isActive('/') || isActive('/route')}
        onClick={() => navigate('/')} 
      />
      <TabItem 
        icon={<BatteryCharging size={28} />} 
        label="충전소" 
        active={isActive('/recommend') || isActive('/loading')} 
        onClick={() => navigate('/recommend')}
      />
      <TabItem 
        icon={<Navigation size={28} />} 
        label="휠체어" 
        active={isActive('/wheelchair')}
        onClick={() => navigate('/wheelchair')}
      />
      <TabItem 
        icon={<Sliders size={28} />} 
        label="데모 제어" 
        active={isActive('/demo')}
        onClick={() => navigate('/demo')}
      />
    </div>
  );
};

const TabItem = ({ icon, label, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        color: active ? 'var(--point-blue)' : '#a0a0a0',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex' }}>
        {icon}
      </div>
      <span style={{ fontSize: '11px', fontWeight: '500' }}>{label}</span>
    </div>
  );
};

export default TabBar;
