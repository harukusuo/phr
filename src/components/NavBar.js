import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SideBar from './SideBar';
import BottomBar from './BottomBar';

function NavBar({ user }) {

    // Define quais rotas devem ter a barra
    const routesWithNavbar = [
        '/homepage',
        '/search',
        '/search/:query?',
        '/pets',
        '/chats',
        '/profile/:id',
        '/achados',
        '/perdidos',
        '/AddAnimal',
    ];

    const location = useLocation();
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const [bottomBarVisible, setBottomBarVisible] = useState(false);

    const updateNavBarsVisibility = () => {
        const currentPath = location.pathname;
        const isRouteWithNavbar = routesWithNavbar.some(route => {
            const regex = new RegExp(`^${route.replace(/:\w+\??/, '.*')}$`);
            return regex.test(currentPath);
        });

        if (isRouteWithNavbar) {
            if (window.innerWidth < 1080) {
                setSideBarVisible(false);
                setBottomBarVisible(true);
            } else {
                setSideBarVisible(true);
                setBottomBarVisible(false);
            }
        } else {
            setSideBarVisible(false);
            setBottomBarVisible(false);
        }
    }

    useEffect(() => {
        updateNavBarsVisibility();
    }, [location]);

    useEffect(() => {
        window.addEventListener('resize', updateNavBarsVisibility);
        return () => {
            window.removeEventListener('resize', updateNavBarsVisibility);
        };
    }, []);

    return (
        <div>
            {sideBarVisible && <SideBar user={user}/>}
            {bottomBarVisible && <BottomBar user={user}/>}
        </div>
    )
}

export default NavBar;