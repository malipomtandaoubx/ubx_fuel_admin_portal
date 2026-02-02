/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com
=========================================================
*/

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "context/MobxContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// @mui components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Custom components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function AgentForm() {
    const { agentStore } = useStore();
    const navigate = useNavigate();

    const location = useLocation();
    const agentData = location.state?.agentData;



    const isEditMode = !!agentData;

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        nida: "",
        photo: null,
        passport_number: "",
        permit_number: "",
        business_cert: null,
        brella_cert: null,
        tin_cert: null,
        email: "",
        phone: "",
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        if (isEditMode && agentData?.id) {
            if (agentData) {
                setFormData({
                    firstName: agentData?.user?.first_name || "",
                    middleName: agentData?.user?.middle_name || "",
                    lastName: agentData?.user?.last_name || "",
                    address: agentData?.user?.address || "",
                    nida: agentData?.user?.nida || "",
                    photo: null,
                    passport_number: agentData?.passport_number || "",
                    permit_number: agentData?.permit_number || "",
                    business_cert: null,
                    brella_cert: null,
                    tin_cert: null,
                    email: agentData?.user?.email || "",
                    phone: agentData?.user?.phone || "",
                });
            }
        }
    }, [isEditMode, agentData]);

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => {
            setAlert({ show: false, type: "", message: "" });
        }, 5000);
    };

    const handleCloseAlert = () => setAlert({ show: false, type: "", message: "" });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditMode) {
            return;
        }

        const fieldLabels = {
            firstName: "First Name",
            middleName: "Middle Name",
            lastName: "Last Name",
            address: "Address",
            nida: "NIDA",
            photo: "Photo",
            passport_number: "Passport Number",
            permit_number: "Permit Number",
            business_cert: "Business Certificate",
            brella_cert: "Brella Certificate",
            tin_cert: "TIN Certificate",
            email: "Email",
            phone: "Phone",
        };

        // Validation order
        const validationOrder = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "address",
            "nida",
            "tin_cert" // validate file at the end
        ];

        for (const field of validationOrder) {
            const value = formData[field];

            // 1️⃣ Required text fields
            if (field !== "tin_cert") {
                if (!value || (typeof value === "string" && !value.trim())) {
                    showAlert("error", `${fieldLabels[field]} is required`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }
            }

            // 2️⃣ Email validation
            if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                showAlert("error", "Please enter a valid email address");
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            // 3️⃣ Phone validation: max 10 digits
            if (field === "phone" && !/^\d{1,10}$/.test(value)) {
                showAlert("error", "Phone number must be at most 10 digits");
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            // 4️⃣ NIDA validation: exactly 20 digits
            if (field === "nida" && !/^\d{20}$/.test(value)) {
                showAlert("error", "NIDA must be exactly 20 digits");
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            // 5️⃣ TIN certificate validation (file)
            if (field === "tin_cert") {
                if (!(value instanceof File) || value.size === 0) {
                    showAlert("error", `${fieldLabels[field]} is required`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }
                if (!value.name.toLowerCase().endsWith(".pdf")) {
                    showAlert("error", `${fieldLabels[field]} must be a PDF`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }
            }
        }

        // If validation passes, proceed with form submission
        try {
            const formDataObj = new FormData();
            for (const key in formData) {
                const val = formData[key];
                if (val === null || val === undefined) continue;
                if (val instanceof File) {
                    if (val.size > 0) formDataObj.append(key, val);
                    continue;
                }
                if (typeof val === "string" && val.trim() === "") continue;
                formDataObj.append(key, val);
            }

            if (isEditMode) {
                await agentStore.updateAgent(id, formDataObj);
                showAlert("success", "Agent updated successfully!");
            } else {
                await agentStore.addAgent(formDataObj);
                showAlert("success", "Agent added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/agents"), 1000);

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
                showAlert("error", "Failed to save agent");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };


    const handleCancel = () => navigate("/agents");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mx={2} mt={-3} textAlign="center" p={2}>
                                <MDTypography variant="h6" color="white">
                                    {isEditMode ? "Edit Agent" : "Add Agent"}
                                </MDTypography>
                                <MDTypography variant="button" color="white" opacity={0.9}>
                                    {isEditMode
                                        ? "Update existing agent information"
                                        : "Fill out the details to add a new agent"}
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
                                    {/* Photo */}
                                    <MDTypography variant="h6" fontWeight="medium" color="text" mb={2}>
                                        Upload Photo
                                    </MDTypography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                type="file"
                                                accept="image/*"
                                                label="Photo"
                                                name="photo"
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Personal Info */}
                                    <MDTypography variant="h6" fontWeight="medium" color="text" mb={2} mt={3}>
                                        Personal Information
                                    </MDTypography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                fullWidth
                                                label="First Name*"
                                                name="firstName"
                                                inputProps={{ maxLength: 50 }}
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                fullWidth
                                                label="Middle Name"
                                                name="middleName"
                                                inputProps={{ maxLength: 50 }}
                                                value={formData.middleName}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MDInput
                                                fullWidth
                                                label="Last Name*"
                                                name="lastName"
                                                inputProps={{ maxLength: 50 }}
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Contact Info */}
                                    <MDTypography variant="h6" fontWeight="medium" color="text" mt={3} mb={2}>
                                        Contact Information
                                    </MDTypography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="Email*"
                                                name="email"
                                                inputProps={{ maxLength: 100 }}
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="Phone*"
                                                name="phone"
                                                inputProps={{ maxLength: 10 }}
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Address */}
                                    <MDTypography variant="h6" fontWeight="medium" color="text" mt={3} mb={2}>
                                        Address & Identification
                                    </MDTypography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <MDInput
                                                fullWidth
                                                multiline
                                                rows={2}
                                                label="Address*"
                                                name="address"
                                                inputProps={{ maxLength: 200 }}
                                                value={formData.address}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="NIDA*"
                                                name="nida"
                                                inputProps={{ maxLength: 20 }}
                                                value={formData.nida}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                label="Passport Number"
                                                name="passport_number"
                                                inputProps={{ maxLength: 20 }}
                                                value={formData.passport_number}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* Certificates */}
                                    <MDTypography variant="h6" fontWeight="medium" color="text" mt={3} mb={2}>
                                        Upload Certificates (PDF only)
                                    </MDTypography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                type="text"
                                                label="Permit Number"
                                                name="permit_number"
                                                inputProps={{ maxLength: 50 }}
                                                value={formData.permit_number}
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                type="file"
                                                accept=".pdf"
                                                label="Business Certificate (PDF)"
                                                name="business_cert"
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                type="file"
                                                accept=".pdf"
                                                label="Brella Certificate (PDF)"
                                                name="brella_cert"
                                                onChange={handleInputChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                fullWidth
                                                type="file"
                                                accept=".pdf"
                                                label="TIN Certificate (PDF)*"
                                                name="tin_cert"
                                                onChange={handleInputChange}
                                            />
                                        </Grid>

                                    </Grid>

                                    {/* Actions */}
                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>
                                            Cancel
                                        </MDButton>
                                        <MDButton variant="gradient" color="info" type="submit" loading={agentStore.loading} sx={{ px: 4 }}>
                                            {isEditMode ? "Update Agent" : "Add Agent"}
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
}

export default observer(AgentForm);
