import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { toast } from "react-toastify";
import API from "../../services/api";
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
import moment from "moment";
import { useSelector } from "react-redux";
import b3 from "../../assets/b3.jpg";

const OrgList = () => {
  const [data, setData] = useState([]);
  const { loading } = useSelector((state) => state.auth);

  const getOrganizationList = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data.success) {
        setData(data?.orgList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizationList();
  }, []);

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt("Are you want to delete donor ", "Sure");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-org/${id}`);
      toast.error(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
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
            src={b3}
            alt="Donor"
            style={{ width: "350px", borderRadius: "8px" }}
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
                      {datas?.organizationName}{" "}
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

export default OrgList;
