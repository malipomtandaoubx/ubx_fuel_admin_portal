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
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CustomHeader from "components/MDCustomHeader/CustomHeader";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

const MerchantForm = observer(({ }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { merchantStore, commonStore } = useStore();

    const merchantDataFromState = location.state?.merchantData;
    const isEdit = Boolean(merchantDataFromState);

    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        nida: "",
        nationality_id: "427",
        passport_number: "",
        permit_number: "",
        email: "",
        phone: "",
        business_cert: "",
        brella_cert: "",
        tin_cert: "",
        business_type_id: "",
        business_name: "",
        comment: "",
    });

    const [fileFields, setFileFields] = useState({
        business_cert: null,
        tin_cert: null,
        brella_cert: null,
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        // commonStore.fetchNationality();
        commonStore.fetchBusinessTypes();

        if (isEdit) {
            setForm({
                firstName: merchantDataFromState.user?.first_name || "",
                middleName: merchantDataFromState.user?.middle_name || "",
                lastName: merchantDataFromState.user?.last_name || "",
                address: merchantDataFromState.user?.address || "",
                nida: merchantDataFromState.user?.nida || "",
                nationality_id: merchantDataFromState.user?.nationality?.id || "",
                passport_number: merchantDataFromState.user?.passport_number || "",
                permit_number: merchantDataFromState.user?.permit_number || "",
                email: merchantDataFromState.user?.email || "",
                phone: merchantDataFromState.user?.phone || "",
                business_type_id: merchantDataFromState.business_type_id || "",
                business_name: merchantDataFromState.name || "",
                comment: merchantDataFromState.comment || "",
            });
        }
    }, [merchantDataFromState, commonStore, isEdit]);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file && file.type !== "application/pdf") {
            showAlert("error", `Only PDF files are allowed for ${field.replace(/_/g, " ")}`);
            return;
        }
        // Store the file separately
        setFileFields({ ...fileFields, [field]: file });
        // Also update form to track that a new file was selected
        setForm({ ...form, [field]: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const requiredFields = [
            "firstName",
            "lastName",
            "address",
            "nida",
            "nationality_id",
            "email",
            "phone",
            "business_type_id",
            "business_name",
        ];

        if (!isEdit || (!form.tin_cert && !fileFields.tin_cert)) {
            requiredFields.push("tin_cert");
        }

        for (const field of requiredFields) {
            if (!form[field] || form[field].toString().trim() === "") {
                return showAlert(
                    "error",
                    `${field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())} is required`
                );
            }
        }

        if (!/^\d{20}$/.test(form.nida)) return showAlert("error", "NIDA must be exactly 20 digits");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return showAlert("error", "Enter a valid email");
        if (!/^\d{1,10}$/.test(form.phone)) return showAlert("error", "Phone number must be at most 10 digits");

        try {
            const formDataObj = new FormData();
            // Add all non-file fields
            for (const key in form) {
                // Skip file fields in edit mode unless a new file was selected
                if (isEdit && ['business_cert', 'tin_cert', 'brella_cert'].includes(key)) {
                    continue; // Skip file text values in edit mode
                }

                const val = form[key];
                if (val === null || val === undefined) continue;
                if (val instanceof File) {
                    if (val.size > 0) formDataObj.append(key, val);
                    continue;
                }
                if (typeof val === "string" && val.trim() === "") continue;
                formDataObj.append(key, val);
            }

            // Add file fields only if a new file was selected
            if (isEdit) {
                for (const field in fileFields) {
                    if (fileFields[field] instanceof File) {
                        formDataObj.append(field, fileFields[field]);
                    }
                }
            }

            if (isEdit) {
                await merchantStore.updateMerchant(merchantDataFromState.id, formDataObj);
                showAlert("success", "Merchant updated successfully!");
            } else {
                await merchantStore.addMerchant(formDataObj);
                showAlert("success", "Merchant added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/merchants"), 1000);
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
                showAlert("error", isEdit ? "Failed to update merchant" : "Failed to add merchant");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/merchants");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <CustomHeader
                                title={isEdit ? "Edit Merchant" : "Add Merchant"}
                                subtitle={isEdit ? "Update merchant details" : "Fill out the details to add a new merchant"}
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

                                        {/* Personal Details */}
                                        <Grid item xs={12} md={4}>
                                            <MDInput label="First Name *" name="firstName" inputProps={{ maxLength: 50 }} value={form.firstName} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDInput label="Middle Name" name="middleName" inputProps={{ maxLength: 50 }} value={form.middleName} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDInput label="Last Name *" name="lastName" inputProps={{ maxLength: 50 }} value={form.lastName} onChange={handleChange} fullWidth />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Address *" name="address" inputProps={{ maxLength: 200 }} value={form.address} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="NIDA *" name="nida" inputProps={{ maxLength: 20 }} value={form.nida} onChange={handleChange} fullWidth />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Nationality *"
                                                name="nationality_id"
                                                value={form.nationality_id}
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                sx={{ '& .MuiInputBase-root': { height: 45, }, '& .MuiInputLabel-root': { lineHeight: '1.2em', '&.Mui-focused': { lineHeight: '1.2em', }, }, '& .MuiOutlinedInput-input': { height: '100%', padding: '0 14px', display: 'flex', alignItems: 'center', }, '& .MuiSelect-select': { display: 'flex', alignItems: 'center', height: '100% !important', }, }}
                                            >
                                                <MenuItem value="">Select Nationality</MenuItem>
                                                {commonStore?.nationalities?.map((nation) => (
                                                    <MenuItem key={nation.id} value={nation.id}>
                                                        {nation.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Passport Number" name="passport_number" inputProps={{ maxLength: 20 }} value={form.passport_number} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Permit Number" name="permit_number" inputProps={{ maxLength: 50 }} value={form.permit_number} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Email *" name="email" type="email" inputProps={{ maxLength: 100 }} value={form.email} onChange={handleChange} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Phone *" name="phone" inputProps={{ maxLength: 10 }} value={form.phone} onChange={handleChange} fullWidth />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <MDInput label="Business Name *" name="business_name" inputProps={{ maxLength: 100 }} value={form.business_name} onChange={handleChange} fullWidth />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Business Type *"
                                                name="business_type_id"
                                                value={form.business_type_id}
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                sx={{ '& .MuiInputBase-root': { height: 45, }, '& .MuiInputLabel-root': { lineHeight: '1.2em', '&.Mui-focused': { lineHeight: '1.2em', }, }, '& .MuiOutlinedInput-input': { height: '100%', padding: '0 14px', display: 'flex', alignItems: 'center', }, '& .MuiSelect-select': { display: 'flex', alignItems: 'center', height: '100% !important', }, }}
                                            >
                                                <MenuItem value="">Select Business Type</MenuItem>
                                                {commonStore?.businessTypeData?.map((type) => (
                                                    <MenuItem key={type.id} value={type.id}>
                                                        {type.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        {/* File Inputs */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                type="file"
                                                label={`Business Certificate (PDF)`}
                                                name="business_cert"
                                                fullWidth
                                                inputProps={{ accept: ".pdf" }}
                                                onChange={(e) => handleFileChange(e, "business_cert")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                type="file"
                                                label={`Brella Certificate (PDF)`}
                                                name="brella_cert"
                                                fullWidth
                                                inputProps={{ accept: ".pdf" }}
                                                onChange={(e) => handleFileChange(e, "brella_cert")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                type="file"
                                                label={`TIN Certificate (PDF)${isEdit ? '' : '*'}`}
                                                name="tin_cert"
                                                fullWidth
                                                inputProps={{ accept: ".pdf" }}
                                                onChange={(e) => handleFileChange(e, "tin_cert")}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <MDInput label="Comment" name="comment" value={form.comment} inputProps={{ maxLength: 200 }} onChange={handleChange} fullWidth multiline rows={3} />
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                        <MDButton color="buttonBackgroundColor" textcolor="buttonTextColor" type="submit" loading={merchantStore.loading} sx={{ px: 4 }}>
                                            {isEdit ? "Update Merchant" : "Add Merchant"}
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

export default MerchantForm;
