import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header";
import API from "../../services/api";
import {
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Pagination } from "@mui/material";

let colors = [
  "#E4F1FE",
  "#8DC6FF",
  "#F6F1F1",
  "#BAD1C2",
  "#E5E0FF",
  "#D6E4E5",
  "#E8F9FD",
  "#AAC4FF",
];
const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventory, setInventory] = useState([]);

  // page state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  // slice of page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = inventory.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getBloodGroupDetails = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroup-data");

      if (data?.success) {
        setData(data?.bloodGroupData);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupDetails();
  }, []);

  const getrecentInventory = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");

      if (data?.success) {
        setInventory(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getrecentInventory();
  }, []);

  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "30px 0px",
          flexWrap: "wrap",
        }}
      >
        {data?.map((datas, i) => (
          <Grid key={datas._id} item xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                textAlign: "center",
                minHeight: "200px",
                backgroundColor: `${colors[i]}`,
              }}
            >
              <CardContent sx={{ gap: 1, display: "grid" }}>
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    d: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {datas?.bloodGroup}
                </Typography>
                <Typography variant="body4">
                  Total In: {datas.totalIn}
                </Typography>
                <Typography variant="body4">
                  Total Out: {datas.totalOut}
                </Typography>
                <Typography variant="body4">
                  Total Available: {datas.availableBlood}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container sx={{ marginTop: "30px" }}>
        <Typography variant="h6" p={2}>
          Recent Blood Transactions
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Blood Group</TableCell>
              <TableCell align="center">Inventory Type</TableCell>
              <TableCell align="center">Quantity (ML)</TableCell>
              <TableCell align="center">Donor's Email</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords?.map((datas) => (
              <TableRow key={datas._id}>
                <TableCell align="center">{datas.bloodGroup}</TableCell>
                <TableCell align="center">{datas.inventoryType}</TableCell>
                <TableCell align="center">{datas.quantity} (ML)</TableCell>
                <TableCell align="center">{datas.email}</TableCell>
                <TableCell align="center">
                  {moment(datas?.createdAt).format("DD/MM/YYYY hh:mm A")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid
        item
        sx={{
          padding: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={1}
      >
        <Pagination
          count={Math.ceil(data.length / recordsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </>
  );
};

export default Analytics;
