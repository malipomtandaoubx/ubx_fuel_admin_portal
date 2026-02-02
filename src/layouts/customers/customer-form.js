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

const CustomerForm = observer(() => {
    const navigate = useNavigate();
    const { customerStore } = useStore();
    const [form, setForm] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        nida: "",
        role_id: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        customerStore.fetchCustomerRoles();
    }, [])

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
    };

    const handleCloseAlert = () => setAlert({ show: false, type: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!form.firstName.trim()) return showAlert("error", "First Name is required");
        if (!form.lastName.trim()) return showAlert("error", "Last Name is required");
        if (!form.address.trim()) return showAlert("error", "Address is required");
        if (!form.nida.trim()) return showAlert("error", "NIDA is required");
        if (!/^\d{20}$/.test(form.nida)) return showAlert("error", "NIDA must be exactly 20 digits");
        if (!form.role_id) return showAlert("error", "Role is required");
        if (!form.email.trim()) return showAlert("error", "Email is required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return showAlert("error", "Enter a valid email");
        if (!form.phone.trim()) return showAlert("error", "Phone is required");
        if (!/^\d{1,10}$/.test(form.phone)) return showAlert("error", "Phone number must be at most 10 digits");

        try {
            const formDataObj = new FormData();
            for (const key in form) {
                const val = form[key];
                if (val === null || val === undefined) continue;
                if (val instanceof File) {
                    if (val.size > 0) formDataObj.append(key, val);
                    continue;
                }
                if (typeof val === "string" && val.trim() === "") continue;
                formDataObj.append(key, val);
            }

            await customerStore.addCustomers(formDataObj);

            showAlert("success", "Customer added successfully!");
            window.scrollTo({ top: 0, behavior: "smooth" });

            setTimeout(() => navigate("/customers"), 1000);

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
                showAlert("error", "Failed to save customer");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/customers");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mx={2} mt={-3} textAlign="center" p={2}>
                                <MDTypography variant="h6" color="white">
                                    Add Customer
                                </MDTypography>
                                <MDTypography variant="button" color="white" opacity={0.9}>
                                    Fill out the details to add a new customer
                                </MDTypography>
                            </MDBox>

                            {alert.show && (
                                <MDBox px={3} mt={4}>
                                    <MDAlert color={alert.type} dismissible onClose={handleCloseAlert}>
                                        <MDTypography variant="body2" color="white">
                                            {alert.message}
                                        </MDTypography>
                                    </MDAlert>
                                </MDBox>
                            )}

                            <MDBox pt={3} pb={3} px={3}>
                                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                fullWidth
                                                label="First Name *"
                                                name="firstName"
                                                value={form.firstName}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                fullWidth
                                                label="Middle Name"
                                                name="middleName"
                                                value={form.middleName}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                fullWidth
                                                label="Last Name *"
                                                name="lastName"
                                                value={form.lastName}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="Address *"
                                                name="address"
                                                value={form.address}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="NIDA *"
                                                name="nida"
                                                inputProps={{ maxLength: 20 }}
                                                value={form.nida}
                                                onChange={handleChange}
                                            />
                                        </Grid>

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


                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="Email *"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="Phone *"
                                                name="phone"
                                                inputProps={{ maxLength: 10 }}
                                                value={form.phone}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>
                                            Cancel
                                        </MDButton>
                                        <MDButton variant="gradient" color="info" type="submit" loading={customerStore.loading} sx={{ px: 4 }}>
                                            Add Customer
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

export default CustomerForm;
