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

const CardLevelForm = observer(() => {
    const navigate = useNavigate();
    const { cardStore } = useStore();
    const location = useLocation();

    const cardLevelData = location.state?.cardLevelData || null;
    const isEdit = Boolean(cardLevelData);

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        if (isEdit && cardLevelData) {
            setForm({
                name: cardLevelData.name || "",
                description: cardLevelData.description || "",
            });
        }
    }, [cardLevelData, isEdit]);

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

        // Validation - only name is required
        if (!form.name || form.name.trim() === "") {
            return showAlert("error", "Name is required");
        }

        try {
            // Prepare data for submission
            const submitData = {
                ...form,
                name: form.name.trim(),
                description: form.description.trim(),
            };

            if (isEdit) {
                await cardStore.updateCardLevel(cardLevelData.id, submitData);
                showAlert("success", "Card level updated successfully!");
            } else {
                await cardStore.addCardLevel(submitData);
                showAlert("success", "Card level added successfully!");
            }

            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => navigate("/card-levels"), 1000);
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
                showAlert("error", isEdit ? "Failed to update card level" : "Failed to add card level");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleCancel = () => navigate("/card-levels");

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card>
                            <CustomHeader
                                title={isEdit ? "Edit Card Level" : "Add Card Level"}
                                subtitle={isEdit ? "Update card level information" : "Fill out the details to add a new card level"}
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
                                                label="Name*"
                                                name="name"
                                                inputProps={{ maxLength: 50 }}
                                                value={form.name}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MDInput
                                                label="Description"
                                                name="description"
                                                inputProps={{ maxLength: 50 }}
                                                value={form.description}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                        <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                        <MDButton color="buttonBackgroundColor" textcolor="buttonTextColor" type="submit" loading={cardStore.loading} sx={{ px: 4 }}>
                                            {isEdit ? "Update Card Level" : "Add Card Level"}
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

export default CardLevelForm;