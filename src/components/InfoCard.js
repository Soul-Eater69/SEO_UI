import React from "react";
import { makeStyles } from "@mui/styles";
import Chart from "react-apexcharts";
import display from "../assets/display.png";
import RadioChart from "./RadioChart";

const useStyles = makeStyles({
  cardContainer: {
    width: "80%",
    height: "max-content",
    boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
    margin: "1rem auto",
    padding: "10px",
  },

  horizontalFlex: {
    display: "flex",
  },
  verticalFlex: {
    display: "flex",
    flexDirection: "column",
  },

  chartContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center !important",
    alignItems: "center !important",
    width: "70%",
    margin: "1.8rem",
    boxShadow: "0px 0px 4px rgb(0 0 0/0.2)",
    borderRadius: "6px",
    padding: "3rem 3rem",
  },
  chartSpacing: {
    "& > *": {
      margin: "0px", // adjust the margin between the chart components
      flex: "1 0 0", // distribute the available space equally between the chart components
    },
  },
});

const InfoCard = ({
  domainName,
  gradePercentage,
  grade,
  recommendation,
  recommendations,
  screenshotUrl,
  onPageScore,
  performanceScore,
  usabilityScore,
  socialScore,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.cardContainer}>
      <span
        style={{
          fontSize: "1.7rem",
          fontWeight: "500",
          float: "right !important",
          margin: "2rem 2rem",
          marginBottom: "4rem",
        }}
      >
        Audit Results for {domainName}
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <div
          className={classes.horizontalFlex}
          style={{
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className={classes.verticalFlex}
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <RadioChart
              color={"#363f46"}
              percentage={gradePercentage}
              label={grade}
              size={65}
              height={255}
            />
            <span
              style={{
                fontSize: "23px",
                fontWeight: "500",
                margin: "0px 5px 5px 5px",
                marginBottom: "6px",
              }}
            >
              {recommendation}
            </span>
            <span
              style={{
                background: "#f05050",
                color: "white",
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              Recommendations : {recommendations.length}
            </span>
          </div>

          <div
            style={{
              position: "relative",
              marginRight: "3rem",
              marginLeft: "5rem",
              marginTop: "1rem",
            }}
          >
            <img src={display}></img>
            <img
              style={{
                position: "absolute",
                left: "15px",
                top: "1rem",
                height: "70%",
                width: "93%",
              }}
              src={`data:image/jpeg;base64,${screenshotUrl}`}
              alt="Screenshot"
            />
          </div>
        </div>

        <div className={`${classes.chartContainer} ${classes.chartSpacing}`}>
          <RadioChart
            color={"#2196f3"}
            percentage={onPageScore.gradePercentage}
            label={onPageScore.grade}
            size={65}
            height={170}
            width={"150px"}
            title={"On-Page SEO"}
          />

          <RadioChart
            color={"#9c27b0"}
            percentage={usabilityScore.gradePercentage}
            label={usabilityScore.grade}
            size={65}
            height={170}
            width={"150px"}
            title={"Usability"}
          />

          <RadioChart
            color={"#ff9800"}
            percentage={performanceScore.gradePercentage}
            label={performanceScore.grade}
            size={65}
            height={170}
            width={"150px"}
            title={"Performance"}
          />

          <RadioChart
            color={"#4caf50"}
            percentage={socialScore.gradePercentage}
            label={socialScore.grade}
            size={65}
            height={170}
            width={"150px"}
            title={"Social"}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
