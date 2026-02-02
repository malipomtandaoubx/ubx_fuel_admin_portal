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

export const useCorporateTableData = () => {
    const { corporateStore } = useStore();

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
        const formatCorporateData = () => {
            const data = corporateStore.corporateData || [];
            return data.map((corporate) => ({
                org_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            Name: {corporate?.organization_name || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular" sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            Address: {corporate?.organization_address || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular" sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            Reg Num: {corporate?.registration_number || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular" sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            Tin Num: {corporate?.tin_number || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular" sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            Status: {corporate?.admin_contact?.status == 1 ? "Activated" : "Deactivate" || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                admin_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Name: {`${corporate?.admin_contact?.first_name || ''} ${corporate?.admin_contact?.middle_name || ''} ${corporate?.admin_contact?.last_name || ''}`.trim()}
                        </MDTypography>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Email: {corporate?.admin_contact?.email || 'N/A'}
                            </MDTypography>
                        </MDBox>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Phone: {corporate?.admin_contact?.phone || 'N/A'}
                            </MDTypography>
                        </MDBox>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Address: {corporate?.admin_contact?.address || 'N/A'}
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                ),
                cert_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color={corporate?.business_license ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: corporate?.business_license ? 'pointer' : 'default', textDecoration: corporate?.business_license ? 'underline' : 'none' }}
                            onClick={() => corporate?.business_license && handleDownload(corporate?.business_license, 'brella_license.pdf')}>
                            Business License
                        </MDTypography>
                        <MDTypography variant="button" color={corporate?.brella_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: corporate?.brella_cert ? 'pointer' : 'default', textDecoration: corporate?.brella_cert ? 'underline' : 'none' }}
                            onClick={() => corporate?.brella_cert && handleDownload(corporate?.brella_cert, 'brella_certificate.pdf')}>
                            Brella Cert
                        </MDTypography>
                        <MDTypography variant="button" color={corporate?.tin_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: corporate?.tin_cert ? 'pointer' : 'default', textDecoration: corporate?.tin_cert ? 'underline' : 'none' }}
                            onClick={() => corporate?.tin_cert && handleDownload(corporate?.tin_cert, 'tin_certificate.pdf')}>
                            TIN Cert
                        </MDTypography>
                    </MDBox>
                ),
                business_type: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Code: {corporate?.business_type?.code || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Name: {corporate?.business_type?.name || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                financials: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Balance: {corporate?.wallet?.balance || 0}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Deposits: {corporate?.transactions?.deposits || 0}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Withdraws: {corporate?.transactions?.withdraws || 0}
                        </MDTypography>
                    </MDBox>
                ),
                action: <CorporateActionMenu corporate={toJS(corporate)} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "Organization Info", accessor: "org_info", align: "left", },
            { Header: "Admin Info", accessor: "admin_info", align: "left", },
            { Header: "Cert Info", accessor: "cert_info", align: "left", },
            { Header: "Business Type", accessor: "business_type", align: "left", },
            { Header: "Financials", accessor: "financials", align: "left", },
            { Header: "Action", accessor: "action", align: "center" },
        ], []);

        return {
            columns,
            rows: formatCorporateData(),
            loading: corporateStore.loading,
        };
    });
};

export default useCorporateTableData;