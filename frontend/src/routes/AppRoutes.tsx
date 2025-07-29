import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Layout/Dashboard';
import Alerts from '../pages/alerts/Alerts';
import Profile from '../pages/profile/Profile';
import Signin from '@/pages/(auth)/signin';
import Signup from '@/pages/(auth)/signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="alerts" element={<Alerts />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
    </Routes>
  );
};

export default AppRoutes;
