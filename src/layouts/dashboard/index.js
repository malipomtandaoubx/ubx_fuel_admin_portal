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
import { useState, useEffect, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { observer } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";

function Dashboard() {
    const { sales, tasks } = reportsLineChartData;
    const { authStore, homeStore } = useStore();
    const dashBoardData = homeStore.dashBoardData;

    useEffect(() => {
        homeStore.getDashboardData()
    }, [])

    // Prepare chart data from store data
    const chartData = useMemo(() => {
        if (!dashBoardData?.graph?.transactions) {
            return {
                withdraws: tasks,
                deposits: sales
            };
        }

        const { withdraws, deposits } = dashBoardData.graph.transactions;

        // Extract labels (keys) and data (values) from withdraws and deposits
        const labels = Object.keys(withdraws || {}).map(key => {
            // You can customize the label formatting as needed
            return `Day ${key}`;
        });

        const withdrawsData = Object.values(withdraws || {});
        const depositsData = Object.values(deposits || {});

        return {
            withdraws: {
                labels: labels.length > 0 ? labels : tasks.labels,
                datasets: {
                    label: "Withdraws",
                    data: withdrawsData.length > 0 ? withdrawsData : tasks.datasets.data
                },
            },
            deposits: {
                labels: labels.length > 0 ? labels : sales.labels,
                datasets: {
                    label: "Deposits",
                    data: depositsData.length > 0 ? depositsData : sales.datasets.data
                },
            }
        };
    }, [dashBoardData, sales, tasks]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard color="dark" icon="storefront" title="Merchants" count={dashBoardData?.merchants || 0} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard icon="badge" title="Agents" count={dashBoardData?.agents || 0} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard color="success" icon="groups" title="Customers" count={dashBoardData?.customers || 0} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard color="primary" icon="security" title="Super Admin" count={dashBoardData?.superAdmin || 0} />
                        </MDBox>
                    </Grid>
                </Grid>
                <Grid container spacing={3} mt={0}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard color="dark" icon="credit_card" title="Allocated Cards" count={dashBoardData?.allocatedCards || 0} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard icon="inventory_2" title="Card Stock" count={dashBoardData?.cardStock || 0} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard color="success" icon="point_of_sale" title="POS Stock" count={dashBoardData?.posStock || 0} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard color="primary" icon="assignment_turned_in" title="Allocated POS" count={dashBoardData?.allocatedPos || 0} />
                        </MDBox>
                    </Grid>
                </Grid>
                <Grid container spacing={3} mt={0}>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard color="dark" icon="account_balance_wallet" title="Deposit" count={dashBoardData?.graph?.transactions?.depositChannels?.[0]?.total || 0} />
                        </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard icon="payments" title="Withdraw" count={dashBoardData?.graph?.transactions?.withdrawChannels?.[0]?.total || 0} />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart color="info" title="website views" description="Last Campaign Performance" date="campaign sent 2 days ago" chart={reportsBarChartData} />
                            </MDBox>
                        </Grid> */}
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="success" title="Withdraws"
                                    description={
                                        <>
                                            Showing the withdraws
                                        </>
                                    }
                                    date="Just updated"
                                    chart={chartData.withdraws}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart color="dark" title="Deposits" description="Showing the deposits" date="Just updated" chart={chartData.deposits} />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
                {/* <MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={8}>
                            <Projects />
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <OrdersOverview />
                        </Grid>
                    </Grid>
                </MDBox> */}
            </MDBox>
        </DashboardLayout>
    );
}

export default observer(Dashboard);
