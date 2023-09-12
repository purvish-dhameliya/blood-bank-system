import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import { useSelector } from "react-redux";

const Model = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => state.auth);
  const handleModelSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        toast.error("Please Provide all Feilds..");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organization: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        toast.success("New Inventory Created");
      } else {
        toast.error("Inventory Creation Failed");
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      <Grid
        container
        sx={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          m: "8em",
          cursor: "pointer",
          backgroundColor: "floralwhite",
          color: "Highlight",
          paddingY: "70px",
          marginY: "70px",
          mr: "5px",
          ml: "5px",
        }}
      >
        <Grid item xs={12} md={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Manage Blood Records
            </FormLabel>
            <RadioGroup
              cloumns
              name="InRadio"
              value={inventoryType}
              onChange={(e) => {
                setInventoryType(e.target.value);
              }}
            >
              <FormControlLabel value="in" control={<Radio />} label="In" />
              <FormControlLabel value="out" control={<Radio />} label="Out" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} mb={2}>
          <FormControl sx={{ minWidth: 250, color: "InfoText" }} size="small">
            <InputLabel id="demo-select-small-label" color="warning">
              BloodGroup
            </InputLabel>
            <Select
              labelId="demo-select-large-label"
              id="demo-select-small"
              value={bloodGroup}
              label=""
              onChange={(e) => setBloodGroup(e.target.value)}
              variant="filled"
              color="warning"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} mb={2}>
          <FormControl sx={{ minWidth: 250, color: "InfoText" }}>
            <TextField
              variant="filled"
              label="Email "
              autoComplete="off"
              type="email"
              color="warning"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12} mb={2}>
          <TextField
            label="Quantity (ML)"
            variant="filled"
            autoComplete="off"
            color="warning"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleModelSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Model;
