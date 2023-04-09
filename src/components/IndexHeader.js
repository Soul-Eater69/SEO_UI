import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navBar: {
    width: "100%",
    height: "5rem",
    boxShadow: "0px 0px 4px rgb(0 0 0/0.2)",
    position: "fixed",
    zIndex: "100",
    padding: "6px 20px",
    backdropFilter: "blur(22px)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

const IndexHeader = () => {
  const classes = useStyles();
  return (
    <header className={classes.navBar}>
      <span className={classes.header_title}>Deepawali</span>
    </header>
  );
};

export default IndexHeader;
