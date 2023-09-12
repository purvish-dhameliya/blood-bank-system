import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import moment from "moment";
import API from "../../services/api";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import donorImage from "../../assets/b3.jpg";

const Donor = () => {
  const [data, setData] = useState([]);
  const { user, loading } = useSelector((state) => state.auth);
  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donors");
      //   console.log(data);
      if (data?.success) {
        setData(data?.donors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <img
            src={donorImage}
            alt="Donor"
            style={{ width: "500px", borderRadius: "8px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" color={"darkblue"}>
            Donor List
          </Typography>
          {loading ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">name</TableCell>
                  <TableCell align="center">email</TableCell>
                  <TableCell align="center">phone</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">name</TableCell>
                  <TableCell align="center">email</TableCell>
                  <TableCell align="center">phone</TableCell>
                  <TableCell align="center">Date & Time </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((datas) => (
                  <TableRow key={datas._id}>
                    <TableCell component="th" scope="row" align="center">
                      {datas?.name || datas?.organizationName + " (ORG)"}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {datas?.email}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {datas?.phone}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {moment(datas?.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Donor;
