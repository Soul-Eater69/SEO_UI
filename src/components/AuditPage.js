import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import OnPageSeo from "./OnPageSeo";
import Usability from "./Usability";
import Performance from "./Performance";
import NavBar from "./NavBar";
import Spinner from "react-bootstrap/Spinner";

const useStyles = makeStyles({
  card: {
    width: "80%",
    height: "max-content",
    boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
    margin: "0 auto",
  },
});

const AuditPage = () => {
  const location = useLocation();
  const classes = useStyles();
  const { domainName } = location.state;
  const [isDataSet, setIsDataSet] = useState(false);
  const [seoData, setSeoData] = useState({});
  const [usabilityData, setUsabilityData] = useState({});
  const [performanceData, setPerformanceData] = useState({});
  const [url, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("domainName", domainName);

  const setUpData = useCallback(async () => {
    setIsLoading(true);
    const setup_response = await fetch("https://web-production-d0c2.up.railway.app/setup", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domainName: domainName,
      }),
    });

    const setup_data = await setup_response.json();
    console.log("setup_response", setup_data);
    setURL(setup_data.url);
    //https://web-production-d0c2.up.railway.app/
    const [seoResponse, usablityResponse, performanceResponse] =
      await Promise.all([
        fetch("https://web-production-d0c2.up.railway.app/getOnPageSEOReport", {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }),

        fetch("https://web-production-d0c2.up.railway.app/getUsabilityReport", {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }),

        fetch("https://web-production-d0c2.up.railway.app/getPerformanceReport", {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      ]);
    const [seoData, usablityData, performanceData] = await Promise.all([
      seoResponse.json(),
      usablityResponse.json(),
      performanceResponse.json(),
    ]);

    setIsLoading(false);
    setSeoData(seoData);
    setUsabilityData(usablityData);
    setPerformanceData(performanceData);
    setIsDataSet(true);
  }, []);

  useEffect(() => {
    setUpData();
  }, [setUpData]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{marginTop:"5rem"}}>
        {isLoading && (
          <div
            style={{
              marginTop: "10%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <span>Fetching your Report</span>
          </div>
        )}
        {isDataSet && (
          <>
            <div className={classes.card}>
              <OnPageSeo url={url} seoData={seoData} />
            </div>
            {console.log(usabilityData)}
            <div className={classes.card}>
              <Usability url={url} seoData={usabilityData} />
            </div>
            {console.log("performance", performanceData)}
            <div className={classes.card}>
              <Performance url={url} seoData={performanceData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(AuditPage);
