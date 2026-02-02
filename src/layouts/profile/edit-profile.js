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
import { useStore } from "context/MobxContext";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomHeader from "components/MDCustomHeader/CustomHeader";

function EditProfile() {
    const { authStore } = useStore();
    const navigate = useNavigate();
    const user = authStore.user;

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    });

    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || "",
                middleName: user.middleName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || ""
            });
        }
    }, [user]);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => {
            setAlert({ show: false, type: '', message: '' });
        }, 3000);
    };

    const handleCloseAlert = () => {
        setAlert({ show: false, type: '', message: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName.trim()) {
            showAlert("error", "First name is required");
            return;
        }

        if (!formData.lastName.trim()) {
            showAlert("error", "Last name is required");
            return;
        }

        if (!formData.email.trim()) {
            showAlert("error", "Email is required");
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            showAlert("error", "Please enter a valid email address");
            return;
        }

        if (!formData.phone.trim()) {
            showAlert("error", "Phone number is required");
            return;
        }

        if (!formData.address.trim()) {
            showAlert("error", "Address is required");
            return;
        }

        try {
            // await authStore.updateProfile({
            //     first_name: formData.firstName,
            //     middle_name: formData.middleName,
            //     last_name: formData.lastName,
            //     email: formData.email,
            //     phone: formData.phone,
            //     address: formData.address
            // });

            // if (authStore.error) {
            //     showAlert('error', authStore.error);
            // } else {
            //     showAlert("success", "Profile updated successfully!");
            //     setTimeout(() => {
            //         navigate('/profile');
            //     }, 1500);
            // }
        } catch (error) {
            showAlert('error', 'Failed to update profile');
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <MDBox mb={3}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} lg={10}>
                            <Card>
                                {/* <MDBox
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                    mx={2}
                                    mt={-3}
                                    textAlign="center"
                                >
                                    <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                                        Edit Profile
                                    </MDTypography>
                                    <MDTypography display="block" variant="button" color="white" my={1}>
                                        Update your personal information
                                    </MDTypography>
                                </MDBox>
                                 */}

                                <CustomHeader
                                    title={"Edit Profile"}
                                    subtitle={"Update your personal information"}
                                    leftComponent={
                                        <IconButton size="medium" color={"buttonBackgroundColor"} onClick={() => navigate(-1)}>
                                            <Icon>arrow_back</Icon>
                                        </IconButton>
                                    }
                                />

                                {/* Alert */}
                                {alert.show && (
                                    <MDBox px={3} mt={4}>
                                        <MDAlert color={alert.type} dismissible onClose={handleCloseAlert}>
                                            <MDTypography variant="body2" color="white">
                                                {alert.message}
                                            </MDTypography>
                                        </MDAlert>
                                    </MDBox>
                                )}

                                <MDBox pt={2} pb={3} px={3}>
                                    <MDBox component="form" role="form" onSubmit={handleSubmit}>
                                        <MDTypography variant="h6" fontWeight="medium" color="text" mb={2}>
                                            Personal Information
                                        </MDTypography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={4}>
                                                <MDBox mb={2}>
                                                    <MDInput
                                                        fullWidth
                                                        label="First Name"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                    />
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MDBox mb={2}>
                                                    <MDInput
                                                        fullWidth
                                                        label="Middle Name"
                                                        name="middleName"
                                                        value={formData.middleName}
                                                        onChange={handleInputChange}
                                                    />
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MDBox mb={2}>
                                                    <MDInput
                                                        fullWidth
                                                        label="Last Name"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </MDBox>
                                            </Grid>
                                        </Grid>

                                        <MDTypography variant="h6" fontWeight="medium" color="text" mt={2} mb={2}>
                                            Contact Information
                                        </MDTypography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDInput
                                                        fullWidth
                                                        type="email"
                                                        label="Email Address"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </MDBox>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDInput
                                                        fullWidth
                                                        label="Phone Number"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </MDBox>
                                            </Grid>
                                        </Grid>

                                        <MDTypography variant="h6" fontWeight="medium" color="text" mt={2} mb={2}>
                                            Address
                                        </MDTypography>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <MDBox mb={2}>
                                                    <MDInput
                                                        fullWidth
                                                        label="Full Address"
                                                        name="address"
                                                        multiline
                                                        rows={3}
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </MDBox>
                                            </Grid>
                                        </Grid>

                                        <MDBox mt={2} mb={1} display="flex" justifyContent="flex-end" gap={2}>
                                            <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>
                                                Cancel
                                            </MDButton>
                                            <MDButton color="buttonBackgroundColor" textcolor="buttonTextColor" type="submit" loading={authStore.loading} sx={{ px: 4 }}>
                                                Update Profile
                                            </MDButton>
                                        </MDBox>
                                    </MDBox>
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
        </DashboardLayout>
    );
}

export default observer(EditProfile);