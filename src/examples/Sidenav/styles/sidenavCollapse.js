/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
function collapseItem(theme, ownerState) {
    const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
    const { active, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = ownerState;

    const { white, transparent, dark, grey, gradients, sidenav } = palette;
    const { md } = boxShadows;
    const { borderRadius } = borders;
    const { pxToRem, rgba, linearGradient } = functions;

    return {
        // background: active ? linearGradient(gradients[sidenavColor].main, gradients[sidenavColor].state) : transparent.main,
        background: active ? sidenav.state : transparent.main,
        color:
            (transparentSidenav && !darkMode && !active) || (whiteSidenav && !active)
                ? dark.main
                : white.main,
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: `${pxToRem(8)} ${pxToRem(10)}`,
        margin: `${pxToRem(1.5)} ${pxToRem(10)}`,
        borderRadius: borderRadius.md,
        cursor: "pointer",
        userSelect: "none",
        whiteSpace: "nowrap",
        boxShadow: active && !whiteSidenav && !darkMode && !transparentSidenav ? md : "none",

        "&:hover, &:focus": {
            backgroundColor: !active
                ? rgba(whiteSidenav ? grey[400] : palette.textColor.main, 0.2)
                : undefined,
        },
    };
}

function collapseIconBox(theme, ownerState) {
    const { palette, transitions, borders, functions,  } = theme;
    const { transparentSidenav, whiteSidenav, darkMode, active } = ownerState;

    const { white, dark } = palette;
    const { borderRadius } = borders;
    const { pxToRem } = functions;

    return {
        minWidth: pxToRem(32),
        minHeight: pxToRem(32),
        color: active ? palette.textColor.state : palette.textColor.main, // Always white for icons
        borderRadius: borderRadius.md,
        display: "grid",
        placeItems: "center",
        transition: transitions.create("margin", {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
        }),

        "& svg, svg g": {
            color: active ? palette.textColor.state : palette.textColor.main, // Always white for icons
        },
    };
}

const collapseIcon = ({ palette: { white, gradients, textColor } }, { active }) => ({
    color: active ? textColor.main : white.main, // Always white for icons
});

function collapseText(theme, ownerState) {
    const { typography, transitions, breakpoints, functions, palette } = theme;
    const { miniSidenav, transparentSidenav, active } = ownerState;

    const { size, fontWeightRegular, fontWeightLight, fontWeightMedium, } = typography;
    const { pxToRem } = functions;

    return {
        color: active ? palette.textColor.state : palette.textColor.main,
        marginLeft: pxToRem(10),
        overflow: "hidden",          // ✅ Prevent overflow
        textOverflow: "ellipsis",    // ✅ Show "..." instead of breaking layout
        whiteSpace: "normal",        // ✅ Allow wrapping
        wordBreak: "break-word",     // ✅ Wrap within word if necessary
        lineHeight: 1.2,             // ✅ Improve readability

        [breakpoints.up("xl")]: {
            opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
            maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
            marginLeft: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(10),
            transition: transitions.create(["opacity", "margin"], {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.standard,
            }),
        },

        "& span": {
            fontWeight: active ? fontWeightRegular : fontWeightRegular,
            fontSize: size.sm,
            color: active ? palette.textColor.state : palette.textColor.main,
        },
    };
}

export { collapseItem, collapseIconBox, collapseIcon, collapseText };