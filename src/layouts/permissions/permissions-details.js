/* eslint-disable prettier/prettier */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CustomHeader from "components/MDCustomHeader/CustomHeader";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

const PermissionDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const deviceData = location.state?.deviceData;

    if (!deviceData) {
        return (
            <MDBox p={3}>
                <MDTypography variant="h6" color="error">
                    No device data found!
                </MDTypography>
            </MDBox>
        );
    }

    const formatDateTime = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);

        // Format: YYYY-MM-DD HH:MM:SS
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);

        // Format: YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CustomHeader
                                title={"Role Details"}
                                leftComponent={
                                    <IconButton size="medium" color="white" onClick={() => navigate(-1)}>
                                        <Icon>arrow_back</Icon>
                                    </IconButton>
                                }
                            />

                            <MDBox p={3}>
                                <Grid container spacing={3}>
                                    {/* Left Device Icon Section */}
                                    <Grid item xs={12} md={3}>
                                        <MDBox
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            textAlign="center"
                                        >
                                            <MDBox
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                width={120}
                                                height={120}
                                                borderRadius="50%"
                                                bgcolor="primary.main"
                                                mb={2}
                                                sx={{ boxShadow: 2 }}
                                            >
                                                <Icon sx={{ fontSize: 60, color: "white" }}>
                                                    point_of_sale
                                                </Icon>
                                            </MDBox>
                                            <MDTypography variant="h6" fontWeight="bold" gutterBottom>
                                                {deviceData.device_name || "N/A"}
                                            </MDTypography>
                                            <MDTypography variant="button" color="text" fontWeight="medium">
                                                Device ID: {deviceData.device_id || "N/A"}
                                            </MDTypography>
                                            <MDTypography variant="button" color="text" fontWeight="medium">
                                                Model: {deviceData.device_model || "N/A"}
                                            </MDTypography>
                                        </MDBox>
                                    </Grid>

                                    {/* Right Information Section */}
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={2}>
                                            {/* Device Basic Information */}
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Device Information
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Device Name: {deviceData.device_name || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Device Model: {deviceData.device_model || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Manufacturer: {deviceData.manufacturer || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Serial Number: {deviceData.serial_number || "N/A"}
                                                        </MDTypography>
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>

                                            {/* Technical Specifications */}
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Technical Specifications
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            IMEI Number: {deviceData.imei_number || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Software Version: {deviceData.software_version || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            App Version: {deviceData.app_version || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Warranty Expiry: {formatDate(deviceData.warranty_expiry_date)}
                                                        </MDTypography>
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>

                                            {/* Additional Information */}
                                            <Grid item xs={12}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Additional Information
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Created At: {formatDateTime(deviceData.created_at)}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Updated At: {formatDateTime(deviceData.updated_at)}
                                                        </MDTypography>
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
};

export default PermissionDetails;