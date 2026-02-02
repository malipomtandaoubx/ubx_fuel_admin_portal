/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import roleTableData from "layouts/roles/data/roleTableData";
import CustomHeader from "components/MDCustomHeader/CustomHeader";

function RoleDevices() {
    const { roleStore } = useStore();
    const { columns, rows, loading } = roleTableData();
    const navigate = useNavigate();

    useEffect(() => {
        roleStore.fetchRoles();
    }, []);

    const handleCloseError = () => {
        roleStore.error = null;
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CustomHeader
                                title={"Roles Table"}
                                rightComponent={
                                    <MDButton color="custom" onClick={() => { navigate('/add-role') }}>
                                        <MDTypography variant="h6" color="buttonTextColor">Add Roles</MDTypography>
                                    </MDButton>
                                }
                            />
                            
                            {/* Error Alert */}
                            {roleStore.error && (
                                <MDBox px={3} pt={3}>
                                    <MDAlert color="error" dismissible onClose={handleCloseError}>
                                        <MDTypography variant="body2" color="white">
                                            {roleStore.error.message || "An error occurred"}
                                        </MDTypography>
                                    </MDAlert>
                                </MDBox>
                            )}

                            <MDBox pt={3}>
                                {loading ? (
                                    <MDBox p={3} textAlign="center">
                                        <MDTypography variant="h6" color="text">
                                            Loading Roles...
                                        </MDTypography>
                                    </MDBox>
                                ) : rows && rows.length > 0 ? (
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={true}
                                        entriesPerPage={true}
                                        showTotalEntries={true}
                                        canSearch={true}
                                    />
                                ) : (
                                    <MDBox p={3} textAlign="center">
                                        <MDTypography variant="h6" color="text">
                                            No data found
                                        </MDTypography>
                                    </MDBox>
                                )}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default observer(RoleDevices);