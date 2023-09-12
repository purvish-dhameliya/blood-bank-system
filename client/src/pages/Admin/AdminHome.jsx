import React from "react";
import Layout from "../../Layout/Layout";
import { useSelector } from "react-redux";
import { Box, Skeleton, Typography, Grid } from "@mui/material";
import banner1 from '../../assets/b1.jpg'

const AdminHome = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Layout>
      <Box>
        {loading ? (
          <Skeleton animation="wave" variant="h1" height={50} />
        ) : (
          <Grid container spacing={2} sx={{d:"flex",justifyContent:"center",alignItems:"center"}}>
            <Grid item xs={12} sm={6}>
            <Box component="img" src={banner1} alt={"caption"} sx={{ height: "350px", width: "450px" }}></Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography color="darkblue" variant="h2">
                Welcome Admin {user?.role}
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus id ipsum ipsum. Curabitur ut ante purus. Mauris non
                metus id mi fermentum volutpat. Integer eleifend velit ac enim
                tempus, et venenatis mi faucibus. Sed aliquet tristique
                vestibulum.
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Layout>
  );
};

export default AdminHome;
