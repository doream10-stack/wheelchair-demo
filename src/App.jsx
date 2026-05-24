import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TabBar from './components/TabBar';
import DangerScreen from './components/DangerScreen';
import LoadingScreen from './components/LoadingScreen';
import RecommendationScreen from './components/RecommendationScreen';
import RouteScreen from './components/RouteScreen';
import MyWheelchairScreen from './components/MyWheelchairScreen';
import DashboardScreen from './components/DashboardScreen';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DangerScreen />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/recommend" element={<RecommendationScreen />} />
          <Route path="/route" element={<RouteScreen />} />
          <Route path="/wheelchair" element={<MyWheelchairScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </AnimatePresence>
      <TabBar />
    </div>
  );
}

export default App;
