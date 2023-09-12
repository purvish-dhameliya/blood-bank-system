import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useLocation } from "react-router-dom";
import { FaHandHoldingMedical, FaHospital } from "react-icons/fa";
import { VscOrganization } from "react-icons/vsc";
import { useSelector } from "react-redux";

const SidebarContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MenuItem = styled(Grid)`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 8px;
  color: ${({ isactive }) => (isactive ? "#2196f3" : "inherit")};
  background-color: ${({ isactive }) => (isactive ? "#f5f5f5" : "inherit")};
  border-radius: ${({ isactive }) => (isactive ? "4px" : "0")};
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Sidebar = ({ toggleDrawer }) => {
  const location = useLocation();
  const isactive = (path) => location.pathname === path;
  const { user } = useSelector((state) => state.auth);

  return (
    <aside>
      <SidebarContainer>
        <Grid container>
          {user?.role === "organization" && (
            <>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/")}
                component={Link}
                to="/"
              >
                <FaHandHoldingMedical />
                <Typography variant="body1">Inventory</Typography>
              </MenuItem>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/donor")}
                component={Link}
                to="/donor"
              >
                <FaHandHoldingMedical />
                <Typography variant="body1">Donor</Typography>
              </MenuItem>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/hospital")}
                component={Link}
                to="/hospital"
              >
                <FaHospital />
                <Typography variant="body1">Hospital</Typography>
              </MenuItem>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/donor-list")}
                component={Link}
                to="/donor-list"
              >
                <FaHandHoldingMedical />
                <Typography variant="body1">Donor List</Typography>
              </MenuItem>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/hospital-list")}
                component={Link}
                to="/hospital-list"
              >
                <FaHospital />
                <Typography variant="body1">Hospital List</Typography>
              </MenuItem>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/org-list")}
                component={Link}
                to="/org-list"
              >
                <VscOrganization />
                <Typography variant="body1">Organization List</Typography>
              </MenuItem>
            </>
          )}

          {(user?.role === "donor" || user?.role === "hospital") && (
            <>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/organization")}
                component={Link}
                to="/organization"
              >
                <VscOrganization />
                <Typography variant="body1">Organization</Typography>
              </MenuItem>

              <MenuItem
                item
                xs={12}
                isactive={isactive("/consumer")}
                component={Link}
                to="/consumer"
              >
                <VscOrganization />
                <Typography variant="body1">Consumer</Typography>
              </MenuItem>
            </>
          )}

          {user?.role === "donor" && (
            <>
              <MenuItem
                item
                xs={12}
                isactive={isactive("/donation")}
                component={Link}
                to="/donation"
              >
                <FaHandHoldingMedical />
                <Typography variant="body1">Donation</Typography>
              </MenuItem>
            </>
          )}
        </Grid>
      </SidebarContainer>
    </aside>
  );
};

export default Sidebar;
