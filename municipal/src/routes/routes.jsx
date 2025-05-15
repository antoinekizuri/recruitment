// src/routes/routes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ApplyNormal from '../pages/ApplyNormal';
import ApplySenior from '../pages/ApplySenior';
import Success from '../pages/Success';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply-normal" element={<ApplyNormal />} />
      <Route path="/apply-senior" element={<ApplySenior />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
