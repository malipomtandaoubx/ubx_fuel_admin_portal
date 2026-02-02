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
import TellerActionMenu from "./TellerActionMenu";
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

export const useTellerTableData = () => {
    const { tellerStore } = useStore();

    const handleDownload = (fileKey, fileName) => {
        if (!fileKey) return;
        const fileUrl = `${download_url}${fileKey}`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.target = '_blank';
        link.download = fileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return useObserver(() => {
        const formatTellerData = () => {
            const data = tellerStore.tellerData || [];
            return data.map((teller) => ({
                user_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            {`${teller?.user?.first_name || ''} ${teller?.user?.middle_name || ''} ${teller?.user?.last_name || ''}`.trim()}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {teller?.user?.email || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {teller?.user?.phone || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {teller?.user?.nida || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {teller?.user?.address || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {teller?.user?.nationality?.name || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                teller_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            Name: {`${teller?.name || ''}`.trim()}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Address: {teller?.address || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color={teller?.business_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: teller?.business_cert ? 'pointer' : 'default', textDecoration: teller?.business_cert ? 'underline' : 'none' }}
                            onClick={() => teller?.business_cert && handleDownload(teller?.business_cert, 'business_certificate.pdf')}>
                            Business Cert
                        </MDTypography>
                        <MDTypography variant="button" color={teller?.brella_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: teller?.brella_cert ? 'pointer' : 'default', textDecoration: teller?.brella_cert ? 'underline' : 'none' }}
                            onClick={() => teller?.brella_cert && handleDownload(teller?.brella_cert, 'brella_certificate.pdf')}>
                            Brella Cert
                        </MDTypography>
                        <MDTypography variant="button" color={teller?.tin_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: teller?.tin_cert ? 'pointer' : 'default', textDecoration: teller?.tin_cert ? 'underline' : 'none' }}
                            onClick={() => teller?.tin_cert && handleDownload(teller?.tin_cert, 'tin_certificate.pdf')}>
                            TIN Cert
                        </MDTypography>
                    </MDBox>
                ),
                business_type: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Code: {teller?.business_type?.code || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Name: {teller?.business_type?.name || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                financials: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Balance: {teller?.wallet?.balance || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Deposits: {teller?.transactions?.deposits || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Withdraws: {teller?.transactions?.withdraws || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                action: <TellerActionMenu teller={toJS(teller)} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "User Info", accessor: "user_info", align: "left", },
            { Header: "teller Info", accessor: "teller_info", align: "left", },
            { Header: "Business Type", accessor: "business_type", align: "left", },
            { Header: "Financials", accessor: "financials", align: "left", },
            { Header: "Action", accessor: "action", align: "center" },
        ], []);

        return {
            columns,
            rows: formatTellerData(),
            loading: tellerStore.loading,
        };
    });
};

export default useTellerTableData;