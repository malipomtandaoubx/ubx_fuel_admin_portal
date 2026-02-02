/* eslint-disable prettier/prettier */
import { useState, useRef } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";
import ConfirmationDialog from "components/MDConfirmationDialog/ConfirmationDialog";
import TopUpWalletDialog from "components/MDTopUpWallet/TopUpWalletDialog";
import { Navigation } from "@mui/icons-material";

const CorporateActionMenu = (corporate) => {
    const corporateData = corporate?.corporate;
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [topUpDialogOpen, setTopUpDialogOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { corporateStore } = useStore();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        navigate("/edit-corporate", { state: { corporateData: corporateData } });
    };

    const handleView = () => {
        handleClose();
        navigate("/corporate-details", { state: { corporateData: corporateData } });
    };

    const handleDelete = () => {
        handleClose();
        setDeleteDialogOpen(true);
    };

    const handleStatusToggle = () => {
        handleClose();
        setStatusDialogOpen(true);
    };

    const handleTopUpWallet = () => {
        handleClose();
        setTopUpDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await corporateStore.deleteCorporate(corporateData?.id);
            // Refresh the devices list after successful deletion
            await corporateStore.fetchCorporates();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleStatusConfirm = async () => {
        try {
            const isActive = corporateData?.admin_contact?.status === 1;
            if (isActive) {
                await corporateStore.deactivateCorporateAccount(corporateData?.id);
            } else {
                await corporateStore.activateCorporateAccount(corporateData?.id);
            }
            // Refresh the corporates list after successful status update
            await corporateStore.fetchCorporates();
            setStatusDialogOpen(false);
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const handleStatusCancel = () => {
        setStatusDialogOpen(false);
    };

    const handleTopUpConfirm = async (amount, remarks) => {
        try {
            var payload = {
                amount: amount,
                remarks: remarks,
                corporate_id: corporateData?.id,
            } 
            // Call your top up API here
            await corporateStore.topUpWallet(payload);
            // // Refresh the corporates list after successful top up
            await corporateStore.fetchCorporates();
            setTopUpDialogOpen(false);
        } catch (error) {
            console.error("Top up failed:", error);
        }
    };

    const handleTopUpCancel = () => {
        setTopUpDialogOpen(false);
    };

    // Determine status text and icon based on current status
    const isActive = corporateData?.admin_contact?.status === 1;
    const statusText = isActive ? "Deactivate" : "Activate";
    const statusIcon = isActive ? "toggle_off" : "toggle_on";
    const statusMessage = `Are you sure you want to ${statusText.toLowerCase()} "${corporateData?.organization_name}"?`;

    return (
        <>
            <IconButton onClick={handleClick} size="small">
                <Icon>more_vert</Icon>
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} getContentAnchorEl={null}>
                <MenuItem onClick={handleView} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>visibility</Icon>
                    View
                </MenuItem>
                <MenuItem onClick={handleEdit} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>edit</Icon>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleStatusToggle} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>{statusIcon}</Icon>
                    {statusText}
                </MenuItem>
                <MenuItem onClick={handleTopUpWallet} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>account_balance_wallet</Icon>
                    Top Up Wallet
                </MenuItem>
                <MenuItem onClick={() => { navigate("/corporate-transactions", { state: { corporateData: corporateData } }); }} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>point_of_sale</Icon>
                    Transactions
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>delete</Icon>
                    Delete
                </MenuItem>
            </Menu>

            <ConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete corporate"
                message={`Are you sure you want to delete "${corporateData?.organization_name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="error"
                icon="delete_outline"
                loading={corporateStore.loading}
            />

            {/* Activate/Deactivate Confirmation Dialog */}
            <ConfirmationDialog
                open={statusDialogOpen}
                onClose={handleStatusCancel}
                onConfirm={handleStatusConfirm}
                title={`${statusText} Account`}
                message={statusMessage}
                confirmText={statusText}
                cancelText="Cancel"
                confirmColor={isActive ? "warning" : "success"}
                icon={statusIcon}
                loading={corporateStore.loading}
            />

            {/* Top Up Wallet Dialog */}
            <TopUpWalletDialog
                open={topUpDialogOpen}
                onClose={handleTopUpCancel}
                onConfirm={handleTopUpConfirm}
                corporateName={corporateData?.organization_name}
                loading={corporateStore.loading}
            />
        </>
    );
};

export default CorporateActionMenu;