import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const getYear = new Date();

const Footer = () => {
  return (
    <>
      <Stack sx={{ pb: 0, mb: 0 }}>
        <Box
          color="inherit"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: "22.3px",
            bgcolor: "#3976d2",
          }}
        >
          <Typography variant="body2">
            {" "}
            &copy;purvish dhameliya - {getYear.getFullYear()}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default Footer;
