import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import SideBar from './SideBar';
import BottomBar from './BottomBar';

function NavBar({ user, token, setUser, setToken, userLoaded }) {

    const location = useLocation();
    const navigate = useNavigate();
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const [bottomBarVisible, setBottomBarVisible] = useState(false);

    // useEffect para verificar se o usuário está logado e redirecionar para a página de login caso não esteja
    useEffect(() => {
        if(!userLoaded) return;
        
        const publicRoutes = ['/', '/login', '/cadastro'];
        const currentPath = location.pathname;

        const checkTokenValidity = () => {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    throw new Error('Token is expired');
                }
            } catch (error) {
                console.error(error);
                setUser(null);
                setToken(null);
                navigate('/login', { replace: true, state: { from: '/' } });
            }
        };

        if (!user && !token && !publicRoutes.includes(currentPath)) {
            console.log('User and token are missing. Redirecting to login page from path:', currentPath);
            navigate('/login', { replace: true, state: { from: '/' } });
        } else if (user && token) {
            checkTokenValidity();
        }
    }, [user, token, location, navigate, setUser, setToken, userLoaded]);

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