import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import moment from "moment";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import API from "../../services/api";
import b4 from "../../assets/b5.jpg";
import { useSelector } from "react-redux";

const Hospital = () => {
  const { loading } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  //find donar records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      //   console.log(data);
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <>
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
              src={b4}
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
              Hospital Contact Details
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
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Adress</TableCell>
                    <TableCell align="center">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((datas) => (
                    <TableRow key={datas._id}>
                      <TableCell component="th" scope="row" align="center">
                        {datas?.name}{" "}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {datas?.email}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {datas?.phone}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {datas?.address}
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
    </>
  );
};

export default Hospital;
