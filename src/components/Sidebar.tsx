import React from 'react';
import { NavLink } from 'react-router-dom';

// Array of menu items
const menuItems = [
    {
        label: 'Counter Hook',
        path: '/counter-hook'
    },
    {
        label: 'Counter',
        path: '/counter'
    },
    {
        label: 'Easy Button',
        path: '/easy-button'
    },
    {
        label: 'Location',
        path: '/location'
    },
    {
        label: 'Login Submission',
        path: '/login-submission'
    },
    {
        label: 'Login',
        path: '/login'
    },
];

const Sidebar = () => {
    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-40">
                <nav className="p-4 space-y-2">
                    {menuItems.map((menu, index) => (
                        <div key={index}>
                           <NavLink
                                    to={menu.path}
                                    className={({ isActive }) =>
                                        `block p-2 my-1 rounded-r border-l-4 transition-all duration-300 ease-in-out ${isActive
                                            ? 'border-blue-500 bg-gray-800 text-blue-200'
                                            : 'border-transparent hover:bg-gray-800 hover:border-blue-500'
                                        }`
                                    }
                                    end
                                >
                                    {menu.label}
                                </NavLink>
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;