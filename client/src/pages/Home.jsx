import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import Spinner from "../LoadSpinner/Spinner";
import Layout from "../Layout/Layout";
import Model from "../Layout/Models/Model";
import API from "../services/api";

import moment from "moment";
import { MdAddTask } from "react-icons/md";
import { Button, Grid, Modal, Stack, Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import AdminHome from "./Admin/AdminHome";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { loading, error, user } = useDispatch((state) => state.auth);
  const [showModal, setShowModal] = React.useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  // page state
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  // slice of page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const getBloodrecords = async () => {
    try {
      const { data } = await API.get(`/inventory/get-inventory`);
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodrecords();
  }, []);

  return (
    <>
      <Layout>
        {user?.role === "admin" && location.pathname === "/admin" && (
          <AdminHome />
        )}
        {error && <span>{toast.error(error)}</span>}
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Grid container>
              <Typography variant="h4" spacing={2} p={2}>
                <Button
                  startIcon={<MdAddTask size={"22px"} />}
                  onClick={handleOpenModal}
                >
                  Add Inventory
                </Button>
              </Typography>
            </Grid>
            <Modal open={showModal} onClose={handleClose}>
              <Model />
            </Modal>

            <Stack
              container
              sx={{ d: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Table sx={{ backgroundColor: "#3976d2", color: "#FFF" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                      align="center"
                    >
                      BloodGroup
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      InventoryType
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Quantity (ML)
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Donor Email
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentRecords?.map((datas) => (
                    <TableRow key={datas._id}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "1px solid #FFF" }}
                      >
                        {datas.bloodGroup}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "1px solid #FFF" }}
                      >
                        {datas.inventoryType}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "1px solid #FFF" }}
                      >
                        {datas.quantity}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "1px solid #FFF" }}
                      >
                        {datas.email}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ borderBottom: "1px solid #FFF" }}
                      >
                        {moment(datas?.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Grid item sx={{ margin: "35px" }} spacing={1}>
                <Pagination
                  count={Math.ceil(data.length / recordsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Grid>
            </Stack>
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
