/* eslint-disable prettier/prettier */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const CustomerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const customerData = location.state?.customerData;

    if (!customerData) {
        return (
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox p={3}>
                    <MDTypography variant="h6" color="error">
                        No customer data found!
                    </MDTypography>
                </MDBox>
            </DashboardLayout>
        );
    }

    const {
        firstName,
        middleName,
        lastName,
        email,
        phone,
        nida,
        address,
        nationality,
        roles = [],
        wallet = {},
        transactions = {},
        photo,
    } = customerData;

    const roleTitle = roles[0]?.title || "N/A";
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox p={3}>
                {/* Back Button */}
                <MDBox display="flex" justifyContent="flex-start" mb={2}>
                    <MDButton
                        variant="gradient"
                        color="info"
                        onClick={() => navigate("/customers", { replace: true })}
                    >
                        Back
                    </MDButton>
                </MDBox>

                {/* Main Card */}
                <Card sx={{ p: 4, borderRadius: "xl", boxShadow: 4 }}>
                    <Grid container spacing={4} alignItems="center">
                        {/* Profile Section */}
                        <Grid item xs={12} md={3} display="flex" justifyContent="center">
                            <MDBox
                                component="img"
                                src={
                                    photo ||
                                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                }
                                alt="Customer"
                                width={140}
                                height={140}
                                borderRadius="50%"
                                sx={{ objectFit: "cover", boxShadow: 3 }}
                            />
                        </Grid>

                        {/* Basic Info */}
                        <Grid item xs={12} md={9}>
                            <MDTypography variant="h5" fontWeight="medium" mb={1}>
                                {fullName || "Unnamed Customer"}
                            </MDTypography>
                            <MDTypography variant="button" color="text" fontWeight="medium">
                                Role: {roleTitle}
                            </MDTypography>
                            <Divider sx={{ my: 2 }} />

                            <Grid container spacing={2}>
                                {/* Left Side Info */}
                                <Grid item xs={12} md={6}>
                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            Email: {email || "N/A"}
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            Phone: {phone || "N/A"}
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            NIDA: {nida || "N/A"}
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            Address: {address || "N/A"}
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            Nationality:{" "}
                                            {nationality?.name || "N/A"}
                                        </MDTypography>
                                    </MDBox>
                                </Grid>

                                {/* Right Side Info */}
                                <Grid item xs={12} md={6}>
                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            Wallet Balance: {wallet.balance || 0}
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            Total Deposits:{" "}
                                            {transactions.deposits || 0}
                                        </MDTypography>
                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                            Total Withdraws:{" "}
                                            {transactions.withdraws || 0}
                                        </MDTypography>
                                    </MDBox>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </MDBox>
        </DashboardLayout>
    );
};

export default CustomerDetails;
