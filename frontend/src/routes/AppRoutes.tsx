import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Layout/Dashboard';
import Alerts from '../pages/alerts/Alerts';
import Profile from '../pages/profile/Profile';

import Health from '../pages/health/Health';
import HealthDelete from '../pages/health/sub-pages/delete/HealthDelete';
import HealthEdit from '../pages/health/sub-pages/edit/HealthEdit';
import HealthCreate from '../pages/health/sub-pages/create/HealthCreate';

import Signin from '@/pages/(auth)/signin';
import Signup from '@/pages/(auth)/signup';
import RequireAuth from '@/guard/requireAuth';
import MonitoredDestinationsTable from '@/pages/monitoredDestination/monitoredDesination';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}>
        <Route path="alerts" element={<Alerts />} />
        <Route path="profile" element={<Profile />} />

        <Route path="health" element={<Health />}>
          <Route path="create" element={<HealthCreate />} />
          <Route path=":id/edit" element={<HealthEdit />} />
          <Route path=":id/delete" element={<HealthDelete />} />
        </Route>

        <Route path="monitoredDestinations" element={<MonitoredDestinationsTable />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
    </Routes>

  );
};

export default AppRoutes;
