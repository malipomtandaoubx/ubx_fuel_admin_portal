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
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { format, isWithinInterval, parse } from "date-fns";
import merchants from "layouts/merchants/merchants";

const ReportForm = observer(() => {
    const navigate = useNavigate();
    const { reportStore, merchantStore, customerStore, agentStore } = useStore();
    const location = useLocation();

    useEffect(() => {
        merchantStore.fetchMerchants();
        customerStore.fetchCustomers();
        agentStore.fetchAgents();
    }, []);

    const [form, setForm] = useState({
        entity_id: "",
        entity_type: "",
        format: "",
        interval: "",
        interval_data: [],
        transaction_type: "",
    });

    const [alert, setAlert] = useState({ show: false, type: "", message: "" });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startWeek, setStartWeek] = useState(null);
    const [endWeek, setEndWeek] = useState(null);
    const [startMonth, setStartMonth] = useState(null);
    const [endMonth, setEndMonth] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [customDateRanges, setCustomDateRanges] = useState([]);

    // Create combined entity options from all stores
    const getEntityOptions = () => {
        const entityOptions = [];

        // Add merchants
        if (merchantStore.merchantData && Array.isArray(merchantStore.merchantData)) {
            merchantStore.merchantData.forEach(merchant => {
                entityOptions.push({
                    id: merchant.id,
                    name: merchant.name,
                    type: "merchant",
                    displayName: `${merchant.name} (Merchant)`
                });
            });
        }

        // Add customers
        if (customerStore.customersData && Array.isArray(customerStore.customersData)) {
            customerStore.customersData.forEach(customer => {
                const fullName = `${customer.firstName || ''} ${customer.middleName || ''} ${customer.lastName || ''}`.trim();
                entityOptions.push({
                    id: customer.id,
                    name: fullName || `Customer ${customer.id}`,
                    type: "customer",
                    displayName: `${fullName || `Customer ${customer.id}`} (Customer)`
                });
            });
        }

        // Add agents
        if (agentStore.agentData && Array.isArray(agentStore.agentData)) {
            agentStore.agentData.forEach(agent => {
                const fullName = `${agent.user?.first_name || ''} ${agent.user?.last_name || ''}`.trim();
                entityOptions.push({
                    id: agent.id,
                    name: fullName || `Agent ${agent.agent_code || agent.id}`,
                    type: "agent",
                    displayName: `${fullName || `Agent ${agent.agent_code || agent.id}`} (Agent)`
                });
            });
        }

        return entityOptions;
    };

    const entityOptions = getEntityOptions();

    const entityTypeOptions = [
        { value: "agent", label: "Agent" },
        { value: "merchant", label: "Merchant" },
        { value: "customer", label: "Customer" },
        { value: "all", label: "All" },
    ];

    const formatOptions = [
        { value: "PDF", label: "PDF" },
        { value: "EXCEL", label: "EXCEL" },
    ];

    const intervalOptions = [
        { value: "date", label: "Date" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
        { value: "custom", label: "Custom" },
    ];

    const transactionTypeOptions = [
        { value: "withdraw", label: "Withdraw" },
        { value: "deposit", label: "Deposit" },
        { value: "purchase", label: "Purchase" },
    ];

    const showAlert = (type, message) => {
        setAlert({ show: true, type, message });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Reset interval data when interval changes
        if (name === "interval") {
            setForm(prev => ({ ...prev, interval_data: [] }));
            setStartDate(null);
            setEndDate(null);
            setStartWeek(null);
            setEndWeek(null);
            setStartMonth(null);
            setEndMonth(null);
            setStartYear(null);
            setEndYear(null);
            setCustomDateRanges([]);
        }
    };

    // Format date to mm-dd-yyyy
    const formatDateToMMDDYYYY = (date) => {
        return format(date, 'MM-dd-yyyy');
    };

    // Parse date from mm-dd-yyyy format
    const parseDateFromMMDDYYYY = (dateString) => {
        return parse(dateString, 'MM-dd-yyyy', new Date());
    };

    // Check if date range already exists
    const isDateRangeExists = (start, end) => {
        const startFormatted = formatDateToMMDDYYYY(start);
        const endFormatted = formatDateToMMDDYYYY(end);
        const newRange = `${startFormatted}_to_${endFormatted}`;

        return customDateRanges.includes(newRange);
    };

    // Get all disabled dates from custom date ranges
    const getDisabledDates = () => {
        const disabledDates = [];

        customDateRanges.forEach(range => {
            const [startStr, endStr] = range.split('_to_');
            const startDate = parseDateFromMMDDYYYY(startStr);
            const endDate = parseDateFromMMDDYYYY(endStr);

            // Add all dates in the range to disabled dates
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                disabledDates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });

        return disabledDates;
    };

    // Check if a date should be disabled
    const shouldDisableDate = (date) => {
        const disabledDates = getDisabledDates();
        return disabledDates.some(disabledDate =>
            format(disabledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
    };

    // Date range handlers
    const handleStartDateChange = (date) => {
        setStartDate(date);
        updateDateRange();
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        updateDateRange();
    };

    const updateDateRange = () => {
        if (startDate && endDate) {
            const startFormatted = formatDateToMMDDYYYY(startDate);
            const endFormatted = formatDateToMMDDYYYY(endDate);
            setForm(prev => ({ ...prev, interval_data: [startFormatted, endFormatted] }));
        } else {
            setForm(prev => ({ ...prev, interval_data: [] }));
        }
    };

    // Week range handlers
    const handleStartWeekChange = (date) => {
        setStartWeek(date);
        updateWeekRange();
    };

    const handleEndWeekChange = (date) => {
        setEndWeek(date);
        updateWeekRange();
    };

    const updateWeekRange = () => {
        if (startWeek && endWeek) {
            const startWeekNumber = getWeekNumber(startWeek);
            const endWeekNumber = getWeekNumber(endWeek);
            const startYear = startWeek.getFullYear();
            const endYear = endWeek.getFullYear();
            const startFormatted = `${startYear}-W${startWeekNumber}`;
            const endFormatted = `${endYear}-W${endWeekNumber}`;
            setForm(prev => ({ ...prev, interval_data: [startFormatted, endFormatted] }));
        } else {
            setForm(prev => ({ ...prev, interval_data: [] }));
        }
    };

    // Month range handlers
    const handleStartMonthChange = (date) => {
        setStartMonth(date);
        updateMonthRange();
    };

    const handleEndMonthChange = (date) => {
        setEndMonth(date);
        updateMonthRange();
    };

    const updateMonthRange = () => {
        if (startMonth && endMonth) {
            const startYear = startMonth.getFullYear();
            const endYear = endMonth.getFullYear();
            const startMonthNum = startMonth.getMonth() + 1;
            const endMonthNum = endMonth.getMonth() + 1;
            const startFormatted = `${startYear}-${startMonthNum.toString().padStart(2, '0')}`;
            const endFormatted = `${endYear}-${endMonthNum.toString().padStart(2, '0')}`;
            setForm(prev => ({ ...prev, interval_data: [startFormatted, endFormatted] }));
        } else {
            setForm(prev => ({ ...prev, interval_data: [] }));
        }
    };

    // Year range handlers
    const handleStartYearChange = (date) => {
        setStartYear(date);
        updateYearRange();
    };

    const handleEndYearChange = (date) => {
        setEndYear(date);
        updateYearRange();
    };

    const updateYearRange = () => {
        if (startYear && endYear) {
            const startYearValue = startYear.getFullYear();
            const endYearValue = endYear.getFullYear();
            setForm(prev => ({ ...prev, interval_data: [startYearValue.toString(), endYearValue.toString()] }));
        } else {
            setForm(prev => ({ ...prev, interval_data: [] }));
        }
    };

    // Custom date range handler
    const handleAddCustomRange = () => {
        if (startDate && endDate) {
            // Check if the date range already exists
            if (isDateRangeExists(startDate, endDate)) {
                showAlert("error", "This date range has already been added");
                return;
            }

            const startFormatted = formatDateToMMDDYYYY(startDate);
            const endFormatted = formatDateToMMDDYYYY(endDate);
            const newRange = `${startFormatted}_to_${endFormatted}`;
            setCustomDateRanges(prev => [...prev, newRange]);
            setForm(prev => ({ ...prev, interval_data: [...prev.interval_data, newRange] }));
            setStartDate(null);
            setEndDate(null);
        }
    };

    const handleRemoveCustomRange = (indexToRemove) => {
        setCustomDateRanges(prev => prev.filter((_, index) => index !== indexToRemove));
        setForm(prev => ({
            ...prev,
            interval_data: prev.interval_data.filter((_, index) => index !== indexToRemove)
        }));
    };

    // Helper function to get week number
    const getWeekNumber = (date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    const getIntervalLabel = () => {
        switch (form.interval) {
            case "date":
                return "Date Range";
            case "week":
                return "Week Range";
            case "month":
                return "Month Range";
            case "year":
                return "Year Range";
            case "custom":
                return "Custom Date Ranges";
            default:
                return "Interval Data";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation - only entity_id and format are required
        const requiredFields = [
            "entity_id",
            "format",
        ];

        for (const field of requiredFields) {
            if (!form[field] || form[field].toString().trim() === "") {
                return showAlert(
                    "error",
                    `${field.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())} is required`
                );
            }
        }

        // Validate interval_data only if interval is selected
        if (form.interval && form.interval_data.length === 0) {
            return showAlert("error", `${getIntervalLabel()} is required when interval is selected`);
        }

        try {
            // Prepare data for submission - only include fields that have values
            const submitData = {
                entity_id: form.entity_id,
                entity_type: form.entity_type,
                format: form.format,
                interval: form.interval,
                transaction_type: form.transaction_type,
                interval_data: form.interval_data
            };

            // Call your API to generate report
            await reportStore.generateReport(submitData);

            showAlert("success", "Report generated successfully!");
            window.scrollTo({ top: 0, behavior: "smooth" });

            // Optionally download the report or redirect
            // setTimeout(() => navigate("/reports"), 1000);

        } catch (err) {
            const response = err?.response?.data;

            // Handle different types of error responses
            if (response?.errors) {
                // Structured validation errors
                const allErrors = [];
                for (const key in response.errors) {
                    allErrors.push(...response.errors[key]);
                }
                showAlert("error", allErrors.join(" | "));
            } else if (response?.message) {
                // Regular error message
                showAlert("error", response.message);
            } else if (err?.response?.status === 500) {
                // Handle 500 errors specifically - extract meaningful message from the error
                const errorMessage = extractErrorMessageFrom500(response || err);
                showAlert("error", errorMessage);
            } else if (err?.message) {
                // Network or other errors
                showAlert("error", err.message);
            } else {
                // Fallback
                showAlert("error", "Failed to generate report");
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Add this helper function to extract meaningful error messages from 500 errors
    const extractErrorMessageFrom500 = (error) => {
        // If it's a PHP TypeError (like in your example)
        if (error?.exception === "TypeError" && error?.message) {
            // Extract the meaningful part of the error message
            const message = error.message;

            // For the specific error you're getting about TransactionTypeCode
            if (message.includes("TransactionTypeCode::getCode()")) {
                return "Invalid transaction type format. Please check your transaction type selection.";
            }

            // Return the actual PHP error message for debugging
            return `Server error: ${message.split(', called in')[0]}`;
        }

        // If there's a generic message
        if (error?.message) {
            return error.message;
        }

        // If it's a string
        if (typeof error === 'string') {
            return error;
        }

        // Fallback for unknown 500 errors
        return "Internal server error. Please try again later.";
    };

    const handleCancel = () => navigate("/reports");

    const renderIntervalDataInput = () => {
        switch (form.interval) {
            case "date":
                return (
                    <MDBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                );

            case "week":
                return (
                    <MDBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="Start Week"
                                    value={startWeek}
                                    onChange={handleStartWeekChange}
                                    views={['year', 'month']}
                                    openTo="month"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="End Week"
                                    value={endWeek}
                                    onChange={handleEndWeekChange}
                                    views={['year', 'month']}
                                    openTo="month"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                );

            case "month":
                return (
                    <MDBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="Start Month"
                                    value={startMonth}
                                    onChange={handleStartMonthChange}
                                    views={['year', 'month']}
                                    openTo="month"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="End Month"
                                    value={endMonth}
                                    onChange={handleEndMonthChange}
                                    views={['year', 'month']}
                                    openTo="month"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                );

            case "year":
                return (
                    <MDBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="Start Year"
                                    value={startYear}
                                    onChange={handleStartYearChange}
                                    views={['year']}
                                    openTo="year"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DatePicker
                                    label="End Year"
                                    value={endYear}
                                    onChange={handleEndYearChange}
                                    views={['year']}
                                    openTo="year"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                );

            case "custom":
                return (
                    <MDBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                                <DatePicker
                                    label="Start Date"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    shouldDisableDate={shouldDisableDate}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        },
                                        desktopPaper: {
                                            sx: {
                                                '& .MuiPickersDay-root': {
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#1A73E8', // Info color
                                                        '&:hover': {
                                                            backgroundColor: '#1A73E8', // Darker blue on hover
                                                        },
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(25, 118, 210, 0.1)', // Light blue on hover
                                                    },
                                                    '&.Mui-disabled': {
                                                        color: '#ccc',
                                                        backgroundColor: '#f5f5f5',
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
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <DatePicker
                                    label="End Date"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    shouldDisableDate={shouldDisableDate}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "outlined",
                                            sx: {
                                                '& .MuiInputBase-root': { height: 45 },
                                                '& .MuiInputLabel-root': {
                                                    lineHeight: '1.2em',
                                                    '&.Mui-focused': { lineHeight: '1.2em' }
                                                }
                                            }
                                        },
                                        desktopPaper: {
                                            sx: {
                                                '& .MuiPickersDay-root': {
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#1A73E8', // Info color
                                                        '&:hover': {
                                                            backgroundColor: '#1A73E8', // Darker blue on hover
                                                        },
                                                    },
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(25, 118, 210, 0.1)', // Light blue on hover
                                                    },
                                                    '&.Mui-disabled': {
                                                        color: '#ccc',
                                                        backgroundColor: '#f5f5f5',
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
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <MDButton
                                    variant="gradient"
                                    color="info"
                                    onClick={handleAddCustomRange}
                                    disabled={!startDate || !endDate || isDateRangeExists(startDate, endDate)}
                                    sx={{
                                        height: 45,
                                        width: '100%',
                                        px: 2
                                    }}
                                >
                                    Add
                                </MDButton>
                            </Grid>
                        </Grid>

                        {/* Display added custom date ranges as chips */}
                        {customDateRanges.length > 0 && (
                            <MDBox mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                                {customDateRanges.map((range, index) => (
                                    <Chip
                                        key={index}
                                        label={range.replace('_to_', ' to ')}
                                        onDelete={() => handleRemoveCustomRange(index)}
                                        color="info"
                                        variant="outlined"
                                        sx={{
                                            '&.MuiChip-outlined': {
                                                borderColor: '#1A73E8',
                                                color: '#1A73E8',
                                            }
                                        }}
                                    />
                                ))}
                            </MDBox>
                        )}
                    </MDBox>
                );

            default:
                return (
                    <MDInput
                        label="Interval Data"
                        fullWidth
                        disabled
                        placeholder="Select interval first"
                    />
                );
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox py={3}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} lg={10}>
                            <Card>
                                <CustomHeader
                                    title={"Generate Report"}
                                    subtitle={"Generate Report of transactions"}
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
                                            {/* Entity ID Dropdown */}
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    select
                                                    label="Entity ID *"
                                                    name="entity_id"
                                                    value={form.entity_id}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{ '& .MuiInputBase-root': { height: 45, }, '& .MuiInputLabel-root': { lineHeight: '1.2em', '&.Mui-focused': { lineHeight: '1.2em', }, }, '& .MuiOutlinedInput-input': { height: '100%', padding: '0 14px', display: 'flex', alignItems: 'center', }, '& .MuiSelect-select': { display: 'flex', alignItems: 'center', height: '100% !important', }, }}
                                                >
                                                    <MenuItem value="">Select Entity</MenuItem>
                                                    {entityOptions.map((entity) => (
                                                        <MenuItem key={entity.id} value={entity.id}>
                                                            {entity.displayName}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            {/* Entity Type Dropdown */}
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    select
                                                    label="Entity Type"
                                                    name="entity_type"
                                                    value={form.entity_type}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiInputBase-root': { height: 45 },
                                                        '& .MuiInputLabel-root': {
                                                            lineHeight: '1.2em',
                                                            '&.Mui-focused': {
                                                                lineHeight: '1.2em'
                                                            }
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
                                                    <MenuItem value="">Select Entity Type</MenuItem>
                                                    {entityTypeOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            {/* Format Dropdown */}
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    select
                                                    label="Format *"
                                                    name="format"
                                                    value={form.format}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiInputBase-root': { height: 45 },
                                                        '& .MuiInputLabel-root': {
                                                            lineHeight: '1.2em',
                                                            '&.Mui-focused': {
                                                                lineHeight: '1.2em'
                                                            }
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
                                                    <MenuItem value="">Select Format</MenuItem>
                                                    {formatOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            {/* Transaction Type Dropdown */}
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    select
                                                    label="Transaction Type"
                                                    name="transaction_type"
                                                    value={form.transaction_type}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiInputBase-root': { height: 45 },
                                                        '& .MuiInputLabel-root': {
                                                            lineHeight: '1.2em',
                                                            '&.Mui-focused': {
                                                                lineHeight: '1.2em'
                                                            }
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
                                                    <MenuItem value="">Select Transaction Type</MenuItem>
                                                    {transactionTypeOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            {/* Interval Dropdown */}
                                            <Grid item xs={12} md={6}>
                                                <TextField
                                                    select
                                                    label="Interval"
                                                    name="interval"
                                                    value={form.interval}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiInputBase-root': { height: 45 },
                                                        '& .MuiInputLabel-root': {
                                                            lineHeight: '1.2em',
                                                            '&.Mui-focused': {
                                                                lineHeight: '1.2em'
                                                            }
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
                                                    <MenuItem value="">Select Interval</MenuItem>
                                                    {intervalOptions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>

                                            {/* Interval Data Input */}
                                            <Grid item xs={12} md={6}>
                                                <MDBox>
                                                    {renderIntervalDataInput()}
                                                </MDBox>
                                            </Grid>
                                        </Grid>

                                        <MDBox mt={3} display="flex" justifyContent="flex-end" gap={2}>
                                            <MDButton color="error" onClick={handleCancel} sx={{ px: 4 }}>Cancel</MDButton>
                                            <MDButton color="buttonBackgroundColor" textcolor="buttonTextColor" type="submit" sx={{ px: 4 }} loading={reportStore.loading}>
                                                Generate Report
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

export default ReportForm;