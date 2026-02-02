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
import PosDevicesActionMenu from "./posDevicesActionMenu";
// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import { useObserver } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";

export const posDevicesTableData = () => {
    const { posdevicesStore } = useStore();

    return useObserver(() => {
        const formatPosDevicesData = () => {
            const data = posdevicesStore.posDevicesData || [];
            return data.map((deviceData) => ({
                device_info: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            Id: {deviceData?.device_id || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Name: {deviceData?.device_name || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            Model: {deviceData?.device_model || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                serial_imei: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {deviceData?.serial_number || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {deviceData?.imei_number || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                manufacturer: (
                    <MDBox sx={{ maxWidth: 150, overflowWrap: 'break-word' }}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {deviceData?.manufacturer || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                exp_version: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {deviceData?.warranty_expiry_date || 'N/A'}
                        </MDTypography>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {deviceData?.software_version || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                action: <PosDevicesActionMenu deviceData={deviceData} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "Device Info", accessor: "device_info", align: "left" },
            { Header: "Serial & Imei", accessor: "serial_imei", align: "left" },
            { Header: "Manufacturer", accessor: "manufacturer", align: "left" },
            { Header: "Exp & Version", accessor: "exp_version", align: "left" },
            { Header: "Action", accessor: "action", align: "center" },
        ], []);

        return {
            columns,
            rows: formatPosDevicesData(),
            loading: posdevicesStore.loading,
        };
    });
};

export default posDevicesTableData;