/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
// import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import CustomersActionMenu from "./customersActionMenu";
// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import { useObserver } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";
import { toJS } from "mobx";

export const useCustomersTableData = () => {
    const { customerStore } = useStore();

    return useObserver(() => {
        const formatCustomersData = () => {
            const data = customerStore.customersData || [];

            return data.map((customer) => ({
                contact_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {`${customer.firstName || ''} ${customer.middleName || ''} ${customer.lastName || ''}`.trim()}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {customer.email || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {customer.phone || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                nida_nationality: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {customer.nida || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {customer.nationality?.name || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                address: (
                    <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {customer.address || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                financials: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Balance: {customer.wallet?.balance || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Deposits: {customer.transactions?.deposits || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Withdraws: {customer.transactions?.withdraws || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                action: <CustomersActionMenu customer={toJS(customer)} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "User Info", accessor: "contact_info", align: "left", },
            { Header: "NIDA & Nationality", accessor: "nida_nationality", align: "left", },
            { Header: "Address", accessor: "address", align: "left" },
            { Header: "Financials", accessor: "financials", align: "left", },
            { Header: "Action", accessor: "action", align: "center" },
        ], []);

        return {
            columns,
            rows: formatCustomersData(),
            loading: customerStore.loading,
        };
    });
};

export default useCustomersTableData;