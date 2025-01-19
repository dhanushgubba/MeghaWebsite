import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Events from './pages/Events';
/*import Dashboard from './pages/Dashboard';*/
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Resources from './pages/Resources';
import Faqs from './pages/Faqs';
import AdminNavbar from './components/AdminNavbar';
import AdminEvents from './pages/AdminEvents';
import UserEvents from './pages/UserEvents';
import Attendance from './pages/Attendance';
import AdminDashboard from './pages/AdminDashboard';
import AdminCertifications from './pages/AdminCertifications';
import Certifications from './pages/Certifications';
import AdminVouchers from './pages/AdminVouchers';
import Vouchers from './pages/Vouchers';

const App = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation(); // Access current path

  // Determine which navbar to display
  const showNavbar = [
    '/',
    '/about',
    '/events',
    '/contact',
    '/login',
    '/adminlogin',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/myevents',
    '/mycertifications',
    '/vouchers',
    '/resources',
    '/faqs',
  ].includes(location.pathname);

  const showAdminNavbar = [
    '/admindashboard',
    '/adminevents',
    '/adminvouchers',
    '/admincertifications',
  ].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar />}
      {showAdminNavbar && <AdminNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* User Routes */}
        <Route
          path="/myevents"
          element={<UserEvents events={events} setEvents={setEvents} />}
        />
        <Route path="/mycertifications" element={<Certifications />} />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<Faqs />} />

        {/* Admin Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route
          path="/adminevents"
          element={<AdminEvents events={events} setEvents={setEvents} />}
        />
        {/*<Route
          path="/admincertifications"
          element={
            <AdminCertifications
              certifications={certifications}
              setCertifications={setCertifications}
            />
          }
        />*/}
        <Route path="/admincertifications" element={<AdminCertifications />} />
        <Route path="/adminvouchers" element={<AdminVouchers />} />
        <Route path="/attendance/:eventId" element={<Attendance />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Wrap App in Router at the top level
const Main = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default Main;
