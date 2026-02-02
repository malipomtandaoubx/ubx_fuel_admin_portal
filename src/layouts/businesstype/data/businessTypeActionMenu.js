/* eslint-disable prettier/prettier */
import { useState, useRef } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import { toJS } from "mobx";
import { observer } from 'mobx-react-lite';
import { useStore } from "context/MobxContext";
import ConfirmationDialog from "components/MDConfirmationDialog/ConfirmationDialog";

const businessTypeActionMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const businessTypeData = props?.businessTypeData;
    const navigate = useNavigate();
    const { businessStore } = useStore();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        navigate("/edit-businesstype", { state: { businessTypeData: toJS(businessTypeData) } });
    };

    const handleView = () => {
        handleClose();
        // navigate("/pos-details", { state: { cardLevelData: toJS(cardLevelData) } });
    };

    const handleDeleteClick = () => {
        handleClose();
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await businessStore.deleteBusinessTypes(businessTypeData.id);
            // Refresh the devices list after successful deletion
            await businessStore.fetchBusinessTypes();
            setDeleteDialogOpen(false);
        } catch (error) {
            // Error is handled in the store, we just need to close the dialog
            // The error will be available in businessStore.error
            console.error("Delete failed:", error);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };
    
    return (
        <>
            <IconButton onClick={handleClick} size="small">
                <Icon>more_vert</Icon>
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} getContentAnchorEl={null}>
                {/* <MenuItem onClick={handleView} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>visibility</Icon>
                    View
                </MenuItem> */}
                <MenuItem onClick={handleEdit} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>edit</Icon>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>delete</Icon>
                    Delete
                </MenuItem>
            </Menu>

            <ConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Business Type"
                message={`Are you sure you want to delete "${businessTypeData?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="error"
                icon="delete_outline"
                loading={businessStore.loading}
            />
        </>
    );
};

export default businessTypeActionMenu;