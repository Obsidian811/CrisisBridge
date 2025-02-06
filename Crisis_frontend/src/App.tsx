import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar.tsx';
import Sidebar from './Sidebar/sidebar.tsx';
import ProfileButton from './ProfileButton/ProfileButton.tsx';
import LandingPage from './LandingPage/LandingPage.tsx';
import AboutUs from './AboutUs/AboutUs.tsx';
import Login from './Login/Login.tsx';
import VolunteerDashboard from './Dashboard/Volunteer_dashboard.tsx';
import VictimDashboard from './Dashboard/Victim_dashboard.tsx';
import Settings from './Settings/Settings.tsx';
import MyProfile from './MyProfile/MyProfile.tsx';
// import Footer from './Footer/Footer.tsx';
// import NotFound from './NotFound/NotFound.tsx';
import './App.css';

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null); // State to manage user role
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="appContainer">
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`mainContent ${isSidebarOpen ? 'sidebarOpen' : ''}`}>
                <ProfileButton onClick={toggleSidebar} />
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login setUserRole={setUserRole} />} />
                    <Route path="/dashboard" element={userRole === 'volunteer' ? <VolunteerDashboard /> : <VictimDashboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
                {location.pathname === '/' && <AboutUs />}
                {/* <Footer /> */}
            </div>
        </div>
    );
};

const AppWrapper: React.FC = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
