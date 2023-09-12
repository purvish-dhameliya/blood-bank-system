import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import moment from "moment";
import {
  Box,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import donorImage from "../../assets/b2.jpg";

const DonateList = () => {
  const [data, setData] = useState([]);
  const { loading } = useSelector((state) => state.auth);

  const getDonorList = async () => {
    try {
      const { data } = await API.get("/admin/donor-list");
      if (data.success) {
        setData(data?.donorList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you want to delete donor ");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donor/${id}`);
      toast.error(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonorList();
  }, []);
  return (
    <Layout>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
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
                  <TableCell align="center">Date </TableCell>
                  <TableCell align="center">Action</TableCell>
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
                    <TableCell component="th" scope="row" align="center">
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={(e) => handleDelete(datas._id)}
                      >
                        Delete
                      </Button>
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

export default DonateList;
