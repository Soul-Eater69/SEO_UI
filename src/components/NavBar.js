import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navBar: {
    width: "100%",
    height: "5rem",
    background: "transparent",
    boxShadow: "0px 0px 4px rgb(0 0 0/0.2)",
    position: "fixed",
    zIndex: "100",
    padding:"6px 20px",
    backdropFilter: "blur(22px)",
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"center",
  },
});
const NavBar = () => {
  const classes = useStyles();
  return (
    <nav className={classes.navBar}>
      <h3>Deepawali</h3>
    </nav>
  );
};

export default NavBar;
