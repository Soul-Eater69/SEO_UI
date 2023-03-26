import React from "react";
import { makeStyles } from "@mui/styles";
import SearchSection from "./SearchSection";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem 3rem",
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
