
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/employees/Employees';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="/" element={<Navigate to="/employees" />} />

        </Route>
      </Routes>
    </Router>
  );
}
export default App;
