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

const PermissionsForm = observer(() => {
    const navigate = useNavigate();
    const { roleStore } = useStore();
    const location = useLocation();

    const roleData = location.state?.roleData || null;
    const isEdit = Boolean(roleData);

    const [form, setForm] = useState({
        name: "",
        title: "",
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        if (isEdit && roleData) {
            setForm({
                name: roleData.name || "",
                title: roleData.title || "",
            });
        }
    }, [roleData, isEdit]);

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

        // Validation - both fields are required
        const requiredFields = ["name", "title"];

        for (const field of requiredFields) {
            if (!form[field] || form[field].toString().trim() === "") {
                return showAlert(
                    "error",
                    `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                );
            }
        }

        // Additional validation for name field
        if (form.name.length < 2) {
            return showAlert("error", "Name must be at least 2 characters long");
        }

        if (form.name.length > 20) {
            return showAlert("error", "Name must not exceed 20 characters");
        }

        // Additional validation for title field
        if (form.title.length < 2) {
            return showAlert("error", "Title must be at least 2 characters long");
        }

        if (form.title.length > 20) {
            return showAlert("error", "Title must not exceed 20 characters");
        }

        // Validate name format (alphanumeric and underscores only)
        const nameRegex = /^[a-zA-Z0-9_]+$/;
        if (!nameRegex.test(form.name)) {
            return showAlert("error", "Name can only contain letters, numbers, and underscores");
        }

        try {
            if (isEdit) {
                await roleStore.updateRole(roleData.id, form);
                showAlert("success", "Role updated successfully!");
            } else {
                await roleStore.addRole(form);
                showAlert("success", "Role added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/roles"), 1000);
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
                showAlert("error", isEdit ? "Failed to update role" : "Failed to add role");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/roles");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <CustomHeader
                                title={isEdit ? "Edit Role" : "Add Role"}
                                subtitle={isEdit ? "Update role details" : "Fill out the details to add a new role"}
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
                                        {/* Name Field */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Name*"
                                                name="name"
                                                placeholder="Enter role name"
                                                inputProps={{ 
                                                    maxLength: 20,
                                                    pattern: "^[a-zA-Z0-9_]+$"
                                                }}
                                                value={form.name}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        {/* Title Field */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Title*"
                                                name="title"
                                                placeholder="Enter role title"
                                                inputProps={{ maxLength: 20 }}
                                                value={form.title}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                        <MDButton variant="gradient" color="info" type="submit" loading={roleStore.loading} sx={{ px: 4 }}>
                                            {isEdit ? "Update Role" : "Add Role"}
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

export default PermissionsForm;