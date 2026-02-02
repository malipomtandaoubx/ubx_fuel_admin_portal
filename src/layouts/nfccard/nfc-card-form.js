/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { observer } from "mobx-react-lite";
import { useStore } from "context/MobxContext";
import CustomHeader from "components/MDCustomHeader/CustomHeader";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const NfcCardForm = observer(() => {
    const navigate = useNavigate();
    const { cardStore, commonStore } = useStore();
    const location = useLocation();

    const nfcCardData = location.state?.nfcCardData || null;
    const isEdit = Boolean(nfcCardData);

    const [form, setForm] = useState({
        card_serial_number: "",
        card_uid: "",
        card_level: "",
        card_type: "",
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        // Fetch card levels and card types when component mounts
        cardStore.fetchCardLevel();
        cardStore.fetchCardType();

        if (isEdit && nfcCardData) {
            setForm({
                card_serial_number: nfcCardData.card_serial_number || "",
                card_uid: nfcCardData.card_uid || "",
                card_level: nfcCardData.card_level.id || "",
                card_type: nfcCardData.card_type.id || "",
            });
        }
    }, [nfcCardData, isEdit]);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation - all fields are required
        if (!form.card_serial_number || form.card_serial_number.trim() === "") {
            return showAlert("error", "Card Serial Number is required");
        }
        if (!form.card_uid || form.card_uid.trim() === "") {
            return showAlert("error", "Card UID is required");
        }
        if (!form.card_level) {
            return showAlert("error", "Card Level is required");
        }
        if (!form.card_type) {
            return showAlert("error", "Card Type is required");
        }

        try {
            // Prepare data for submission
            const submitData = {
                ...form,
                card_serial_number: form.card_serial_number.trim(),
                card_uid: form.card_uid.trim(),
            };

            if (isEdit) {
                await cardStore.updateNfcCard(nfcCardData.id, submitData);
                showAlert("success", "Card updated successfully!");
            } else {
                await cardStore.addNfcCard(submitData);
                showAlert("success", "Card added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/nfc-cards"), 1000);
        } catch (err) {
            const response = err?.response?.data;
            if (response?.errors) {
                const allErrors = [];
                for (const key in response.errors) {
                    allErrors.push(...response.errors[key]);
                }
                showAlert("error", allErrors.join(" | "));
            } else if (response?.message) {
                showAlert("error", response.message);
            } else {
                showAlert("error", isEdit ? "Failed to update card" : "Failed to add card");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/nfc-cards");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <CustomHeader
                                title={isEdit ? "Edit NFC Card" : "Add NFC Card"}
                                subtitle={isEdit ? "Update NFC card information" : "Fill out the details to add a new NFC card"}
                                leftComponent={
                                    <IconButton size="medium" color={"buttonBackgroundColor"} onClick={() => { navigate(-1) }}>
                                        <Icon>arrow_back</Icon>
                                    </IconButton>
                                }
                            />

                            {alert.show && (
                                <MDBox px={3} mt={4}>
                                    <MDAlert color={alert.type} dismissible onClose={() => setAlert({ show: false })}>
                                        <MDTypography variant="body2" color="white">
                                            {alert.message}
                                        </MDTypography>
                                    </MDAlert>
                                </MDBox>
                            )}

                            <MDBox pt={3} pb={3} px={3}>
                                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Card Serial Number *"
                                                name="card_serial_number"
                                                inputProps={{ maxLength: 30 }}
                                                value={form.card_serial_number}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Card UID *"
                                                name="card_uid"
                                                inputProps={{ maxLength: 30 }}
                                                value={form.card_uid}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Card Level *"
                                                name="card_level"
                                                value={form.card_level}
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiInputBase-root': { height: 45 },
                                                    '& .MuiInputLabel-root': {
                                                        lineHeight: '1.2em',
                                                        '&.Mui-focused': { lineHeight: '1.2em' }
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        height: '100%',
                                                        padding: '0 14px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    },
                                                    '& .MuiSelect-select': {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        height: '100% !important'
                                                    }
                                                }}
                                            >
                                                <MenuItem value="">Select Card Level</MenuItem>
                                                {cardStore?.cardLevelData?.map((level) => (
                                                    <MenuItem key={level.id} value={level.id}>
                                                        {level.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Card Type *"
                                                name="card_type"
                                                value={form.card_type}
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiInputBase-root': { height: 45 },
                                                    '& .MuiInputLabel-root': {
                                                        lineHeight: '1.2em',
                                                        '&.Mui-focused': { lineHeight: '1.2em' }
                                                    },
                                                    '& .MuiOutlinedInput-input': {
                                                        height: '100%',
                                                        padding: '0 14px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    },
                                                    '& .MuiSelect-select': {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        height: '100% !important'
                                                    }
                                                }}
                                            >
                                                <MenuItem value="">Select Card Type</MenuItem>
                                                {cardStore?.cardTypeData?.map((type) => (
                                                    <MenuItem key={type.id} value={type.id}>
                                                        {type.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                        <MDButton color="buttonBackgroundColor" textcolor="buttonTextColor" type="submit" loading={cardStore.loading} sx={{ px: 4 }}>
                                            {isEdit ? "Update NFC Card" : "Add NFC Card"}
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
});

export default NfcCardForm;