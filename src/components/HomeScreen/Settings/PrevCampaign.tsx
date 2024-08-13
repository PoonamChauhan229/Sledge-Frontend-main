import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as CalenderIcon } from "../../../assets/CalenderIcon.svg";
import { ReactComponent as LoanIcon } from "../../../assets/LoanIcon.svg";
import { ReactComponent as MessageIcon } from "../../../assets/MsgIcon.svg";
import { ReactComponent as EyeIcon } from "../../../assets/eyeIcon.svg";
import Paper from "@mui/material/Paper";

function createData(
  cname: string,
  startDate: string,
  endDate: string,
  nofViews: string,
  amountPaid: number,
  nofClicks: number,
  tgLocation: string
) {
  return {
    cname,
    startDate,
    endDate,
    nofViews,
    amountPaid,
    nofClicks,
    tgLocation,
  };
}

const rows = [
  createData(
    "Updated in Digital Marketing ...",
    "15/03/2024",
    "15/04/2024",
    "50k",
    10000,
    100,
    "Coimbatore"
  ),
  createData(
    "Updated in Digital Marketing ...",
    "15/03/2024",
    "15/04/2024",
    "50k",
    10000,
    100,
    "Coimbatore"
  ),
  createData(
    "Updated in Digital Marketing ...",
    "15/03/2024",
    "15/04/2024",
    "50k",
    10000,
    100,
    "Coimbatore"
  ),
  createData(
    "Updated in Digital Marketing ...",
    "15/03/2024",
    "15/04/2024",
    "50k",
    10000,
    100,
    "Coimbatore"
  ),
];

export default function PrevCampaign() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromTab !== undefined) {
      const selectedTab = location.state.fromTab;
      console.log("Received state:", selectedTab);
      // Perform any actions you need with the selectedTab state
    }
  }, [location]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="hostevents">
      <Box sx={{ width: "90%", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#000",
            padding: "20px",
          }}
        >
          <Typography>
            <Link
              to={{
                pathname: "/settings",
              }}
              state={location.state}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <ArrowBackIosIcon />
            </Link>
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: "#fff", textAlign: "center", flex: "1" }}
          >
            Previous Campaigns
          </Typography>
        </div>

        <Grid container sx={{ marginTop: "2rem" }}>
          <Grid xs={12} item sx={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                width: "15%",
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "15px",
                margin: "5px",
                alignItems: "center",
              }}
            >
              <CalenderIcon style={{ height: "50px", width: "50px" }} />
              <div style={{ marginLeft: "5px" }}>
                <p style={{ margin: 0, color: "gray" }}>Total Campaign</p>
                <h5 style={{ margin: 0, color: "#fff" }}>15</h5>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "15%",
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "15px",
                margin: "5px",
                alignItems: "center",
              }}
            >
              <LoanIcon style={{ height: "50px", width: "50px" }} />
              <div style={{ marginLeft: "5px" }}>
                <p style={{ margin: 0, color: "gray" }}>Total Amount Paid</p>
                <h5 style={{ margin: 0, color: "#fff" }}>1500</h5>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "15%",
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "15px",
                margin: "5px",
                alignItems: "center",
              }}
            >
              <MessageIcon style={{ height: "50px", width: "50px" }} />
              <div style={{ marginLeft: "5px" }}>
                <p style={{ margin: 0, color: "gray" }}>Total Clicks</p>
                <h5 style={{ margin: 0, color: "#fff" }}>15</h5>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "15%",
                border: "1px solid gray",
                padding: "10px",
                borderRadius: "15px",
                margin: "5px",
                alignItems: "center",
              }}
            >
              <EyeIcon style={{ height: "50px", width: "50px" }} />
              <div style={{ marginLeft: "5px" }}>
                <p style={{ margin: 0, color: "gray" }}>Total Views</p>
                <h5 style={{ margin: 0, color: "#fff" }}>15k</h5>
              </div>
            </div>
          </Grid>
          <Grid xs={12} item sx={{ marginTop: "5rem" }}>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: "rgba(27, 27, 27, 1)" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#111" }}>
                    <TableCell sx={{ color: "#fff" }} align="center">
                      Campaign Name
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      start Date
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      End Date
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Number of Views
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Amount Paid
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Number of Clicks on the Ad
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#fff" }}>
                      Target Location
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.cname}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "#fff" }}
                        align="center"
                      >
                        {row.cname}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {row.startDate}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {row.endDate}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {row.nofViews}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {row.amountPaid}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {row.nofClicks}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "#fff" }}>
                        {row.tgLocation}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ color: "#fff", display: "flex", justifyContent: "center" }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
