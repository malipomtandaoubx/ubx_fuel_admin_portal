/* eslint-disable prettier/prettier */
import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the SidenavCollapse
import {
    collapseItem,
    collapseIconBox,
    collapseIcon,
    collapseText,
} from "examples/Sidenav/styles/sidenavCollapse";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function EnhancedSidenavCollapse({ icon, name, children, active, ...rest }) {
    const [controller] = useMaterialUIController();
    const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItem component="li" sx={{ display: 'block', pr: 2.5 }}>
                <MDBox
                    {...rest}
                    sx={(theme) =>
                        collapseItem(theme, {
                            active: active || open,
                            transparentSidenav,
                            whiteSidenav,
                            darkMode,
                            sidenavColor,
                        })
                    }
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                >
                    <ListItemIcon
                        sx={(theme) =>
                            collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active: active || open })
                        }
                    >
                        {typeof icon === "string" ? (
                            <Icon sx={(theme) => collapseIcon(theme, { active: active || open })}>{icon}</Icon>
                        ) : (
                            icon
                        )}
                    </ListItemIcon>

                    <ListItemText
                        primary={name}
                        sx={(theme) =>
                            collapseText(theme, {
                                miniSidenav,
                                transparentSidenav,
                                whiteSidenav,
                                active: active || open,
                            })
                        }
                    />

                    <Icon
                        sx={(theme) => ({
                            ...collapseIcon(theme, { active: active || open }),
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease-in-out',
                            color:  active || open ? theme.palette.textColor.state : theme.palette.textColor.main,
                            marginLeft: 'auto', // This will align all arrows properly
                        })}
                    >
                        expand_more
                    </Icon>
                </MDBox>
            </ListItem>

            {children && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children}
                    </List>
                </Collapse>
            )}
        </>
    );
}

EnhancedSidenavCollapse.defaultProps = {
    active: false,
    children: null,
};

EnhancedSidenavCollapse.propTypes = {
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    active: PropTypes.bool,
};

export default EnhancedSidenavCollapse;