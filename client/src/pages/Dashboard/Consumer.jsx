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

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  //find org records
  const getOrganization = async () => {
    try {
      if (user?.role === "donor") {
        const { data } = await API.post("/inventory/get-inventory-hospital", {
          filters: {
            inventoryType: "out",
            hospital: user?._id,
          },
        });
        //   console.log(data);
        if (data?.success) {
          setData(data?.inventory);
       //   console.log('data.inventory:::::', setData(data?.inventory))
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get(
          "/inventory/get-organization-for-hospital"
        );
        //console.log("DATADSA", data);
        if (data?.success) {
          setData(data?.organization);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Box sx={{ d: "flex", justifyContent: "center", alignItems: "center" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">BloodGroup</TableCell>
              <TableCell align="center">InventoryType</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((datas) => (
              <TableRow key={datas._id}>
                <TableCell component="th" scope="row" align="center">
                  {datas?.bloodGroup}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {datas?.inventoryType}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {datas?.quantity}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {datas?.email}
                </TableCell>

                <TableCell component="th" scope="row" align="center">
                  {moment(datas?.createdAt).format("DD/MM/YYYY hh:mm A")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Layout>
  );
};

export default Consumer;
