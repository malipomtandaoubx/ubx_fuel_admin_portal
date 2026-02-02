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

const usersActionMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    
    const userData = props?.user;
    const { userStore } = useStore();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        // navigate("/edit-user", { state: { userData: toJS(userData) } });
    };

    const handleView = () => {
        handleClose();
        navigate("/user-details", { state: { userData: toJS(userData) } });
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

export default usersActionMenu;