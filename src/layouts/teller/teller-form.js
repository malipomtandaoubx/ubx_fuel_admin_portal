/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CustomHeader from "components/MDCustomHeader/CustomHeader";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";

const TellerForm = observer(({ initialData = null }) => {
    const navigate = useNavigate();
    const { tellerStore, commonStore, merchantStore } = useStore();
    const isEdit = Boolean(initialData);

    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        nida: "",
        email: "",
        phone: "",
        permissions: [],
    });

    const [selectedMerchant, setSelectedMerchant] = useState("");
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        commonStore.fetchPermission(); // fetch permission list
        merchantStore.fetchMerchants();

        if (isEdit) {
            setForm({
                firstName: initialData.user?.first_name || "",
                middleName: initialData.user?.middle_name || "",
                lastName: initialData.user?.last_name || "",
                address: initialData.user?.address || "",
                nida: initialData.user?.nida || "",
                email: initialData.user?.email || "",
                phone: initialData.user?.phone || "",
                permissions: initialData.permissions?.map(p => p.id) || [],
            });
        }
    }, [initialData, commonStore, isEdit]);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handlePermissionsChange = (event) => {
        const { value } = event.target;
        setForm({ ...form, permissions: typeof value === "string" ? value.split(",") : value });
    };

    const handleMerchantChange = (e) => {
        setSelectedMerchant(e.target.value);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Required Fields
        const requiredFields = ["firstName", "lastName", "address", "nida", "email", "phone", "permissions"];
        for (const field of requiredFields) {
            if (!form[field] || (Array.isArray(form[field]) && form[field].length === 0)) {
                return showAlert("error", `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            }
        }

        // Field Validations
        if (!/^\d{20}$/.test(form.nida)) return showAlert("error", "NIDA must be exactly 20 digits");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return showAlert("error", "Enter a valid email");
        if (!/^\d{1,10}$/.test(form.phone)) return showAlert("error", "Phone number must be at most 10 digits");
        if (!selectedMerchant) return showAlert("error", "Please select a merchant");

        // Prepare payload
        const payload = {
            firstName: form.firstName,
            middleName: form.middleName,
            lastName: form.lastName,
            address: form.address,
            nida: form.nida,
            email: form.email,
            phone: form.phone,
            merchantId: selectedMerchant, // merchant selected
            permissions: form.permissions.map((id) => ({ id: String(id), value: true })) // Convert id to string
        };

        try {
            if (isEdit) {
                await tellerStore.updateMerchant(initialData.id, payload);
                showAlert("success", "Teller updated successfully!");
            } else {
                await tellerStore.addTeller(payload);
                showAlert("success", "Teller added successfully!");
            }

            setTimeout(() => navigate("/tellers"), 1000);
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
                showAlert("error", isEdit ? "Failed to update teller" : "Failed to add teller");
            }
        }
    };

    const handleCancel = () => navigate("/tellers");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <CustomHeader
                                title={isEdit ? "Edit Tellers" : "Add Tellers"}
                                subtitle={isEdit ? "Update teller details" : "Fill out the details to add a new teller"}
                                leftComponent={
                                    <IconButton size="medium" color={"white"} onClick={() => navigate(-1)}>
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
                                        {/* Personal Details Inputs */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="First Name*" name="firstName" inputProps={{ maxLength: 50 }} value={form.firstName} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Middle Name" name="middleName" inputProps={{ maxLength: 50 }} value={form.middleName} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Last Name*" name="lastName" inputProps={{ maxLength: 50 }} value={form.lastName} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Address*" name="address" inputProps={{ maxLength: 200 }} value={form.address} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="NIDA*" name="nida" inputProps={{ maxLength: 20 }} value={form.nida} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Email*" name="email" inputProps={{ maxLength: 100 }} type="email" value={form.email} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Phone*" name="phone" inputProps={{ maxLength: 10 }} value={form.phone} onChange={handleChange} fullWidth />
                                        </Grid>

                                        {/* Select Merchant Dropdown */}
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Select Merchant*"
                                                value={selectedMerchant}
                                                onChange={handleMerchantChange}
                                                fullWidth
                                                sx={{ '& .MuiInputBase-root': { height: 45, }, '& .MuiInputLabel-root': { lineHeight: '1.2em', '&.Mui-focused': { lineHeight: '1.2em', }, }, '& .MuiOutlinedInput-input': { height: '100%', padding: '0 14px', display: 'flex', alignItems: 'center', }, '& .MuiSelect-select': { display: 'flex', alignItems: 'center', height: '100% !important', }, }}
                                            >
                                                {merchantStore.merchantData?.map((merchant) => (
                                                    <MenuItem key={merchant.id} value={merchant.id}>
                                                        {merchant.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        {/* Permissions Multi-Select */}
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Permissions *"
                                                name="permissions"
                                                value={form.permissions}
                                                onChange={handlePermissionsChange}
                                                fullWidth
                                                sx={{ '& .MuiInputBase-root': { height: 45, }, '& .MuiInputLabel-root': { lineHeight: '1.2em', '&.Mui-focused': { lineHeight: '1.2em', }, }, '& .MuiOutlinedInput-input': { height: '100%', padding: '0 14px', display: 'flex', alignItems: 'center', }, '& .MuiSelect-select': { display: 'flex', alignItems: 'center', height: '100% !important', }, }}
                                                SelectProps={{
                                                    multiple: true,
                                                    renderValue: (selected) =>
                                                        selected.map((id) => commonStore.permissionsData.find((p) => p.id === id)?.title).join(", "),
                                                    // input: <OutlinedInput />,
                                                }}
                                            >
                                                {commonStore.permissionsData?.map((perm) => (
                                                    <MenuItem key={perm.id} value={perm.id}>
                                                        <Checkbox checked={form.permissions.includes(perm.id)} />
                                                        <ListItemText sx={{ '& .MuiListItemText-primary': { fontSize: 13, }, }} primary={perm.title} />
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                        <MDButton variant="gradient" color="info" type="submit" loading={tellerStore.loading} sx={{ px: 4 }}>
                                            {isEdit ? "Update Teller" : "Add Teller"}
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

export default TellerForm;
