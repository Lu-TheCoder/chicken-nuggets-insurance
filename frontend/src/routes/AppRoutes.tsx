import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Layout/Dashboard';
import Alerts from '../pages/alerts/Alerts';
import Profile from '../pages/profile/Profile';
import Health from '../pages/health/Health';
import HealthDelete from '../pages/health/sub-pages/delete/HealthDelete';
import HealthEdit from '../pages/health/sub-pages/edit/HealthEdit';
import HealthCreate from '../pages/health/sub-pages/create/HealthCreate';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="alerts" element={<Alerts />} />
        <Route path="profile" element={<Profile />} />

        <Route path="health" element={<Health />}>
          <Route path="create" element={<HealthCreate />} />
          <Route path=":id/edit" element={<HealthEdit />} />
          <Route path=":id/delete" element={<HealthDelete />} />
        </Route>
      </Route>
    </Routes>

  );
};

export default AppRoutes;
