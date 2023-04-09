import React from "react";
import { makeStyles } from "@mui/styles";
import SearchSection from "./SearchSection";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    height: "5rem",
    boxShadow: "0px 0px 4px rgb(0 0 0/0.2)",
    zIndex: "100",
    padding: "6px 20px",
    backdropFilter: "blur(22px)",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "1rem",
  },

  header_title: {
    fontSize: "2rem",
  },
});

const IndexPage = () => {
  const classes = useStyles();

  return (
    <>
      <header className={classes.header}>
        <span className={classes.header_title}>Deepawali</span>
      </header>
      <SearchSection />
    </>
  );
};

export default IndexPage;
