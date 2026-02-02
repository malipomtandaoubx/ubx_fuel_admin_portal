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

import React, { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 React example components
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

function DataTable({
    entriesPerPage,
    canSearch,
    showTotalEntries,
    table,
    pagination,
    isSorted,
    noEndBorder,
}) {
    const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
    const entries = entriesPerPage.entries ? entriesPerPage.entries.map((el) => el.toString()) : ["10", "25", "50", "100"];
    const columns = useMemo(() => table.columns, [table]);
    const data = useMemo(() => table.rows, [table]);

    // this was being used previously but now commented beacuse seraching not working if having any issue with table just uncomment this code (20251010) 
    // const tableInstance = useTable(
    //     { columns, data, initialState: { pageIndex: 0 } },
    //     useGlobalFilter,
    //     useSortBy,
    //     usePagination
    // );

    // added this new code for searching beacuse seraching not working, comment out this code and uncomment upper code (20251010) 
    // Helper function to extract text from React elements
    const extractTextFromReactElement = (element) => {
        if (typeof element === 'string') return element;
        if (typeof element === 'number') return String(element);

        let text = '';

        // Handle React elements
        if (element.props && element.props.children) {
            React.Children.forEach(element.props.children, (child) => {
                if (typeof child === 'string') {
                    text += child;
                } else if (React.isValidElement(child)) {
                    text += extractTextFromReactElement(child);
                } else if (typeof child === 'number') {
                    text += String(child);
                }
            });
        }

        return text;
    };

    // added this new code for searching beacuse seraching not working, comment out this code and uncomment upper code (20251010) 
    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            autoResetPage: false, // Prevents pageIndex from resetting on data change
            globalFilter: (rows, columnIds, filterValue) => {
                return rows.filter(row => {
                    const searchString = filterValue?.toLowerCase() || '';

                    if (!searchString) return true;

                    return Object.entries(row.values).some(([key, value]) => {
                        if (key === 'action') return false;

                        let searchText = '';

                        if (React.isValidElement(value)) {
                            searchText = extractTextFromReactElement(value);
                        } else if (typeof value === 'string' || typeof value === 'number') {
                            searchText = String(value);
                        }

                        return searchText.toLowerCase().includes(searchString);
                    });
                });
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page,
        pageOptions,
        canPreviousPage,
        canNextPage,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, globalFilter },
    } = tableInstance;

    // Set the default value for the entries per page when component mounts
    useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

    // Set the entries per page value based on the select value
    const setEntriesPerPage = (value) => setPageSize(value);

    // Render the paginations
    const renderPagination = pageOptions.map((option) => (
        <MDPagination item key={option} onClick={() => gotoPage(Number(option))} active={pageIndex === option}>
            {option + 1}
        </MDPagination>
    ));

    // Handler for the input to set the pagination index
    const handleInputPagination = ({ target: { value } }) =>
        value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

    // Customized page options starting from 1
    const customizedPageOptions = pageOptions.map((option) => option + 1);

    // Setting value for the pagination input
    const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

    // Search input value state
    const [search, setSearch] = useState(globalFilter);

    // Search input state handle
    const onSearchChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 100);

    // A function that sets the sorted value for the table
    const setSortedValue = (column) => {
        let sortedValue;

        if (isSorted && column.isSorted) {
            sortedValue = column.isSortedDesc ? "desc" : "asce";
        } else if (isSorted) {
            sortedValue = "none";
        } else {
            sortedValue = false;
        }

        return sortedValue;
    };

    // Setting the entries starting point
    const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

    // Setting the entries ending point
    let entriesEnd;

    if (pageIndex === 0) {
        entriesEnd = pageSize;
    } else if (pageIndex === pageOptions.length - 1) {
        entriesEnd = rows.length;
    } else {
        entriesEnd = pageSize * (pageIndex + 1);
    }

    return (
        <TableContainer sx={{ boxShadow: "none" }}>
            {entriesPerPage || canSearch ? (
                <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    {entriesPerPage && (
                        <MDBox display="flex" alignItems="center">
                            <Autocomplete
                                disableClearable
                                value={pageSize.toString()}
                                options={entries}
                                onChange={(event, newValue) => {
                                    setEntriesPerPage(parseInt(newValue, 10));
                                }}
                                size="small"
                                sx={{ width: "5rem" }}
                                renderInput={(params) => <MDInput {...params} />}
                            />
                            <MDTypography variant="caption" color="secondary">
                                &nbsp;&nbsp;entries per page
                            </MDTypography>
                        </MDBox>
                    )}
                    {canSearch && (
                        <MDBox width="12rem" ml="auto">
                            <MDInput
                                placeholder="Search..."
                                value={search}
                                size="small"
                                fullWidth
                                onChange={({ currentTarget }) => {
                                    setSearch(currentTarget.value);
                                    onSearchChange(currentTarget.value);
                                }}
                            />
                        </MDBox>
                    )}
                </MDBox>
            ) : null}
            <Table {...getTableProps()}>
                <MDBox component="thead">
                    {headerGroups.map((headerGroup, key) => (
                        <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, idx) => (
                                <DataTableHeadCell
                                    key={idx}
                                    {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                                    width={column.width ? column.width : "auto"}
                                    align={column.align ? column.align : "left"}
                                    sorted={setSortedValue(column)}
                                >
                                    {column.render("Header")}
                                </DataTableHeadCell>
                            ))}
                        </TableRow>
                    ))}
                </MDBox>
                <TableBody {...getTableBodyProps()}>
                    {page.map((row, key) => {
                        prepareRow(row);
                        return (
                            <TableRow key={key} {...row.getRowProps()}>
                                {row.cells.map((cell, idx) => (
                                    <DataTableBodyCell
                                        key={idx}
                                        noBorder={noEndBorder && rows.length - 1 === key}
                                        align={cell.column.align ? cell.column.align : "left"}
                                        {...cell.getCellProps()}
                                    >
                                        {cell.render("Cell")}
                                    </DataTableBodyCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            <MDBox
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
            >
                {showTotalEntries && (
                    <MDBox mb={{ xs: 3, sm: 0 }}>
                        <MDTypography variant="button" color="secondary" fontWeight="regular">
                            Showing {entriesStart} to {entriesEnd} of {rows.length} entries
                        </MDTypography>
                    </MDBox>
                )}
                {/* {pageOptions.length > 1 && (
                    <MDPagination
                        variant={pagination.variant ? pagination.variant : "gradient"}
                        color={pagination.color ? pagination.color : "info"}
                    >
                        {canPreviousPage && (
                            <MDPagination item onClick={() => previousPage()}>
                                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                            </MDPagination>
                        )}
                        {renderPagination.length > 6 ? (
                            <MDBox width="5rem" mx={1}>
                                <MDInput
                                    inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                                    value={customizedPageOptions[pageIndex]}
                                    onChange={(handleInputPagination, handleInputPaginationValue)}
                                />
                            </MDBox>
                        ) : (
                            renderPagination
                        )}
                        {canNextPage && (
                            <MDPagination item onClick={() => nextPage()}>
                                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                            </MDPagination>
                        )}
                    </MDPagination>
                )} */}
                {pageOptions.length > 1 && (
                    <MDPagination
                        variant={pagination.variant ? pagination.variant : "gradient"}
                        color={pagination.color ? pagination.color : "info"}
                    >
                        {canPreviousPage && (
                            <MDPagination item onClick={() => previousPage()}>
                                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                            </MDPagination>
                        )}

                        {/* Always show first page */}
                        <MDPagination
                            item
                            onClick={() => gotoPage(0)}
                            active={pageIndex === 0}
                        >
                            1
                        </MDPagination>

                        {/* Show ellipsis after first page if needed */}
                        {pageIndex > 2 && (
                            <MDPagination item disabled>
                                ...
                            </MDPagination>
                        )}

                        {/* Show pages around current page */}
                        {pageOptions.map((option) => {
                            // Skip first and last pages as they're already shown separately
                            if (option === 0 || option === pageOptions.length - 1) {
                                return null;
                            }
                            // Show pages around current page (1 before and 1 after)
                            if (option >= pageIndex - 1 && option <= pageIndex + 1) {
                                // Only show if not too close to first or last page
                                if (pageIndex <= 2 && option <= 3) {
                                    return (
                                        <MDPagination
                                            item
                                            key={option}
                                            onClick={() => gotoPage(Number(option))}
                                            active={pageIndex === option}
                                        >
                                            {option + 1}
                                        </MDPagination>
                                    );
                                } else if (pageIndex >= pageOptions.length - 3 && option >= pageOptions.length - 4) {
                                    return (
                                        <MDPagination
                                            item
                                            key={option}
                                            onClick={() => gotoPage(Number(option))}
                                            active={pageIndex === option}
                                        >
                                            {option + 1}
                                        </MDPagination>
                                    );
                                } else if (pageIndex > 2 && pageIndex < pageOptions.length - 3) {
                                    return (
                                        <MDPagination
                                            item
                                            key={option}
                                            onClick={() => gotoPage(Number(option))}
                                            active={pageIndex === option}
                                        >
                                            {option + 1}
                                        </MDPagination>
                                    );
                                }
                            }
                            return null;
                        }).filter(Boolean)}

                        {/* Show ellipsis before last page if needed */}
                        {pageIndex < pageOptions.length - 3 && (
                            <MDPagination item disabled>
                                ...
                            </MDPagination>
                        )}

                        {/* Always show last page if different from first */}
                        {pageOptions.length > 1 && (
                            <MDPagination
                                item
                                onClick={() => gotoPage(pageOptions.length - 1)}
                                active={pageIndex === pageOptions.length - 1}
                            >
                                {pageOptions.length}
                            </MDPagination>
                        )}

                        {canNextPage && (
                            <MDPagination item onClick={() => nextPage()}>
                                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                            </MDPagination>
                        )}
                    </MDPagination>
                )}
            </MDBox>
        </TableContainer>
    );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
    entriesPerPage: { defaultValue: 10, entries: [10, 25, 50, 100] },
    canSearch: false,
    showTotalEntries: true,
    pagination: { variant: "gradient", color: "info" },
    isSorted: true,
    noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
    entriesPerPage: PropTypes.oneOfType([
        PropTypes.shape({
            defaultValue: PropTypes.number,
            entries: PropTypes.arrayOf(PropTypes.number),
        }),
        PropTypes.bool,
    ]),
    canSearch: PropTypes.bool,
    showTotalEntries: PropTypes.bool,
    table: PropTypes.objectOf(PropTypes.array).isRequired,
    pagination: PropTypes.shape({
        variant: PropTypes.oneOf(["contained", "gradient"]),
        color: PropTypes.oneOf([
            "primary",
            "secondary",
            "info",
            "success",
            "warning",
            "error",
            "dark",
            "light",
        ]),
    }),
    isSorted: PropTypes.bool,
    noEndBorder: PropTypes.bool,
};

export default DataTable;