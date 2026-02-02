/* eslint-disable prettier/prettier */
import { useState, useRef } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

const customersActionMenu = ({ customer }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
    };

    const handleView = () => {
        handleClose();
        // navigate("/customer-details", { state: { customerData: customer } });
    };

    const handleDelete = () => {
        handleClose();
    };

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
                <MenuItem onClick={handleDelete} sx={{ height: 45 }}>
                    <Icon sx={{ mr: 1 }}>delete</Icon>
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

export default customersActionMenu;