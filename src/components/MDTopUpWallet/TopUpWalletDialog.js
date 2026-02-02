/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

const TopUpWalletDialog = ({ open, onClose, onConfirm, corporateName = "", loading = false }) => {
    const [amount, setAmount] = useState("");
    const [remarks, setRemarks] = useState("");
    const [amountError, setAmountError] = useState("");

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);

        // Basic validation
        if (value && (isNaN(value) || value <= 0)) {
            setAmountError("Please enter a valid positive amount");
        } else {
            setAmountError("");
        }
    };

    const handleRemarksChange = (e) => {
        setRemarks(e.target.value);
    };

    const handleSubmit = () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setAmountError("Please enter a valid positive amount");
            return;
        }
        onConfirm(amount, remarks);
    };

    const handleClose = () => {
        setAmount("");
        setRemarks("");
        setAmountError("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="topup-dialog-title" aria-describedby="topup-dialog-description" maxWidth="sm" fullWidth>
            <MDBox p={2}>
                <DialogTitle id="topup-dialog-title" sx={{ p: 0, textAlign: 'center' }}>
                    <MDBox display="flex" justifyContent="center" mb={2}>
                        <MDBox display="flex" alignItems="center" justifyContent="center" width={60} height={60} borderRadius="50%" bgcolor="info.light" sx={{ boxShadow: 2 }}>
                            <Icon sx={{ fontSize: 30, color: "info.main" }}>
                                account_balance_wallet
                            </Icon>
                        </MDBox>
                    </MDBox>
                    <MDTypography variant="h5" fontWeight="bold" textAlign="center">
                        Top Up Wallet
                    </MDTypography>
                </DialogTitle>

                <DialogContent sx={{ p: 0, mt: 2 }}>
                    <MDTypography variant="body2" color="text" textAlign="center" mb={2}>
                        Enter the amount to top up for{" "}
                        <MDTypography component="span" variant="body2" fontWeight="bold">
                            {corporateName}
                        </MDTypography>
                    </MDTypography>

                    <TextField autoFocus fullWidth label="Amount" type="number" value={amount} onChange={handleAmountChange} error={!!amountError} helperText={amountError} placeholder="Enter amount" inputProps={{ min: "0", step: "0.01" }} sx={{ mt: 1, mb: 2 }} />

                    <TextField fullWidth label="Remarks" value={remarks} onChange={handleRemarksChange} inputProps={{ maxLength: 250 }} placeholder="Enter remarks (optional)" multiline rows={3} />
                </DialogContent>

                <DialogActions sx={{ p: 0, mt: 3, justifyContent: 'center', gap: 1 }}>
                    <MDButton onClick={handleClose} color="error" disabled={loading}>
                        Cancel
                    </MDButton>
                    <MDButton onClick={handleSubmit} color="buttonBackgroundColor" textcolor="buttonTextColor" loading={loading} disabled={!amount || !!amountError}>
                        Top Up
                    </MDButton>
                </DialogActions>
            </MDBox>
        </Dialog>
    );
};

export default TopUpWalletDialog;