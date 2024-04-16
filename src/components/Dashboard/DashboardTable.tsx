/**
 * This is a React.js component that will return the
 * dashboard feature to the page when data is present
 * and loading from endpoint is complete
 *
 * @param {object[]}  data - The data returned from an endpoint can be passed as props for rendering.
 * @param {string} Title - Title for the dashboard.
 * @returns {JSX.Element} - A JSX element for the dashboard containing an individual row for each bill.
 */

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { DashboardRow } from "./DasboardRow";
import { nanoid } from "@reduxjs/toolkit";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import { getStatus } from "./DashboardSlice";

const createData = (
  billNo: string,
  billType: string,
  status: string,
  sponsors: object,
  longTitleEn: string,
  longTitleGa: string
) => {
  return { billNo, billType, status, sponsors, longTitleEn, longTitleGa };
};

const columns = ["Bill No", "Type", "Status", "Sponsors"];

type BillDataType = {
  billNo: string;
  billType: string;
  status: string;
  sponsors: object;
  longTitleEn: string;
  longTitleGa: string;
};

type DataType = {
  bill?: BillDataType;
};

export default function DashboardTable({
  data,
  title,
}: {
  data: object[];
  title: string;
}) {
  const [pg, setpg] = useState<number>(0);
  const [rpg, setrpg] = useState<number>(5);
  const [filter, setFilter] = useState<string>("");

  const status = useSelector(getStatus);

  const rows = data.map((key: DataType) => {
    const { billNo, billType, status, longTitleEn, sponsors, longTitleGa } =
      key.bill as BillDataType;
    return createData(
      billNo,
      billType,
      status,
      sponsors,
      longTitleEn,
      longTitleGa
    );
  });

  function handleChangePage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newpage: number
  ) {
    setpg(newpage);
  }

  function handleChangeRowsPerPage(e: React.ChangeEvent<HTMLInputElement>) {
    setrpg(parseInt(e.target.value, 10));
    setpg(0);
  }

  return (
    <>
      {status === "fulfilled" ? (
        <Paper>
          <h1 style={{ textAlign: "center", color: "#B39841" }}>{title}</h1>
          <TextField
            id='standard-basic'
            size='medium'
            label='Filter by Bill type'
            variant='standard'
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={nanoid()}
                      align={column !== "Bill No" ? "right" : "center"}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .filter((row) =>
                    row.billType
                      .toLowerCase()
                      .includes(filter.toLocaleLowerCase())
                  )
                  .slice(pg * rpg, pg * rpg + rpg)
                  .map((row) => {
                    return <DashboardRow key={nanoid()} row={row} />;
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component='div'
            count={rows.length}
            rowsPerPage={rpg}
            page={pg}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Spinner size={360} />
      )}
    </>
  );
}
