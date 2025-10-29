// client/src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import CustomCursor from './components/CustomCursor';
import FloatingParticles from './components/FloatingParticles';
import MouseFollowSpotlight from './components/MouseFollowSpotlight';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TeamPage from './pages/TeamPage';
import ProjectPage from './pages/ProjectPage';
import AdminDashboard from './pages/AdminDashboard'; // 2. Import AdminDashboard

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <FloatingParticles />
      <MouseFollowSpotlight />
      <Box className="content-wrapper" minH="100vh">
        <Navbar />
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes (for logged-in users) */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/team"
          element={<ProtectedRoute><TeamPage /></ProtectedRoute>}
        />
        <Route
          path="/project"
          element={<ProtectedRoute><ProjectPage /></ProtectedRoute>}
        />

        {/* Protected Routes (for admins only) */}
        {/* 3. Add the new admin route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;