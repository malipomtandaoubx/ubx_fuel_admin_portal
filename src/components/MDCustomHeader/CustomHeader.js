/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const CustomHeader = ({
    title,
    subtitle,
    leftComponent,
    rightComponent,
    bgColor = "customHeaderBackground",
    color = "customHeaderText",
    variant = "gradient"
}) => {
    return (
        <MDBox variant={variant} bgColor={bgColor} borderRadius="lg" coloredShadow={bgColor} mx={2} mt={-3} p={2} sx={{ minHeight: 80, maxHeight: 100, display: "flex", alignItems: "center", }}>
            <MDBox display="flex" alignItems="center" justifyContent="space-between" width="100%">
                {/* Left Side Component */}
                <MDBox minWidth="50px" display="flex" justifyContent="flex-start">
                    {leftComponent || null}
                </MDBox>

                {/* Center Title & Subtitle */}
                <MDBox textAlign="center" flex={1}>
                    <MDTypography variant="h6" color="customHeaderText" noWrap>
                        {title}
                    </MDTypography>
                    {subtitle ? (
                        <MDTypography variant="button" color="customHeaderText" opacity={0.9} noWrap>
                            {subtitle}
                        </MDTypography>
                    ) : (
                        // Keeps vertical space consistent even if subtitle missing
                        <></>
                    )}
                </MDBox>

                {/* Right Side Component */}
                <MDBox minWidth="50px" display="flex" justifyContent="flex-end">
                    {rightComponent || null}
                </MDBox>
            </MDBox>
        </MDBox>
    );
};

CustomHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    leftComponent: PropTypes.node,
    rightComponent: PropTypes.node,
    bgColor: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.string,
};

CustomHeader.defaultProps = {
    subtitle: "",
    leftComponent: null,
    rightComponent: null,
    bgColor: "customHeaderBackground",
    color: "customHeaderText",
    variant: "gradient",
};

export default CustomHeader;
