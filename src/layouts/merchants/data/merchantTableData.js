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
import MerchantActionMenu from "./MerchantActionMenu";
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

export const useMerchantTableData = () => {
    const { merchantStore } = useStore();

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
        const formatMerchantData = () => {
            const data = merchantStore.merchantData || [];
            return data.map((merchant) => ({
                user_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            {`${merchant?.user?.first_name || ''} ${merchant?.user?.middle_name || ''} ${merchant?.user?.last_name || ''}`.trim()}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {merchant?.user?.phone || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {merchant?.user?.nida || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular" sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            Status: {merchant?.user?.status == 1 ? "Activated" : "Deactivate" || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                contact_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {merchant?.user?.email || 'N/A'}
                        </MDTypography>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                {merchant?.user?.address || 'N/A'}
                            </MDTypography>
                        </MDBox>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                {merchant?.user?.nationality?.name || 'N/A'}
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                ),
                merchant_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            Name: {`${merchant?.name || ''}`.trim()}
                        </MDTypography>
                        <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                            <MDTypography variant="button" color="text" fontWeight="regular">
                                Address: {merchant?.address || 'N/A'}
                            </MDTypography>
                        </MDBox>
                        <MDTypography variant="button" color={merchant?.business_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: merchant?.business_cert ? 'pointer' : 'default', textDecoration: merchant?.business_cert ? 'underline' : 'none' }}
                            onClick={() => merchant?.business_cert && handleDownload(merchant?.business_cert, 'business_certificate.pdf')}>
                            Business Cert
                        </MDTypography>
                        <MDTypography variant="button" color={merchant?.brella_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: merchant?.brella_cert ? 'pointer' : 'default', textDecoration: merchant?.brella_cert ? 'underline' : 'none' }}
                            onClick={() => merchant?.brella_cert && handleDownload(merchant?.brella_cert, 'brella_certificate.pdf')}>
                            Brella Cert
                        </MDTypography>
                        <MDTypography variant="button" color={merchant?.tin_cert ? "info" : "text"} fontWeight="regular"
                            sx={{ cursor: merchant?.tin_cert ? 'pointer' : 'default', textDecoration: merchant?.tin_cert ? 'underline' : 'none' }}
                            onClick={() => merchant?.tin_cert && handleDownload(merchant?.tin_cert, 'tin_certificate.pdf')}>
                            TIN Cert
                        </MDTypography>
                    </MDBox>
                ),
                business_type: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Code: {merchant?.business_type?.code || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Name: {merchant?.business_type?.name || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                financials: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Balance: {merchant?.wallet?.balance || 0}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Deposits: {merchant?.transactions?.deposits || 0}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Withdraws: {merchant?.transactions?.withdraws || 0}
                        </MDTypography>
                    </MDBox>
                ),
                action: <MerchantActionMenu merchant={toJS(merchant)} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "User Info", accessor: "user_info", align: "left", },
            { Header: "Contact Info", accessor: "contact_info", align: "left", },
            { Header: "Merchant Info", accessor: "merchant_info", align: "left", },
            { Header: "Business Type", accessor: "business_type", align: "left", },
            { Header: "Financials", accessor: "financials", align: "left", },
            { Header: "Action", accessor: "action", align: "center" },
        ], []);

        return {
            columns,
            rows: formatMerchantData(),
            loading: merchantStore.loading,
        };
    });
};

export default useMerchantTableData;