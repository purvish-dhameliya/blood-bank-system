import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import banner1 from "../../assets/banner1.jpg";
import { handleSignup } from "../../services/authServices";
import Spinner from "../../LoadSpinner/Spinner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { loading, error } = useDispatch((state) => state.auth);

  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <Grid
          container
          spacing={1}
          component="main"
          sx={{ width: "95vw", height: "98vh" }}
        >
          <Grid item md={8}>
            <img
              src={banner1}
              alt="signuppage"
              loading="lazy"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            p={4}
          >
            <Typography variant="h4" align="center">
              Sign up
            </Typography>
            <form
              onSubmit={(e) =>
                handleSignup(
                  e,
                  role,
                  name,
                  email,
                  organizationName,
                  hospitalName,
                  website,
                  address,
                  phone,
                  password
                )
              }
            >
              <Grid container spacing={0} sx={{ mt: 0, p: 1, pt: 0 }}>
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <RadioGroup
                    row
                    name="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="donor"
                      control={<Radio />}
                      label="Donor"
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="hospital"
                      control={<Radio />}
                      label="Hospital"
                    />
                    <FormControlLabel
                      value="organization"
                      control={<Radio />}
                      label="Organization"
                    />
                  </RadioGroup>
                </Grid>

                {(role === "admin" || role === "donor") && (
                  <Grid item xs={12} sx={{ pb: 2 }}>
                    <TextField
                      size="small"
                      label="Name"
                      autoComplete="off"
                      type="text"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                )}

                <Grid item xs={12} sx={{ pb: 2 }}>
                  <TextField
                    label="Email"
                    size="small"
                    type="email"
                    value={email}
                    autoComplete="off"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                {role === "organization" && (
                  <Grid item xs={12} sx={{ pb: 2 }}>
                    <TextField
                      label="organizationName"
                      type="text"
                      size="small"
                      autoComplete="off"
                      value={organizationName}
                      name="organizationName"
                      onChange={(e) => setOrganizationName(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                )}

                {role === "hospital" && (
                  <Grid item xs={12} sx={{ pb: 2 }}>
                    <TextField
                      label="Hospital"
                      autoComplete="off"
                      type="text"
                      size="small"
                      value={hospitalName}
                      name="hospital"
                      onChange={(e) => setHospitalName(e.target.value)}
                      fullWidth
                      required
                    />
                  </Grid>
                )}
                <Grid item xs={12} sx={{ pb: 2 }}>
                  <TextField
                    label="Website"
                    type="text"
                    size="small"
                    autoComplete="off"
                    value={website}
                    name="website"
                    onChange={(e) => setWebsite(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sx={{ pb: 2 }}>
                  <TextField
                    label="Address"
                    autoComplete="off"
                    type="text"
                    size="small"
                    value={address}
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sx={{ pb: 2 }}>
                  <TextField
                    label="Phone"
                    type="text"
                    value={phone}
                    autoComplete="off"
                    size="small"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sx={{ pb: 2 }}>
                  <TextField
                    label="Password"
                    type="password"
                    size="small"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Signup
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ m: 3, ml: 2 }}>
                    Already have an account? <Link to="/login">login here</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Signup;
