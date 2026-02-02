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
import { download_url } from "https/API";
import CustomHeader from "components/MDCustomHeader/CustomHeader";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

const BankDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const merchantData = location.state?.merchantData;

    if (!merchantData) {
        return (
            <MDBox p={3}>
                <MDTypography variant="h6" color="error">
                    No merchant data found!
                </MDTypography>
            </MDBox>
        );
    }

    const user = merchantData.user || {};
    const wallet = merchantData.wallet || {};
    const transactions = merchantData.transactions || {};
    const businessType = merchantData.business_type || {};

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CustomHeader
                                title={"Merchant Profile"}
                                leftComponent={
                                    <IconButton size="medium" color="white" onClick={() => navigate(-1)}>
                                        <Icon>arrow_back</Icon>
                                    </IconButton>
                                }
                            />

                            <MDBox p={3}>
                                <Grid container spacing={3}>
                                    {/* Left Profile Section */}
                                    <Grid item xs={12} md={3}>
                                        <MDBox
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                            textAlign="center"
                                        >
                                            <MDBox
                                                component="img"
                                                src={
                                                    user.photo
                                                        ? user.photo
                                                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                                }
                                                alt="Merchant"
                                                width={120}
                                                height={120}
                                                borderRadius="50%"
                                                mb={2}
                                                sx={{ objectFit: "cover", boxShadow: 2 }}
                                            />
                                            <MDTypography variant="button" fontWeight="medium">
                                                {`${user.first_name || ""} ${user.last_name || ""}`.trim()}
                                            </MDTypography>
                                            <MDTypography variant="button" color="text" fontWeight="medium">
                                                Merchant ID: {merchantData.merchant_id || "N/A"}
                                            </MDTypography>
                                            <MDTypography variant="button" color="text" fontWeight="medium">
                                                Business Type: {businessType.name || "N/A"}
                                            </MDTypography>
                                        </MDBox>
                                    </Grid>

                                    {/* Right Information Section */}
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={2}>
                                            {/* Personal Info */}
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Personal Information
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Email: {user.email || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Phone: {user.phone || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            NIDA: {user.nida || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Address: {user.address || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Nationality: {user.nationality?.name || "N/A"}
                                                        </MDTypography>
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>

                                            {/* Financial Info */}
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Financial Summary
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Balance: {wallet.balance || 0}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Deposits: {transactions.deposits || 0}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Withdrawals: {transactions.withdraws || 0}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Commissions: {transactions.commissions || 0}
                                                        </MDTypography>
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>

                                            {/* Business Info */}
                                            <Grid item xs={12}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Business Information
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Business Name: {merchantData.name || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Business Code: {businessType.code || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Address: {merchantData.address || "N/A"}
                                                        </MDTypography>
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>

                                            {/* Documents */}
                                            <Grid item xs={12}>
                                                <MDBox mt={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Documents
                                                    </MDTypography>
                                                    <MDBox display="flex" flexWrap="wrap" gap={3}>
                                                        {[
                                                            { label: "Business Certificate", link: merchantData.business_cert },
                                                            { label: "Brella Certificate", link: merchantData.brella_cert },
                                                            { label: "TIN Certificate", link: merchantData.tin_cert },
                                                        ].map((doc, index) => (
                                                            <MDTypography
                                                                key={index}
                                                                variant="button"
                                                                color={doc.link ? "info" : "text"}
                                                                fontWeight="medium"
                                                                sx={{
                                                                    textDecoration: doc.link ? "underline" : "none",
                                                                    cursor: doc.link ? "pointer" : "default",
                                                                }}
                                                                onClick={() =>
                                                                    doc.link &&
                                                                    window.open(
                                                                        doc.link.startsWith("http")
                                                                            ? doc.link
                                                                            : `${download_url.replace(/\/$/, "")}/${doc.link.replace(/^\//, "")}`,
                                                                        "_blank"
                                                                    )
                                                                }
                                                            >
                                                                {doc.label}
                                                            </MDTypography>
                                                        ))}
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

export default BankDetails;