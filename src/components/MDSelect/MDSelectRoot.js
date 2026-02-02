/* eslint-disable prettier/prettier */
import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export default styled(Select)(({ theme, ownerState }) => {
    const { palette, functions } = theme;
    const { error, success, disabled } = ownerState;

    const { grey, transparent, error: colorError, success: colorSuccess } = palette;
    const { pxToRem } = functions;

    const errorStyles = () => ({
        borderColor: colorError.main,
        color: colorError.main,
    });

    const successStyles = () => ({
        borderColor: colorSuccess.main,
        color: colorSuccess.main,
    });

    return {
        backgroundColor: disabled ? `${grey[200]} !important` : transparent.main,
        pointerEvents: disabled ? "none" : "auto",
        padding: `${pxToRem(10)} ${pxToRem(14)}`,
        borderRadius: pxToRem(8),
        border: `1px solid ${grey[400]}`,
        "&:focus": {
            borderColor: error ? colorError.main : success ? colorSuccess.main : palette.primary.main,
        },
        ...(error && errorStyles()),
        ...(success && successStyles()),
    };
});
