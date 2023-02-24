import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png"
          alt="NASA Logo"
          height="48"
        />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Your Name
        </Typography>
        <Typography variant="h6">Astronomy Picture of the Day</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
