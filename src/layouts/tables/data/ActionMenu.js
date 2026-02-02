/* eslint-disable prettier/prettier */
import { useState, useRef } from "react";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MDButton from "components/MDButton";

const ActionMenu = (rowId) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton ref={(el) => el && el.focus()} onClick={handleClick} size="small">
                <Icon>more_vert</Icon>
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} getContentAnchorEl={null}>
                <MenuItem onClick={handleClose}><Icon>edit</Icon>&nbsp;Edit</MenuItem>
                <MenuItem onClick={handleClose}>Edit&nbsp;<Icon>edit</Icon></MenuItem>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
            </Menu>
        </>
    );
};

export default ActionMenu;