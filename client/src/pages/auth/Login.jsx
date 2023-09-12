import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import banner2 from "../../assets/banner2.jpg";
import { handleLogin } from "../../services/authServices";
import Spinner from "./../../LoadSpinner/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");

  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <Grid
          container
          spacing={0}
          component="main"
          sx={{ width: "95vw", height: "100vh" }}
        >
          <Grid item md={8} sx={{ p: 0 }}>
            <img
              src={banner2}
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
          >
            <Typography variant="h4" align="center">
              Login
            </Typography>
            <form
              onSubmit={(e) => {
                handleLogin(e, role, email, password);
              }}
            >
              <Grid container spacing={2} sx={{ p: 2, mt: 1 }}>
                <Grid item xs={12} sx={{ pb: 1 }}>
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

                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    autoComplete="off"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    autoComplete="off"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ mt: 1 }}>
                    Don't have an account?{" "}
                    <Link to="/register">Click here</Link>
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

export default Login;
