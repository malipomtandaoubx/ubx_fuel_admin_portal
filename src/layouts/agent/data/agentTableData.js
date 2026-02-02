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
import AgentActionMenu from "./AgentActionMenu";
// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import { useObserver, } from 'mobx-react-lite';
import { toJS } from 'mobx'
import { useStore } from "context/MobxContext";
import { download_url } from "https/API";

export const useAgentTableData = () => {
    const { agentStore } = useStore();

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
        const formatAgentData = () => {
            const data = agentStore.agentData || [];
            return data.map((agent) => ({
                // MERGED COLUMN: Contact Info
                contact_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {`${agent?.user?.first_name || ''} ${agent?.user?.last_name || ''}`.trim()}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {agent?.user?.email || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {agent?.user?.phone || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),

                // MERGED COLUMN: Nida & Nationality
                nida_nationality: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            NIDA: {agent?.user?.nida || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Nationality: {agent?.user?.nationality || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),

                address: (
                    <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {agent?.user?.address || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),

                // MERGED COLUMN: Financials
                financials: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Balance: {agent?.wallet?.balance || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Deposits: {agent?.transactions?.deposits || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Withdraws: {agent?.transactions?.withdraws || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),

                // MERGED COLUMN: Documents
                documents: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color={agent?.business_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: agent?.business_cert ? 'pointer' : 'default', textDecoration: agent?.business_cert ? 'underline' : 'none' }}
                            onClick={() => agent?.business_cert && handleDownload(agent.business_cert, 'business_certificate.pdf')}>
                            Business Cert
                        </MDTypography>
                        <MDTypography variant="button" color={agent?.brella_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: agent?.brella_cert ? 'pointer' : 'default', textDecoration: agent?.brella_cert ? 'underline' : 'none' }}
                            onClick={() => agent?.brella_cert && handleDownload(agent.brella_cert, 'brella_certificate.pdf')}>
                            Brella Cert
                        </MDTypography>
                        <MDTypography variant="button" color={agent?.tin_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: agent?.tin_cert ? 'pointer' : 'default', textDecoration: agent?.tin_cert ? 'underline' : 'none' }}
                            onClick={() => agent?.tin_cert && handleDownload(agent.tin_cert, 'tin_certificate.pdf')}>
                            TIN Cert
                        </MDTypography>
                    </MDBox>
                ),

                action: <AgentActionMenu agent={toJS(agent)} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "User Info", accessor: "contact_info", align: "left", },
            { Header: "NIDA & Nationality", accessor: "nida_nationality", align: "left", },
            { Header: "Address", accessor: "address", align: "left" },
            { Header: "Financials", accessor: "financials", align: "left", },
            { Header: "Documents", accessor: "documents", align: "left", },
            { Header: "Action", accessor: "action", align: "center", },
        ], []);

        return {
            columns,
            rows: formatAgentData(),
            loading: agentStore.loading,
        };
    });
};

export default useAgentTableData;
