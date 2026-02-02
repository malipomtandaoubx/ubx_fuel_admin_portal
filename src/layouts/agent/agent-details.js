/* eslint-disable prettier/prettier */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { download_url } from "https/API";
import CustomHeader from "components/MDCustomHeader/CustomHeader";
import IconButton from "@mui/material/IconButton";

const AgentDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const agentData = location.state?.agentData;

    if (!agentData) {
        return (
            <MDBox p={3}>
                <MDTypography variant="h6" color="error">
                    No agent data found!
                </MDTypography>
            </MDBox>
        );
    }

    const user = agentData.user || {};
    const wallet = agentData.wallet || {};
    const transactions = agentData.transactions || {};

    const handleEdit = () => {
        navigate("/edit-agent", { state: { agentData } });
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CustomHeader
                                title={"Agents Details"}
                                leftComponent={
                                    <IconButton size="medium" color="white" onClick={() => navigate(-1)}>
                                        <Icon>arrow_back</Icon>
                                    </IconButton>
                                }
                            />
                            {/* Agent Card */}
                            <MDBox p={3}>
                                <Grid container spacing={3}>
                                    {/* Profile Section */}
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
                                                alt="Agent"
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
                                                Agent Code: {agentData.agent_code || "N/A"}
                                            </MDTypography>
                                        </MDBox>
                                    </Grid>

                                    {/* Information Section */}
                                    <Grid item xs={12} md={9}>
                                        <Grid container spacing={2}>
                                            {/* Personal Info */}
                                            <Grid item xs={12} md={6} >
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
                                                            Nationality: {user.nationality || "N/A"}
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
                                                            Withdraws: {transactions.withdraws || 0}
                                                        </MDTypography>
                                                        <MDTypography variant="button" color="text" fontWeight="medium">
                                                            Commissions: {transactions.commissions || 0}
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
                                                            { label: "Business Cert", link: agentData.business_cert },
                                                            { label: "Brella Cert", link: agentData.brella_cert },
                                                            { label: "TIN Cert", link: agentData.tin_cert },
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
        </DashboardLayout >
    );
};

export default AgentDetails;
