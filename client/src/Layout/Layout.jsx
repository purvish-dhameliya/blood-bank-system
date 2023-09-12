import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Grid, Container } from "@mui/material";

const Layout = ({ children, toggleDrawer }) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header toggleDrawer={toggleDrawer} />
      <Container style={{ flex: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
