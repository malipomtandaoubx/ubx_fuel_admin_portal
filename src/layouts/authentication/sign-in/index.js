/* eslint-disable prettier/prettier */
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

import { useState, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../context/MobxContext';

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
    const { authStore } = useStore();
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });

        // Auto hide after 5 seconds
        setTimeout(() => {
            setAlert({ show: false, type: '', message: '' });
        }, 3000);
    };

    const handleCloseAlert = () => {
        setAlert({ show: false, type: '', message: '' });
    };

    async function submit() {
        // === EMAIL VALIDATION ===
        if (!email.trim()) {
            showAlert("error", "Email cannot be empty");
            return;
        }

        // Basic email pattern validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showAlert("error", "Enter a valid email address");
            return;
        }

        // === PASSWORD VALIDATION ===
        if (!password.trim()) {
            showAlert("error", "Password cannot be empty");
            return;
        }

        if (password.length < 8) {
            showAlert("error", "Password must be at least 8 characters long");
            return;
        }

        await authStore.login(email, password);

        if (authStore.error) {
            showAlert('error', authStore.error);
        } else {
            // === SUCCESS ===
            showAlert("success", "Login successful!");
            // setTimeout(() => {
            //     loadUserData();
            // }, 2000);
            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 1000);
        }
    }

    // const loadUserData = async () => {
    //     // console.log("🚀 ~ Overview ~ authStore:", authStore?.user)
    //     authStore.print_user_data()
    //     // try {
    //     //     const savedData = await localStorage.getItem('userData');
    //     //     console.log("🚀 ~ Basic ~ savedData:", savedData);

    //     // } catch (error) {
    //     //     console.error("Error loading user data:", error);
    //     // }
    // };

    return (
        <BasicLayout image={bgImage}>
            <Card>
                <MDBox variant="gradient" bgColor="customHeaderBackground" borderRadius="lg" coloredShadow="info" mx={2} mt={-3} p={2} mb={1} textAlign="center">
                    <MDTypography variant="h4" fontWeight="medium" color="customHeaderText" mt={1}>
                        UBX Fuel Pay
                    </MDTypography>
                </MDBox>
                {/* Render alert conditionally */}
                {alert.show && (
                    <MDBox px={3} mb={-5}>
                        <MDAlert color={alert.type} dismissible onClose={handleCloseAlert}>
                            <MDTypography variant="body2" color="white">
                                {alert.message}
                            </MDTypography>
                        </MDAlert>
                    </MDBox>
                )}

                {/* Rest of your component */}
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput
                                type="email"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="password"
                                label="Password"
                                fullWidth
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton color="buttonBackgroundColor" textcolor="buttonTextColor" fullWidth onClick={submit} loading={authStore.loading}>
                                sign in
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
}

export default observer(Basic);