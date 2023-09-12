import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import moment from "moment";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import API from "../../services/api";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getDonation = async () => {
    try {
      if (user?.role === "donor") {
        const { data } = await API.post("/inventory/get-inventory-hospital", {
          filters: {
            inventoryType: "in",
            hospital: "64a53b2c8dfc82418d3d00eb",
          },
        });
        if (data?.success) {
          console.log("INVENTORYYYYY::::::",data.inventory);
          setData(data?.inventory);
        }
      }

      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organization-for-hospital"
        );
        if (data?.success) {
          setData(data?.organization);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonation();
  }, []);

  return (
    <Layout>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Blood Group</TableCell>
              <TableCell align="center">Inventory Type</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item._id}>
                <TableCell align="center">{item.bloodGroup}</TableCell>
                <TableCell align="center">{item.inventoryType}</TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">
                  {moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Layout>
  );
};

export default Donation;
