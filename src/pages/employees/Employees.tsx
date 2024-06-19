import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import { Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { empIdDataUpdate, getEmpList } from "../../slices/employeesSlices";
import Model from "../../components/Model";
import { Column, EmpUpdateValues, PageControl } from "../../utility/interfaces";


const columns: readonly Column[] = [
    { id: "title", label: "Title" },

    {
        id: "category",
        label: "Category",
    },
    {
        id: "availabilityStatus",
        label: "Availability status",
    },
    {
        id: "price",
        label: "Price",
    },
    {
        id: "rating",
        label: "Rating",
    },
    {
        id: "thumbnail",
        label: "Thumbnail"
    }
];



export default function Employees() {
    const dispatch = useDispatch<AppDispatch>();

    const { employeesList, loading } = useSelector(
        (state: RootState) => state.employees
    );

    const [tableListControl, setTableListControl] = useState<PageControl>({
        page: 1,
        rowsPerPage: 10
    })
    const [apiParams, setApiParams] = useState({ limit: 10, skip: 0 }
    )
    const convertPageNate = () => {
        return Math.ceil(employeesList.total / tableListControl.rowsPerPage)
    }
    const [open, setOpen] = React.useState(false);
    const handleChangePage = (event: unknown, newPage: number) => {
        setTableListControl((prs: PageControl) => {
            return {
                ...prs,
                page: newPage
            }
        });
        setApiParams((prs) => {
            return {
                ...prs,
                limit: tableListControl.rowsPerPage,
                skip: ((newPage - 1) * tableListControl.rowsPerPage)
            }
        })
        // dispatch(getEmpList(apiParams));
    };
    const [empInitialValues, setEmpInitialValues] = useState<EmpUpdateValues>(
        {
            title: "",
            availabilityStatus: "",
            price: "",
            rating: "",
            category: "",
            id: ""
        }
    )

    useEffect(() => {

        dispatch(getEmpList(apiParams));

    }, [dispatch, tableListControl.page, apiParams]);

    const modelOpen = (params: EmpUpdateValues) => {
        setOpen(true);
        setEmpInitialValues((prs: EmpUpdateValues) => {
            return {
                ...prs,
                title: params.title,
                availabilityStatus: params.availabilityStatus,
                price: params.price,
                rating: params.rating,
                category: params.category,
                id: params.id
            }
        })
    }
    const handleClose = () => {
        setOpen(false)
    }

    const empDataUpdate = (params: any) => {
        dispatch(empIdDataUpdate(params));
        setOpen(false);
    }

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                // style={{ minWidth: column.minWidth }}
                                >
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {column.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : (

                            employeesList.products
                                .map((row, index) => {
                                    return (

                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === "thumbnail" ? (
                                                        <img src={row[column.id]} alt="Thumbnail" style={{ width: 50, height: 50 }} />
                                                    ) : column.id === 'title' ? (
                                                        <Button onClick={() => modelOpen(row)}>{row[column.id]}</Button>
                                                    ) : (
                                                        row[column.id]
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    )
                                })

                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <Pagination
                    count={convertPageNate()}
                    page={tableListControl.page}
                    onChange={handleChangePage}
                    variant="outlined"
                />
            </Box>
            <Model open={open} handleClose={handleClose} empInitialValues={empInitialValues} empDataUpdate={empDataUpdate} />

        </Paper>
    );
}
