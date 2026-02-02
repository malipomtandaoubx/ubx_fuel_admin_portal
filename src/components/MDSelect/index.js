/* eslint-disable prettier/prettier */
import { forwardRef } from "react";
import PropTypes from "prop-types";

// Import the styled root component
import MDSelectRoot from "./MDSelectRoot";

const MDSelect = forwardRef(({ error, success, disabled, children, ...rest }, ref) => {
  return (
    <MDSelectRoot
      {...rest}
      ref={ref}
      disabled={disabled}
      ownerState={{ error, success, disabled }}
    >
      {children}
    </MDSelectRoot>
  );
});

MDSelect.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

MDSelect.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDSelect;
