/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDButton
import MDButtonRoot from "components/MDButton/MDButtonRoot";

// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

import CircularProgress from "@mui/material/CircularProgress";

const MDButton = forwardRef(({ color, variant, size, circular, iconOnly, loading = false, disabled, children, textcolor, ...rest }, ref) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    return (
        <MDButtonRoot {...rest} ref={ref} disabled={loading || disabled} color="primary" variant={variant === "gradient" ? "contained" : variant} size={size} ownerState={{ color, variant, size, circular, iconOnly, darkMode, loading, textcolor }}>
            {loading ? (
                <CircularProgress
                    size={size === "small" ? 16 : size === "large" ? 24 : 20}
                    color="inherit"
                    sx={{
                        mr: 1,
                        color: 'inherit'
                    }}
                />
            ) : null}
            {children}
        </MDButtonRoot>
    );
}
);

// Setting default values for the props of MDButton
MDButton.defaultProps = {
    size: "medium",
    variant: "contained",
    color: "white",
    circular: false,
    iconOnly: false,
    loading: false,
    disabled: false,
    textcolor: "white",
};

// Typechecking props for the MDButton
MDButton.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
    color: PropTypes.oneOf([
        "white",
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
        "custom"
    ]),
    circular: PropTypes.bool,
    iconOnly: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    textcolor: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default MDButton;
