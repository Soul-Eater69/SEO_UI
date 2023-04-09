import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: "4rem",
    borderRadius: "4px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 1px  8px",
    padding: "16px",
    margin: "6px 6px",
    cursor: "pointer",
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
});

const RecommendationElementCard = ({ title, category, priority }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <span style={{ fontSize: "18px", fontWeight: 500, flex: 9 }}>
        {title}
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 3,
        }}
      >
        <span
          style={{
            background: "#363f46",
            color: "#fff",
            borderRadius: "5px",
            minWidth: "3.2rem",
            padding: "5px",
            maxWidth: "fit-content",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {category}
        </span>
        <span
          style={{
            background:
              priority === 0
                ? "#f05050"
                : priority === 1
                ? "#ffbd4a"
                : "#81c868",
            color: "#fff",
            borderRadius: "5px",
            minWidth: "2rem",
            padding: "5px",
            maxWidth: "fit-content",
            fontSize: "12px",
          }}
        >
          {priority === 0
            ? "High Priority"
            : priority === 1
            ? "Medium Priority"
            : "Low Priority"}
        </span>
      </div>
    </div>
  );
};

export default RecommendationElementCard;
