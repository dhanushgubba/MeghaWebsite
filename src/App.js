import React,{useState} from 'react'; // Ensure useState is imported
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Events from './pages/Events';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar1 from './components/Navbar1';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Faqs from './pages/Faqs';
import AdminNavbar from './components/AdminNavbar';
import AdminEvents from './pages/AdminEvents';
import UserEvents from './pages/UserEvents';
import Attendance from './pages/Attendance';
import AdminDashboard from './pages/AdminDashboard';
import AdminCertifications from './pages/AdminCertifications';
import Certifications from './pages/Certifications';


const App = () => {
  
  const [events, setEvents] = useState([]);

  const location = useLocation();
  
  const showNavbar = ![
    '/login',
    '/register',
    '/',
    '/about',
    '/events',
    '/contact',
    '/adminlogin',
    '/adminregister',
    '/forgot-password',
    '/reset-password'
  ].includes(location.pathname);
  
  const showAdminNavbar = location.pathname === '/admindashboard' || location.pathname === '/adminevents' ||location.pathname === '/admincertifications' || location.pathname.startsWith('/attendance/');

  return (
    <div>
      {!showNavbar && !showAdminNavbar && <Navbar />}
      {showNavbar && !showAdminNavbar && <Navbar1 />}
      {showAdminNavbar && <AdminNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Pass events to UserEvents */}
        <Route path="/myevents" element={<UserEvents events={events} setEvents={setEvents}/>} />  
        <Route path="/mycertifications" element = {<Certifications />} />
        
        <Route path="/resources" element={<Resources />} />
        <Route path="/community" element={<Community />} />
        <Route path="/faqs" element={<Faqs />} />

        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/attendance/:eventId" element={<Attendance />} />
        

        {/* Pass events and setEvents to AdminEvents */}
        <Route path="/adminevents" element={<AdminEvents events={events} setEvents={setEvents} />} />
        <Route path="/admincertifications" element={<AdminCertifications />} />
      </Routes>
      
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
