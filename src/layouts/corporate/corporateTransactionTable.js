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

import { useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";

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
import useCorporateTransactionTableData from "layouts/corporate/data/corporateTransactionTableData";
import CustomHeader from "components/MDCustomHeader/CustomHeader";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

function corporateTransactionTable() {
    const { corporateStore } = useStore();
    const { columns, rows, loading } = useCorporateTransactionTableData();
    const navigate = useNavigate();
    const location = useLocation();
    const corporateData = location.state?.corporateData;

    useEffect(() => {
        corporateStore.fetchCorporateTransactionsData(corporateData?.id);
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <CustomHeader
                                title={"Corporate Transaction Table"}
                                leftComponent={
                                    <IconButton size="medium" color={"buttonBackgroundColor"} onClick={() => { navigate(-1) }}>
                                        <Icon>arrow_back</Icon>
                                    </IconButton>
                                }
                            />
                            <MDBox pt={3}>
                                {loading ? (
                                    <MDBox p={3} textAlign="center">
                                        <MDTypography variant="h6" color="text">
                                            Loading Corporate Transaction...
                                        </MDTypography>
                                    </MDBox>
                                ) : rows && rows.length > 0 ? (
                                    <>
                                        <DataTable
                                            table={{ columns, rows }}
                                            isSorted={true}
                                            entriesPerPage={true}
                                            showTotalEntries={true}
                                            canSearch={true}
                                        />
                                    </>
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

export default observer(corporateTransactionTable);