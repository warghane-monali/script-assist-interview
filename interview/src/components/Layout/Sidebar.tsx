import { Button } from '@mantine/core';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/app.store';

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);

    const navItems = [
        { label: 'Script Assist Info', path: 'dashboard/info' },
        { label: 'Resource List', path: 'dashboard/resource-list' }
    ];

    const handleLogout = () => {
        logout();  
        setTimeout(() => {
          navigate('/');
        }, 100);
      };

    return (
        <div className='sidebar-container'>
            <div>
                <h3 style={{ textAlign: 'center', color: 'var(--darkPurple)' }}>Script Assist</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', margin: "10px", padding: "10px" }}>
                {navItems && navItems?.map(item => (
                    <h4
                        key={item.path}
                        className={`nav-item ${location.pathname.includes(item.path) ? 'active' : ''}`}
                        onClick={() => navigate(`/${item.path}`)}
                    >
                        {item.label}
                    </h4>
                ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => handleLogout()} className="login-btn">Logout</Button>
            </div>
        </div>
    );
}

export default Sidebar;
