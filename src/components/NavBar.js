import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SideBar from './SideBar';
import BottomBar from './BottomBar';

function NavBar({ user }) {

    

    const location = useLocation();
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const [bottomBarVisible, setBottomBarVisible] = useState(false);

    useEffect(() => {

        const routesWithNavbar = [
            '/homepage',
            '/search',
            '/search/:query?',
            '/pets',
            '/chats',
            '/profile/:id',
            '/AddAnimal',
        ];

        const updateNavBarsVisibility = () => {
            const currentPath = location.pathname;
            const isRouteWithNavbar = routesWithNavbar.some(route => {
                const regex = new RegExp(`^${route.replace(/:\w+\??/, '.*')}$`, "i");
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
        };

        updateNavBarsVisibility();

        const handleResize = () => {
            updateNavBarsVisibility();
        };

        const handleFocus = () => {
            updateNavBarsVisibility();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('focus', handleFocus);
        };
    }, [location.pathname]);

    return (
        <div>
            {sideBarVisible && <SideBar user={user}/>}
            {bottomBarVisible && <BottomBar user={user}/>}
        </div>
    )
}

export default NavBar;