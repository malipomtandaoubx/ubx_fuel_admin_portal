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
import CardLevelActionMenu from "./cardLevelActionMenu";
// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import { useObserver } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";

export const cardLevelTableData = () => {
    const { cardStore } = useStore();

    return useObserver(() => {
        const formatCardLevelData = () => {
            const data = cardStore.cardLevelData || [];
            return data.map((cardLevelData) => ({
                name: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" fontWeight="regular" color="text">
                            {cardLevelData?.name || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                description: (
                    <MDBox display="flex" flexDirection="column" gap={0.5}>
                        <MDTypography variant="button" color="text" fontWeight="regular">
                            {cardLevelData?.description || 'N/A'}
                        </MDTypography>
                    </MDBox>
                ),
                action: <CardLevelActionMenu cardLevelData={cardLevelData} />,
            }));
        };

        const columns = useMemo(() => [
            { Header: "Name", accessor: "name", align: "left" },
            { Header: "Description", accessor: "description", align: "left" },
            { Header: "Action", accessor: "action", align: "center" },
        ], []);

        return {
            columns,
            rows: formatCardLevelData(),
            loading: cardStore.loading,
        };
    });
};

export default cardLevelTableData;