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
import NfcCardActionMenu from "./nfcCardActionMenu";
// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import { useObserver } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";

export const nfcCardTableData = () => {
    const { cardStore } = useStore();

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
        const formatNfcCardData = () => {
            const data = cardStore.nfcCardData || [];
            return data.map((nfcCardData) => ({
                card_serial_number: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            {nfcCardData?.card_serial_number || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                card_uid: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {nfcCardData?.card_uid || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                card_level: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Name: {nfcCardData?.card_level?.name || 'N/A'}
                            </MDTypography>
                        </MDBox>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Code: {nfcCardData?.card_level?.code || 'N/A'}
                        </MDTypography>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Description: {nfcCardData?.card_level?.description || 'N/A'}
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                ),
                card_type: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Name: {nfcCardData?.card_type?.name || 'N/A'}
                            </MDTypography>
                        </MDBox>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Description: {nfcCardData?.card_type?.description || 'N/A'}
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                ),
                linked_status: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {nfcCardData?.linked_status == 0 ? 'False' : 'True' || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                created_at: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {formatDateTime(nfcCardData?.created_at) || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                action: <NfcCardActionMenu nfcCardData={nfcCardData} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "Card Srial Number", accessor: "card_serial_number", align: "left" },
            { Header: "Card UID", accessor: "card_uid", align: "left" },
            { Header: "Card Level", accessor: "card_level", align: "left" },
            { Header: "Card Type", accessor: "card_type", align: "left" },
            { Header: "Linked Status", accessor: "linked_status", align: "left" },
            { Header: "Created At", accessor: "created_at", align: "left" },
            { Header: "Action", accessor: "action", align: "center" },
        ], []);

        return {
            columns,
            rows: formatNfcCardData(),
            loading: cardStore.loading,
        };
    });
};

export default nfcCardTableData;