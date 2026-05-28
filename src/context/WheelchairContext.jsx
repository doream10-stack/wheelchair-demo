import React, { createContext, useState, useContext } from 'react';

const WheelchairContext = createContext(null);

export const WheelchairProvider = ({ children }) => {
  const [battery, setBattery] = useState(8);
  const [isEcoMode, setIsEcoMode] = useState(false);
  const [isEmergencyShared, setIsEmergencyShared] = useState(false);
  const [reservedStation, setReservedStation] = useState(null);

  const toggleEcoMode = () => setIsEcoMode(prev => !prev);
  const toggleEmergencyShared = () => setIsEmergencyShared(prev => !prev);

  const getRange = () => {
    const baseMultiplier = isEcoMode ? 16.25 : 11.25;
    return parseFloat(((battery * baseMultiplier) / 100).toFixed(1));
  };

  return (
    <WheelchairContext.Provider value={{
      battery,
      setBattery,
      isEcoMode,
      setIsEcoMode,
      toggleEcoMode,
      isEmergencyShared,
      setIsEmergencyShared,
      toggleEmergencyShared,
      reservedStation,
      setReservedStation,
      range: getRange()
    }}>
      {children}
    </WheelchairContext.Provider>
  );
};

export const useWheelchair = () => {
  const context = useContext(WheelchairContext);
  if (!context) {
    throw new Error('useWheelchair must be used within a WheelchairProvider');
  }
  return context;
};
