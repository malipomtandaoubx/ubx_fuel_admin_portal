/* eslint-disable prettier/prettier */
import { useState, useRef } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "components/MDConfirmationDialog/ConfirmationDialog";
import { useStore } from "context/MobxContext";

const MerchantActionMenu = (merchant) => {
    const merchantData = merchant?.merchant;
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { merchantStore } = useStore();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        navigate("/edit-merchant", { state: { merchantData: merchantData } });
    };

    const handleView = () => {
        handleClose();
        navigate("/merchant-details", { state: { merchantData: merchantData } });
    };

    const handleDelete = () => {
        handleClose();
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await merchantStore.deleteMerchant(merchantData?.id);
            // Refresh the devices list after successful deletion
            await merchantStore.fetchMerchants();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const handleStatusCancel = () => {
        setStatusDialogOpen(false);
    };

    const handleStatusConfirm = async () => {
        try {
            const isActive = merchantData?.user?.status === 1;
            if (isActive) {
                await merchantStore.deactivateMerchantAccount(merchantData?.id);
            } else {
                await merchantStore.activateMerchantAccount(merchantData?.id);
            }
            // Refresh the Merchants list after successful status update
            await merchantStore.fetchMerchants();
            setStatusDialogOpen(false);
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const handleStatusToggle = () => {
        handleClose();
        setStatusDialogOpen(true);
    };

    // Determine status text and icon based on current status
    const isActive = merchantData?.user?.status === 1;
    const statusText = isActive ? "Deactivate" : "Activate";
    const statusIcon = isActive ? "toggle_off" : "toggle_on";
    const statusMessage = `Are you sure you want to ${statusText.toLowerCase()} "${merchantData?.user?.first_name || ''} ${merchantData?.user?.middle_name || ''} ${merchantData?.user?.last_name || ''}"?`.trim();

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
                <MenuItem onClick={handleStatusToggle} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>{statusIcon}</Icon>
                    {statusText}
                </MenuItem>
                <MenuItem onClick={handleEdit} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>edit</Icon>
                    Edit
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
                title="Delete merchant"
                message={`Are you sure you want to delete "${merchantData?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="error"
                icon="delete_outline"
                loading={merchantStore.loading}
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
                loading={merchantStore.loading}
            />

        </>
    );
};

export default MerchantActionMenu;