import React, { useState, useCallback, useEffect } from "react";
import DataHolder from "./DataHolder";
import { makeStyles } from "@mui/styles";
import Table from "react-bootstrap/Table";
import { Col } from "react-bootstrap";
import { Row, Container } from "react-bootstrap";
import HighlightText from "./HighlightText";
import AccordionButton from "./AccordionButton";
import GaugeChart from "react-gauge-chart";
import mobile from "./mobile.png";
import tablet from "./tablet.png";
import Chart from "react-apexcharts";

const useStyles = makeStyles({
  main_container: {
    margin: "1.5rem",
  },
  serp_container: {
    lineHeight: "1.4",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
    width: "60%",
    padding: "12px",
  },
  serp_header: {
    display: "flex",
  },
  title_span: {
    fontSize: "20px",
    color: "#1a0dab",
  },
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

const Usability = ({ url, seoData }) => {
  console.log(seoData);
  const insights_keys = [
    "First Contentful Paint",
    "Speed Index",
    "Largest Contentful Paint",
    "Time to Interactive",
    "Total Blocking Time",
    "Cumulative Layout Shift",
  ];
  const classes = useStyles();

  const calculateLCPPercentage = (value) => {
    let percentage;
    if (value <= 2.5) {
      percentage = (value / 2.5) * 0.5;
    } else if (value > 2.5 && value <= 4) {
      percentage = ((value - 2.6) / (4 - 2.6)) * 0.25 + 0.5;
    } else {
      percentage = ((value - 4) / (5 - 4)) * 0.25 + 0.75;
    }

    return percentage.toFixed(2);
  };

  const calculateFIDPercentage = (value) => {
    let percentage;
    if (value <= 100) {
      percentage = (value / 100) * 0.2;
    } else if (value > 100 && value <= 300) {
      percentage = ((value - 101) / (300 - 101)) * 0.4 + 0.2;
    } else {
      percentage = ((value - 500) / (500 - 300)) * 0.4 + 0.6;
    }

    return percentage.toFixed(2);
  };

  const calculateCLSPercentage = (value) => {
    let percentage;
    if (value <= 0.1) {
      percentage = (value / 0.1) * 0.25;
    } else if (value > 0.1 && value <= 0.25) {
      percentage = ((value - 0.11) / (0.25 - 0.11)) * 0.425 + 0.675;
    } else {
      percentage = ((value - 1) / (1 - 0.25)) * 0.425 + 0.85;
    }

    return percentage.toFixed(2);
  };

  return (
    <div className={classes.main_container}>
      <h2 style={{ textAlign: "left", padding: "2rem" }}>Usability</h2>
      <DataHolder
        toIndex={2}
        pass={seoData["device_rendering"]["pass"]}
        required={seoData["device_rendering"]["required"]}
      >
        <h3>{seoData["device_rendering"]["display_title"]}</h3>
        <p>{seoData["device_rendering"]["description"]}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center !important",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              marginRight: "3rem",
              marginLeft: "5rem",
            }}
          >
            <img src={mobile}></img>
            <img
              style={{
                position: "absolute",
                left: "12px",
                top: "3rem",
                height: "80%",
                width: "90%",
              }}
              src={`data:image/jpeg;base64,${seoData["device_rendering"]["mobile_screenshot"]}`}
              alt="Screenshot"
            />
          </div>

          <div style={{ position: "relative" }}>
            <img src={tablet}></img>
            <img
              style={{
                position: "absolute",
                left: "15px",
                top: "3rem",
                height: "80%",
                width: "90%",
              }}
              src={`data:image/jpeg;base64,${seoData["device_rendering"]["mobile_screenshot"]}`}
              alt="Screenshot"
            />
          </div>
        </div>
      </DataHolder>

      <DataHolder
        toIndex={3}
        pass={seoData["mobile_vitals"]["pass"]}
        required={seoData["mobile_vitals"]["required"]}
      >
        <h3>{seoData["mobile_vitals"]["display_title"]}</h3>
        <p>{seoData["mobile_vitals"]["text"]}</p>
        <p>{seoData["mobile_vitals"]["description"]}</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>Largest Contentful Paint (LCP)</span>
            <GaugeChart
              id="gauge-chart2"
              nrOfLevels={3}
              percent={calculateLCPPercentage(
                seoData["mobile_vitals"]["vitals"]["lcp"]
              )}
              arcsLength={[0.5, 0.25, 0.25]} // updated arcsLength values
              colors={["#77e69e", "#ffd221", "#ff5353"]}
              style={{ flexBasis: "33.3%" }}
              textColor={"black"}
              hideText={true}
            />
            <span>{seoData["mobile_vitals"]["vitals"]["lcp"].toFixed(2)}s</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>First Input Delay (FID)</span>
            <GaugeChart
              id="gauge-chart2"
              nrOfLevels={3}
              percent={calculateFIDPercentage(
                seoData["mobile_vitals"]["vitals"]["fid"]
              )}
              arcsLength={[0.2, 0.4, 0.4]} // updated arcsLength values
              colors={["#77e69e", "#ffd221", "#ff5353"]}
              style={{ flexBasis: "33.3%" }}
              textColor={"black"}
              hideText={true}
            />
            <span>{seoData["mobile_vitals"]["vitals"]["fid"]}ms</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>Cumulative Layout Shift (CLS)</span>
            <GaugeChart
              id="gauge-chart2"
              nrOfLevels={3}
              percent={calculateCLSPercentage(
                seoData["mobile_vitals"]["vitals"]["cls"]
              )}
              arcsLength={[0.25, 0.425, 0.425]} // updated arcsLength values
              colors={["#77e69e", "#ffd221", "#ff5353"]}
              style={{ flexBasis: "33.3%" }}
              hideText={true}
              textColor={"black"}
            />
            <span>{seoData["mobile_vitals"]["vitals"]["cls"].toFixed(2)}</span>
          </div>
        </div>
      </DataHolder>

      <DataHolder
        pass={seoData["mobile_viewport"]["pass"]}
        required={seoData["mobile_viewport"]["required"]}
      >
        <h3>{seoData["mobile_viewport"]["display_title"]}</h3>
        <p>{seoData["mobile_viewport"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["mobile_pagespeed"]["pass"]}
        toIndex={2}
        required={seoData["mobile_pagespeed"]["required"]}
      >
        <h4>{seoData["mobile_pagespeed"]["display_title"]}</h4>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {seoData["mobile_pagespeed"]["description"]}
        </p>
        <Row style={{ padding: "1.2rem 3rem" }}>
          <Col md={5} sm={12}>
          <Table striped >
              <thead>
                <tr>
                  <th>Lab Data</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {insights_keys.map((key, idx) => (
                  <tr>
                    <td>{key}</td>
                    <td>
                      {seoData["mobile_pagespeed"]["insights"][idx]}{" "}
                      {`${key !== "Cumulative Layout Shift" ? "s" : ""}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={7} sm={12}>
          <Table striped>
              <thead>
                <tr>
                  <th>Opportunities</th>
                  <th>Estimated Savings</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(seoData["mobile_pagespeed"]["opportunities"]).map(
                  (key) => (
                    <tr>
                      <td>{key}</td>
                      <td>
                        {seoData["mobile_pagespeed"]["opportunities"][
                          key
                        ].toFixed(2)}
                        s
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </DataHolder>

      <DataHolder
        pass={seoData["desktop_pagespeed"]["pass"]}
        toIndex={2}
        required={seoData["desktop_pagespeed"]["required"]}
      >
        <h4>{seoData["desktop_pagespeed"]["display_title"]}</h4>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {seoData["desktop_pagespeed"]["description"]}
        </p>
        <Row style={{ padding: "1.2rem 3rem" }}>
          <Col sm={12} md={5}>
            <Table striped width={"40%"}>
              <thead>
                <tr>
                  <th>Lab Data</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {insights_keys.map((key, idx) => (
                  <tr>
                    <td>{key}</td>
                    <td>
                      {seoData["desktop_pagespeed"]["insights"][idx]}{" "}
                      {`${key !== "Cumulative Layout Shift" ? "s" : ""}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col sm={12} md={7}>
            <Table striped width={"60%"}>
              <thead>
                <tr>
                  <th>Opportunities</th>
                  <th>Estimated Savings</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(seoData["desktop_pagespeed"]["opportunities"]).map(
                  (key) => (
                    <tr>
                      <td>{key}</td>
                      <td>
                        {seoData["desktop_pagespeed"]["opportunities"][
                          key
                        ].toFixed(2)}
                        s
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </DataHolder>

      <DataHolder
        pass={seoData["flash_data"]["pass"]}
        required={seoData["flash_data"]["required"]}
      >
        <h4>{seoData["flash_data"]["display_title"]}</h4>
        <p>{seoData["flash_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["iframes_data"]["pass"]}
        required={seoData["iframes_data"]["required"]}
      >
        <h4>{seoData["iframes_data"]["display_title"]}</h4>
        <p>{seoData["iframes_data"]["text"]}</p>
        <p>{seoData["iframes_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["favicon_data"]["pass"]}
        required={seoData["favicon_data"]["required"]}
      >
        <h4>{seoData["favicon_data"]["display_title"]}</h4>
        <p>{seoData["favicon_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["email_data"]["pass"]}
        required={seoData["email_data"]["required"]}
      >
        <h4>{seoData["email_data"]["display_title"]}</h4>
        <p>{seoData["email_data"]["text"]}</p>
      </DataHolder>
    </div>
  );
};

export default Usability;
