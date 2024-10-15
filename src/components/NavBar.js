import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import SideBar from './SideBar';
import BottomBar from './BottomBar';

function NavBar() {

    // Define quais rotas devem ter a barra
    const routesWithNavbar = [
        '/homepage',
        '/search',
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
        if (routesWithNavbar.includes(location.pathname)) {
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
        updateNavBarsVisibility();
        return () => {
            window.removeEventListener('resize', updateNavBarsVisibility);
        };
    }, []);

    return (
        <div>
            {sideBarVisible && <SideBar />}
            {bottomBarVisible && <BottomBar />}
        </div>
    )
}


export default NavBar;