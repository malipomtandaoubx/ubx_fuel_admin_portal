/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo } from "react";
import { observer } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
// import routes from "routes";
import routes, { sidebarRoutes, authRoutes, protectedRoutes } from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import EditProfile from "layouts/profile/edit-profile";
import MDTypography from "components/MDTypography";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { authStore } = useStore();

    if (!authStore.is_login) {
        return <Navigate to="/authentication/sign-in" replace />;
    }

    return children;
};


// Public Route Component (only accessible when not logged in)
const PublicRoute = ({ children }) => {
    const { authStore } = useStore();

    if (authStore.is_login) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

function App() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        direction,
        layout,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [rtlCache, setRtlCache] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { pathname } = useLocation();
    const { authStore } = useStore();

    // Cache for the rtl
    useMemo(() => {
        const cacheRtl = createCache({
            key: "rtl",
            stylisPlugins: [rtlPlugin],
        });

        setRtlCache(cacheRtl);
    }, []);

    // Open sidenav when mouse enter on mini sidenav
    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    // Close sidenav when mouse leave mini sidenav
    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

    // Change the openConfigurator state
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    // Setting the dir attribute for the body element
    useEffect(() => {
        document.body.setAttribute("dir", direction);
    }, [direction]);

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            await authStore.loadUserFromStorage();
            setIsLoading(false);
        };

        // Only initialize auth if we haven't already loaded the user
        if (!authStore.userLoaded) {
            initializeAuth();
        } else {
            setIsLoading(false);
        }

        // Listen for storage changes (for tab synchronization)
        const handleStorageChange = (e) => {
            if (e.key === 'userData' || e.key === null) {
                // If userData is removed (logout) or changed, reload auth state
                initializeAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [authStore.userLoaded]);

    // const getRoutes = (allRoutes) =>
    //     allRoutes.map((route) => {
    //         if (route.collapse) {
    //             return getRoutes(route.collapse);
    //         }

    //         if (route.route) {
    //             return <Route exact path={route.route} element={route.component} key={route.key} />;
    //         }

    //         return null;
    //     });

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                // Check if route is auth route or protected route
                const isAuthRoute = authRoutes.some(authRoute => authRoute.route === route.route);
                const isProtectedRoute = protectedRoutes.some(protectedRoute => protectedRoute.route === route.route);

                if (isAuthRoute) {
                    return (
                        <Route
                            exact
                            path={route.route}
                            element={
                                <PublicRoute>
                                    {route.component}
                                </PublicRoute>
                            }
                            key={route.key}
                        />
                    );
                } else if (isProtectedRoute) {
                    return (
                        <Route
                            exact
                            path={route.route}
                            element={
                                <ProtectedRoute>
                                    {route.component}
                                </ProtectedRoute>
                            }
                            key={route.key}
                        />
                    );
                } else {
                    return <Route exact path={route.route} element={route.component} key={route.key} />;
                }
            }

            return null;
        });

    const configsButton = (
        <MDBox display="flex" justifyContent="center" alignItems="center" width="3.25rem" height="3.25rem" bgColor="white" shadow="sm" borderRadius="50%" position="fixed" right="2rem" bottom="2rem" zIndex={99} color="dark" sx={{ cursor: "pointer" }} onClick={handleConfiguratorOpen}>
            <Icon fontSize="small" color="inherit">
                settings
            </Icon>
        </MDBox>
    );

    // Show loading state while initializing auth
    if (isLoading) {
        return (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
                <CssBaseline />
                <MDBox display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <MDTypography variant="h6" color="text">
                        Loading...
                    </MDTypography>
                </MDBox>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            {layout === "dashboard" && (
                <>
                    <Sidenav color={sidenavColor} brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite} brandName="UBX Fuel Pay" routes={sidebarRoutes} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} />
                    <Configurator />
                    {/* {configsButton} */}
                </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
                <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
                {getRoutes(routes)}
                <Route
                    exact
                    path="/edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                    key="edit-profile"
                />
            </Routes>
        </ThemeProvider>
    );
}

export default observer(App);
