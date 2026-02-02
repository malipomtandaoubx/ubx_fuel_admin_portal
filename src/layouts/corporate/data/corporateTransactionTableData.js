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
import CorporateActionMenu from "./CorporateActionMenu";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import { useObserver } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";
import { download_url } from "https/API";
import { toJS } from "mobx";

export const useCorporateTransactionTableData = () => {
    const { corporateStore } = useStore();

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

    return useObserver(() => {
        const formatCorporateTransactionTableData = () => {
            const data = corporateStore?.corporateTransactionData || [];
            return data.map((transaction) => ({
                transaction_id: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            {transaction?.transaction_id || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                amount: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {transaction?.amount || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                remarks: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                {transaction?.remarks || 'N/A'}
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                ),
                deposit_fee: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {transaction?.deposit_fee || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                withdraw_fee: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {transaction?.withdraw_fee || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                created_at: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {formatDateTime(transaction?.created_at) || 'N/A'}
                        </MDTypography>
                    </MDBox>
                )
            }));
        };

        const columns = useMemo(() => [
            { Header: "Transaction Id", accessor: "transaction_id", align: "left", },
            { Header: "Amount", accessor: "amount", align: "left", },
            { Header: "Remarks", accessor: "remarks", align: "left", },
            { Header: "Deposit Fees", accessor: "deposit_fee", align: "left", },
            { Header: "Withdraw Fees", accessor: "withdraw_fee", align: "left", },
            { Header: "Created At", accessor: "created_at", align: "left", }
        ], []);

        return {
            columns,
            rows: formatCorporateTransactionTableData(),
            loading: corporateStore.loading,
        };
    });
};

export default useCorporateTransactionTableData;