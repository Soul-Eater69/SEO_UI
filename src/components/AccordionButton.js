import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import "./AccordianButton.css";

const useStyles = makeStyles({
  th: {
    textAlign: "left",
    padding: "8px",
  },
  td: {
    textAlign: "left",
    padding: "8px",
  },
  tr: {
    "&:nth-child(odd)": {
      backgroundColor: "#f4f8fb",
    },
    borderTop: ".14rem solid rgb(0 0 0/0.1)",
  },
});

const AccordionButton = ({ data, children, sx }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="accordion-container" style={{ ...sx }}>
      {isOpen && (
        <Button
          style={{ background: "black", margin: ".8rem" }}
          variant="contained"
          onClick={() => setIsOpen(!isOpen)}
        >
          Show Details
        </Button>
      )}

      {!isOpen && (
        <>
          {children}
          <Button
            style={{ background: "black", margin: ".8rem" }}
            variant="contained"
            onClick={() => setIsOpen(!isOpen)}
          >
            Hide Details
          </Button>
        </>
      )}
    </div>
  );
};

export default AccordionButton;
