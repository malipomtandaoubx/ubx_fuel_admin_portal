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

const UserForm = observer(() => {
    const navigate = useNavigate();
    const { userStore, customerStore } = useStore();
    const location = useLocation();

    const usersData = location.state?.userData || null;
    const isEdit = Boolean(usersData);

    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        nida: "",
        role_id: "",
        email: "",
        phone: ""
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        customerStore.fetchCustomerRoles();
    }, [])

    useEffect(() => {
        if (isEdit && usersData) {
            const roleId = usersData.roles && usersData.roles.length > 0 ? usersData.roles[0].id : usersData.role_id || "";
            setForm({
                firstName: usersData.firstName || "",
                middleName: usersData.middleName || "",
                lastName: usersData.lastName || "",
                address: usersData.address || "",
                nida: usersData.nida || "",
                role_id: roleId,
                email: usersData.email || "",
                phone: usersData.phone || ""
            });
        }
    }, [usersData, isEdit]);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const requiredFields = [
            'firstName',
            'lastName',
            'address',
            'nida',
            'role_id',
            'email',
            'phone'
        ];

        const missingFields = requiredFields.filter(field => !form[field] || form[field].toString().trim() === "");

        if (missingFields.length > 0) {
            const fieldNames = {
                firstName: "First Name",
                lastName: "Last Name",
                address: "Address",
                nida: "NIDA",
                role_id: "Role",
                email: "Email",
                phone: "Phone"
            };

            const missingFieldNames = missingFields.map(field => fieldNames[field]);
            showAlert("error", `The following fields are required: ${missingFieldNames.join(", ")}`);
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            showAlert("error", "Please enter a valid email address");
            return false;
        }

        // Phone validation (basic - at least 10 digits)
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(form.phone.replace(/\D/g, ''))) {
            showAlert("error", "Please enter a valid phone number (10-15 digits)");
            return false;
        }

        // NIDA validation (assuming it should be numeric)
        const nidaRegex = /^[0-9]+$/;
        if (!nidaRegex.test(form.nida)) {
            showAlert("error", "NIDA should contain only numbers");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        try {
            // Prepare data for submission
            const submitData = {
                firstName: form.firstName.trim(),
                middleName: form.middleName.trim(),
                lastName: form.lastName.trim(),
                address: form.address.trim(),
                nida: form.nida.trim(),
                role_id: form.role_id,
                email: form.email.trim(),
                phone: form.phone.trim()
            };

            if (isEdit) {
                await userStore.updateUser(usersData.id, submitData);
                showAlert("success", "User updated successfully!");
            } else {
                await userStore.addUser(submitData);
                showAlert("success", "User added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/users"), 1000);
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
                showAlert("error", isEdit ? "Failed to update user" : "Failed to add user");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/users");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <CustomHeader
                                title={isEdit ? "Edit User" : "Add User"}
                                subtitle={isEdit ? "Update user information" : "Fill out the details to add a new user"}
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
                                        {/* First Name - Required */}
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                label="First Name*"
                                                name="firstName"
                                                inputProps={{ maxLength: 50 }}
                                                value={form.firstName}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        {/* Middle Name - Optional */}
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                label="Middle Name"
                                                name="middleName"
                                                inputProps={{ maxLength: 50 }}
                                                value={form.middleName}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        {/* Last Name - Required */}
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                label="Last Name*"
                                                name="lastName"
                                                inputProps={{ maxLength: 50 }}
                                                value={form.lastName}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        {/* Email - Required */}
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

                                        {/* Phone - Required */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Phone*"
                                                name="phone"
                                                inputProps={{
                                                    maxLength: 10,
                                                    pattern: "[0-9]*"
                                                }}
                                                value={form.phone}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        {/* NIDA - Required */}
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="NIDA*"
                                                name="nida"
                                                inputProps={{
                                                    maxLength: 20,
                                                    pattern: "[0-9]*"
                                                }}
                                                value={form.nida}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>

                                        {/* Role - Required Dropdown */}
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                select
                                                label="Role *"
                                                name="role_id"
                                                value={form.role_id}
                                                onChange={handleChange}
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiInputBase-root': {
                                                        height: 45, // match typical MDInput height
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">Select Role</MenuItem>
                                                {customerStore?.customersRoles?.map((role) => (
                                                    <MenuItem key={role.id} value={role.id}>
                                                        {role.title}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        {/* Address - Required */}
                                        <Grid item xs={12}>
                                            <MDInput
                                                label="Address*"
                                                name="address"
                                                multiline
                                                rows={3}
                                                inputProps={{ maxLength: 255 }}
                                                value={form.address}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                        <MDButton variant="gradient" color="info" type="submit" loading={userStore.loading} sx={{ px: 4 }}>
                                            {isEdit ? "Update User" : "Add User"}
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

export default UserForm;