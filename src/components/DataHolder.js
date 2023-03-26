import React from "react";
import { makeStyles } from "@mui/styles";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles({
  data_container: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",

    background: "white",
  },

  obj_container: {
    display: "flex",
    flexDirection: "column",
    "&:hover": {
      boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
      transform: "scale(0.99)",
      background: "white",
    },
    cursor: "pointer",
    maxHeight: "max-content",
    minHeight: "min-content",
    transition: "transform 0.2s ease-in-out",
    position: "relative",
  },
  doneIcon: {
    color: "white",
    fontSize: "2.2rem !important",
    background: "#77e69e",
    borderRadius: "50%",
    padding: "3px",
  },
  closeIcon: {
    color: "white",
    fontSize: "2.2rem !important",
    background: "#ff5353",
    borderRadius: "50%",
    padding: "3px",
  },

  infoIcon:{
    fontSize: "2.2rem !important",
  },

  icon_position: {
    position: "absolute",
    right: 0,
    top: 0,
    transform: "translateY(-50%)",
  },
});

const DataHolder = ({ children, description, pass, required, sx, toIndex }) => {
  const classes = useStyles();
  const childArray = React.Children.toArray(children);

  return (
    <div className={classes.obj_container}>
      <div>
        <div className={classes.data_container} style={{ ...sx, width: "85%" }}>
          {toIndex ? childArray.slice(0, toIndex) : childArray.slice(0)}
        </div>
      </div>
      <div
        className={`${classes.right_element} ${classes.icon_position}`}
        style={{ margin: "5rem 5rem", position: "absolute" }}
      >
        {required ? (
          pass === 1 ? (
            <DoneIcon className={`${classes.doneIcon}`} />
          ) : (
            <CloseIcon className={classes.closeIcon} />
          )
        ) : (
          <InfoIcon className={classes.infoIcon}/>
        )}
      </div>
      {toIndex ? childArray.slice(toIndex) : null}
    </div>
  );
};

export default DataHolder;
