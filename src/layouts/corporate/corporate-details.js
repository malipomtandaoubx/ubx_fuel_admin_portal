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

const CorporateDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const corporateData = location.state?.corporateData;

    if (!corporateData) {
        return (
            <MDBox p={3}>
                <MDTypography variant="h6" color="error">
                    No corporate data found!
                </MDTypography>
            </MDBox>
        );
    }

    const adminContact = corporateData.admin_contact || {};
    const wallet = corporateData.wallet || {};
    const transactions = corporateData.transactions || {};
    const businessType = corporateData.business_type || {};

    // Alternative method using img tag for base64
    const renderQRCodeAsImage = () => {
        if (!corporateData.qr_code) {
            return (
                <MDTypography variant="button" color="text" fontWeight="medium">
                    No QR Code Available
                </MDTypography>
            );
        }

        return (
            <MDBox
                component="img"
                src={`data:image/svg+xml;base64,${corporateData.qr_code}`}
                alt="QR Code"
                sx={{
                    width: 150,
                    height: 150,
                    objectFit: 'contain',
                    border: '1px solid #e0e0e0',
                    borderRadius: 1
                }}
            />
        );
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CustomHeader
                                title={"Corporate Profile"}
                                leftComponent={
                                    <IconButton size="medium" color="customHeaderText" onClick={() => navigate(-1)}>
                                        <Icon>arrow_back</Icon>
                                    </IconButton>
                                }
                            />

                            <MDBox p={3}>
                                <Grid container spacing={3}>
                                    {/* Left Profile Section */}
                                    <Grid item xs={12} md={3}>
                                        <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                            <MDBox
                                                component="img"
                                                src={
                                                    adminContact.photo
                                                        ? adminContact.photo
                                                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                                }
                                                alt="Corporate"
                                                width={120}
                                                height={120}
                                                borderRadius="50%"
                                                mb={2}
                                                sx={{ objectFit: "cover", boxShadow: 2 }}
                                            />

                                            <MDTypography variant="h6" fontWeight="medium">
                                                {`${adminContact.first_name || ""} ${adminContact.last_name || ""}`.trim()}
                                            </MDTypography>

                                            <MDTypography variant="button" color="text" fontWeight="medium">
                                                Corporate ID: {corporateData.corporate_id || "N/A"}
                                            </MDTypography>

                                            <MDTypography variant="button" color="text" fontWeight="medium">
                                                Business Type: {businessType.name || "N/A"}
                                            </MDTypography>

                                            {/* QR Code Section */}
                                            <MDBox mt={3}>
                                                <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                    QR Code
                                                </MDTypography>
                                                {renderQRCodeAsImage()}
                                            </MDBox>
                                        </MDBox>
                                    </Grid>

                                    {/* Right Information Section */}
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={2}>
                                            {/* Corporate Info */}
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Corporate Information
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Organization Name: {corporateData.organization_name || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Registration Number: {corporateData.registration_number || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            TIN Number: {corporateData.tin_number || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Address: {corporateData.organization_address}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Created At: {new Date(corporateData.created_at).toLocaleDateString()}
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
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>

                                            {/* Admin Contact Information */}
                                            <Grid item xs={12} md={6}>
                                                <MDBox mb={2}>
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Admin Contact Information
                                                    </MDTypography>
                                                    <MDBox display="flex" flexDirection="column" gap={1}>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Email: {adminContact.email || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Phone: {adminContact.phone || "N/A"}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Address: {adminContact.address || "N/A"}
                                                        </MDTypography>
                                                    </MDBox>
                                                </MDBox>
                                            </Grid>

                                            {/* Documents */}
                                            <Grid item xs={12}>
                                                <MDBox >
                                                    <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                                                        Documents
                                                    </MDTypography>
                                                    <MDBox display="flex" flexWrap="wrap" gap={3}>
                                                        {[
                                                            {
                                                                label: "Business License",
                                                                link: corporateData.business_license,
                                                                available: !!corporateData.business_license
                                                            },
                                                            {
                                                                label: "Brella Certificate",
                                                                link: corporateData.brella_cert,
                                                                available: !!corporateData.brella_cert
                                                            },
                                                            {
                                                                label: "TIN Certificate",
                                                                link: corporateData.tin_cert,
                                                                available: !!corporateData.tin_cert
                                                            },
                                                        ].map((doc, index) => (
                                                            <MDBox key={index} display="flex" flexDirection="column" alignItems="center">
                                                                <MDTypography
                                                                    variant="button"
                                                                    color={doc.available ? "info" : "text"}
                                                                    fontWeight="medium"
                                                                    sx={{
                                                                        textDecoration: doc.available ? "underline" : "none",
                                                                        cursor: doc.available ? "pointer" : "default",
                                                                    }}
                                                                    onClick={() =>
                                                                        doc.available &&
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
                                                                {!doc.available && (
                                                                    <MDTypography variant="caption" color="textSecondary">
                                                                        Not Available
                                                                    </MDTypography>
                                                                )}
                                                            </MDBox>
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

export default CorporateDetails;