import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Layout/Dashboard';
import Alerts from '../pages/alerts/Alerts';
import Profile from '../pages/profile/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="alerts" element={<Alerts />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
