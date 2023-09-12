import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiDonateBlood } from "react-icons/bi";
import { Badge, Drawer } from "@mui/material";
import Sidebar from "./Sidebar";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); //remove token when user logs out
    toast.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <IconButton>
            <BiDonateBlood size={"40px"} />
          </IconButton>
          <Typography variant="p" sx={{ flexGrow: 2 }}>
            Welcome {user?.name || user?.organizationName || user?.hospitalName}
            <Badge
              badgeContent={user?.role}
              color="warning"
              sx={{ display: "inlineBlock", pl: "40px" }}
            ></Badge>
          </Typography>
          {location.pathname === "/" ||
          location.pathname === "/donor" ||
          location.pathname === "/hospital" ? (
            <>
              <Button
                component={Link}
                to="/analytics"
                varient="outlined"
                color="inherit"
              >
                Analytics
              </Button>
            </>
          ) : (
            <>
              {user?.role === "admin" ? (
                <Button
                  component={Link}
                  to="/admin"
                  color="inherit"
                  sx={{ m: 1 }}
                >
                  Home
                </Button>
              ) : (
                <Button component={Link} to="/" color="inherit" sx={{ m: 1 }}>
                  Home
                </Button>
              )}
            </>
          )}
          <Button
            color="error"
            sx={{ backgroundColor: "black" }}
            onClick={handleLogout}
          >
            LogOut
          </Button>
        </Toolbar>
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
          <Sidebar />
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Header;
