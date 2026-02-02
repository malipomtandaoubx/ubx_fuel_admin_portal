/* eslint-disable prettier/prettier */
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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, disabled, type, select, ...rest }, ref) => {
    // Automatically keep label floated for file inputs
    const inputProps =
        type === "file" || select
            ? {
                InputLabelProps: { shrink: true },
            }
            : {};

    return (
        <MDInputRoot
            {...rest}
            {...inputProps}
            ref={ref}
            type={type}
            ownerState={{ error, success, disabled }}
        />
    );
});

MDInput.defaultProps = {
    error: false,
    success: false,
    disabled: false,
    type: "text",
    select: false
};

MDInput.propTypes = {
    error: PropTypes.bool,
    success: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    select: false
};

export default MDInput;