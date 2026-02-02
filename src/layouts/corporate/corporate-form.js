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

const CorporateForm = observer((theme) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { corporateStore, commonStore } = useStore();

    // Get data from navigation state if available
    const corporateDataFromState = location.state?.corporateData;
    const isEdit = Boolean(corporateDataFromState);

    const [form, setForm] = useState({
        business_name: "",
        business_address: "",
        registration_number: "",
        tin_number: "",
        email: "",
        phone: "",
        business_type_id: "",
        business_cert: "",
        tin_cert: "",
        brella_cert: "",
    });

    const [fileFields, setFileFields] = useState({
        business_cert: null,
        tin_cert: null,
        brella_cert: null,
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        commonStore.fetchBusinessTypes();

        // Use data from props or navigation state
        const dataToUse = corporateDataFromState;

        if (isEdit && dataToUse) {
            setForm({
                business_name: dataToUse?.organization_name || "",
                business_address: dataToUse?.organization_address || "",
                registration_number: dataToUse?.registration_number || "",
                tin_number: dataToUse?.tin_number || "",
                email: dataToUse?.admin_contact?.email || "",
                phone: dataToUse?.admin_contact?.phone || "",
                business_type_id: dataToUse?.business_type_id || "",
                business_cert: dataToUse?.business_cert || "",
                tin_cert: dataToUse?.tin_cert || "",
                brella_cert: dataToUse?.brella_cert || "",
            });
        }
    }, [corporateDataFromState, commonStore, isEdit]);

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

        // Validation - only required fields from your specification
        const requiredFields = [
            "business_name",
            "business_address",
            "registration_number",
            "tin_number",
            "email",
            "phone",
            "business_type_id",
        ];

        // For edit mode, only require tin_cert if no existing file and no new file selected
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

            // Determine which ID to use for update
            const corporateId = corporateDataFromState?.id;

            if (isEdit && corporateId) {
                await corporateStore.updateCorporate(corporateId, formDataObj);
                showAlert("success", "Corporate updated successfully!");
            } else {
                await corporateStore.addCorporates(formDataObj);
                showAlert("success", "Corporate added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/corporate"), 1000);
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
                showAlert("error", isEdit ? "Failed to update corporate" : "Failed to add corporate");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/corporate");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <CustomHeader
                                title={isEdit ? "Edit Corporate" : "Add Corporate"}
                                subtitle={isEdit ? "Update corporate details" : "Fill out the details to add a new corporate"}
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
                                        {/* Business Details */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Business Name*"
                                                name="business_name"
                                                inputProps={{ maxLength: 100 }}
                                                value={form.business_name}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Business Type*"
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

                                        {/* Contact Information */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Email*"
                                                name="email"
                                                type="email"
                                                inputProps={{ maxLength: 100 }}
                                                value={form.email}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Phone*"
                                                name="phone"
                                                inputProps={{ maxLength: 10 }}
                                                value={form.phone}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Registration Number*"
                                                name="registration_number"
                                                inputProps={{ maxLength: 50 }}
                                                value={form.registration_number}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="TIN Number*"
                                                name="tin_number"
                                                inputProps={{ maxLength: 20 }}
                                                value={form.tin_number}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        {/* File Inputs */}
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                type="file"
                                                label={`Business License (PDF)`}
                                                name="business_cert"
                                                fullWidth
                                                inputProps={{ accept: ".pdf" }}
                                                onChange={(e) => handleFileChange(e, "business_cert")}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                type="file"
                                                label={`Brella Certificate (PDF)`}
                                                name="brella_cert"
                                                fullWidth
                                                inputProps={{ accept: ".pdf" }}
                                                onChange={(e) => handleFileChange(e, "brella_cert")}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
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
                                            <MDInput
                                                label="Business Address*"
                                                name="business_address"
                                                inputProps={{ maxLength: 250 }}
                                                value={form.business_address}
                                                onChange={handleChange}
                                                fullWidth
                                                multiline
                                                rows={3}
                                            />
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                        <MDButton color="buttonBackgroundColor" textcolor="buttonTextColor" type="submit" loading={corporateStore.loading} sx={{ px: 4 }}>
                                            {isEdit ? "Update Corporate" : "Add Corporate"}
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

export default CorporateForm;