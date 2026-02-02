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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const PosForm = observer(() => {
    const navigate = useNavigate();
    const { posdevicesStore } = useStore();
    const location = useLocation();

    const deviceData = location.state?.deviceData || null;
    const isEdit = Boolean(deviceData);

    const [form, setForm] = useState({
        device_name: "",
        device_model: "",
        serial_number: "",
        imei_number: "",
        manufacturer: "",
        warranty_expiry_date: null,
        software_version: "",
        app_version: "",
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        if (isEdit && deviceData) {
            setForm({
                device_name: deviceData.device_name || "",
                device_model: deviceData.device_model || "",
                serial_number: deviceData.serial_number || "",
                imei_number: deviceData.imei_number || "",
                manufacturer: deviceData.manufacturer || "",
                warranty_expiry_date: deviceData.warranty_expiry_date ? new Date(deviceData.warranty_expiry_date) : null,
                software_version: deviceData.software_version || "",
                app_version: deviceData.app_version || "",
            });
        }
    }, [deviceData, isEdit]);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleDateChange = (date) => {
        setForm({ ...form, warranty_expiry_date: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation - all fields required except warranty_expiry_date and app_version
        const requiredFields = [
            "device_name",
            "device_model",
            "serial_number",
            "imei_number",
            "manufacturer",
            "software_version",
        ];

        for (const field of requiredFields) {
            if (!form[field] || form[field].toString().trim() === "") {
                return showAlert(
                    "error",
                    `${field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())} is required`
                );
            }
        }

        try {
            // Prepare data for submission
            const submitData = {
                ...form,
                warranty_expiry_date: form.warranty_expiry_date ? form.warranty_expiry_date.toISOString().split('T')[0] : "",
            };

            if (isEdit) {
                await posdevicesStore.updatePosDevices(deviceData.id, submitData);
                showAlert("success", "POS device updated successfully!");
            } else {
                await posdevicesStore.addPosDevices(submitData);
                showAlert("success", "POS Device added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/pos-devices"), 1000);
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
                showAlert("error", isEdit ? "Failed to update POS device" : "Failed to add POS device");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/pos-devices");

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox py={3}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} lg={10}>
                            <Card>
                                <CustomHeader
                                    title={isEdit ? "Edit POS Device" : "Add POS Device"}
                                    subtitle={isEdit ? "Update POS details" : "Fill out the details to add a new POS device"}
                                    leftComponent={
                                        <IconButton size="medium" color={"white"} onClick={() => { navigate(-1) }}>
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
                                                    label="Device Name*"
                                                    name="device_name"
                                                    inputProps={{ maxLength: 50 }}
                                                    value={form.device_name}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Device Model*"
                                                    name="device_model"
                                                    inputProps={{ maxLength: 20 }}
                                                    value={form.device_model}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Serial Number*"
                                                    name="serial_number"
                                                    inputProps={{ maxLength: 30 }}
                                                    value={form.serial_number}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="IMEI Number*"
                                                    name="imei_number"
                                                    inputProps={{ maxLength: 30 }}
                                                    value={form.imei_number}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Manufacturer*"
                                                    name="manufacturer"
                                                    inputProps={{ maxLength: 100 }}
                                                    value={form.manufacturer}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDBox sx={{ position: 'relative' }}>
                                                    <DatePicker
                                                        label="Warranty Expiry Date"
                                                        value={form.warranty_expiry_date}
                                                        onChange={handleDateChange}
                                                        minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                                        slotProps={{
                                                            textField: {
                                                                fullWidth: true,
                                                                variant: "outlined",
                                                            },
                                                            popper: {
                                                                placement: 'bottom-start',
                                                                disablePortal: true,
                                                                modifiers: [
                                                                    {
                                                                        name: 'flip',
                                                                        enabled: false,
                                                                    },
                                                                    {
                                                                        name: 'preventOverflow',
                                                                        enabled: true,
                                                                        options: {
                                                                            boundary: 'clippingParents',
                                                                            altBoundary: true,
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                            desktopPaper: {
                                                                sx: {
                                                                    '& .MuiPickersDay-root': {
                                                                        '&.Mui-selected': {
                                                                            backgroundColor: '#1A73E8', // Primary blue color
                                                                            '&:hover': {
                                                                                backgroundColor: '#1A73E8', // Darker blue on hover
                                                                            },
                                                                        },
                                                                        '&:hover': {
                                                                            backgroundColor: 'rgba(25, 118, 210, 0.1)', // Light blue on hover
                                                                        },
                                                                    },
                                                                    '& .MuiPickersCalendarHeader-root': {
                                                                        color: '#1A73E8', // Header text color
                                                                    },
                                                                    '& .MuiPickersDay-today': {
                                                                        border: '1px solid #1A73E8', // Today's date border
                                                                    },
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </MDBox>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="Software Version*"
                                                    name="software_version"
                                                    inputProps={{ maxLength: 10 }}
                                                    value={form.software_version}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MDInput
                                                    label="App Version"
                                                    name="app_version"
                                                    inputProps={{ maxLength: 10 }}
                                                    value={form.app_version}
                                                    onChange={handleChange}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>

                                        <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                            <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                            <MDButton variant="gradient" color="info" type="submit" loading={posdevicesStore.loading} sx={{ px: 4 }}>
                                                {isEdit ? "Update POS Device" : "Add POS Device"}
                                            </MDButton>
                                        </MDBox>
                                    </MDBox>
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
            </DashboardLayout>
        </LocalizationProvider>
    );
});

export default PosForm;