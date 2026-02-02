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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
    const { columns, rows } = authorsTableData();
    const { columns: pColumns, rows: pRows } = projectsTableData();

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                                <MDTypography variant="h6" color="white">
                                    Authors Table
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={true}
                                    entriesPerPage={true}
                                    showTotalEntries={true}
                                    canSearch={true}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                                <MDTypography variant="h6" color="white">
                                    Projects Table
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns: pColumns, rows: pRows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

            <MDBox mt={2} textAlign="center">
                <MDBox display="flex">
                    <MDBox mr={1.5}>
                        <MDButton color="white">
                            <MDTypography variant="h6" color="dark">White</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="primary">
                            <MDTypography variant="h6" color="dark">Primary</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="secondary">
                            <MDTypography variant="h6" color="dark">Secondary</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="info">
                            <MDTypography variant="h6" color="white">Info</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="success">
                            <MDTypography variant="h6" color="dark">Success</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="warning">
                            <MDTypography variant="h6" color="white">Warning</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="error">
                            <MDTypography variant="h6" color="dark">Error</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="dark">
                            <MDTypography variant="h6" color="white">Dark</MDTypography>
                        </MDButton>
                    </MDBox>
                    <MDBox mr={1.5}>
                        <MDButton color="light">
                            <MDTypography variant="h6" color="dark">Light</MDTypography>
                        </MDButton>
                    </MDBox>
                </MDBox>
            </MDBox>

            {/* <Footer /> */}
        </DashboardLayout>
    );
}

export default Tables;
