/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Icon
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const ConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to perform this action?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "error",
    icon = "warning",
    loading = false
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <MDBox p={2}>
                <DialogTitle id="confirmation-dialog-title" sx={{ p: 0, textAlign: 'center' }}>
                    <MDBox display="flex" justifyContent="center" mb={2}>
                        <MDBox
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width={60}
                            height={60}
                            borderRadius="50%"
                            bgcolor={`${confirmColor}.light`}
                            sx={{ boxShadow: 2 }}
                        >
                            <Icon sx={{ fontSize: 30, color: `${confirmColor}.main` }}>
                                {icon}
                            </Icon>
                        </MDBox>
                    </MDBox>
                    <MDTypography variant="h5" fontWeight="bold" textAlign="center">
                        {title}
                    </MDTypography>
                </DialogTitle>

                <DialogContent sx={{ p: 0, mt: 2 }}>
                    <DialogContentText id="confirmation-dialog-description" align="center">
                        <MDTypography variant="body1" color="text">
                            {message}
                        </MDTypography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={{ p: 0, mt: 3, justifyContent: 'center', gap: 1 }}>
                    <MDButton onClick={onClose} color="error" disabled={loading}>
                        {cancelText}
                    </MDButton>
                    <MDButton onClick={onConfirm}  loading={loading} color="buttonBackgroundColor" textcolor="buttonTextColor">
                        {confirmText}
                    </MDButton>
                </DialogActions>
            </MDBox>
        </Dialog>
    );
};

export default ConfirmationDialog;