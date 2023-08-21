import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomePage, SummaryPage } from "./pages";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["HOME", "SUMMARY"];

function App() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (route) => {
    setAnchorElNav(null);

    if (route) {
      navigate(route);
    }
  };

  const burgerMenuItems = pages.map((page) => {
    return (
      <MenuItem
        key={page}
        onClick={() => handleCloseNavMenu(ROUTES[`${page}`])}
      >
        <Typography textAlign="center">{page}</Typography>
      </MenuItem>
    );
  });

  const navbarMenuItems = pages.map((page) => {
    return (
      <Button
        key={page}
        onClick={() => handleCloseNavMenu(ROUTES[`${page}`])}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {page}
      </Button>
    );
  });

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Karuta Card Splitter
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu(null)}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {burgerMenuItems}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              onClick={() => handleCloseNavMenu(ROUTES.HOME)}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Karuta Card Splitter
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {navbarMenuItems}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/summary" element={<SummaryPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
