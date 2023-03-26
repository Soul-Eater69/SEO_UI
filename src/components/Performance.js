import React, { useState } from "react";
import Chart from "react-apexcharts";
import DataHolder from "./DataHolder";
import { makeStyles } from "@mui/styles";
import { Col, Row, Tab, Table } from "react-bootstrap";
import totalResourcesImage from "../assets/totalResourcesImage.png";
import cssImage from "../assets/cssImage.png";
import htmlImage from "../assets/htmlImage.png";
import imagesImage from "../assets/imagesImage.png";
import staticImage from "../assets/staticImage.png";
import javascriptImage from "../assets/javascriptImage.png";
import CustomGuage from "./CustomGuage";
import AccordionButton from "./AccordionButton";
import { CloseRounded, DoneOutline, DoneRounded } from "@mui/icons-material";

const useStyles = makeStyles({
  progressBarWrapper: {
    width: "16rem",
  },
  progress_bar: {
    width: "100% !important",
    height: "23px",
    backgroundColor: "#f1f1f1",
    borderRadius: "12px",
    marginBottom: "10px",
    boxSizing: "border-box !important",
  },
  progress: {
    height: "100%",
    borderRadius: "12px",
    width: 0,
    transition: "width 0.5s ease-in-out",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    padding: "7px",
    boxShadow: "0px 0px 5px rgb(0 0 0/0.2)",
    gap: ".3rem",
    margin: "1rem",
    borderRadius: "10px",
    flex: 1,
    transition: "all .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
});

const ObjectImageContainer = ({ image, objName, count }) => {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <img src={image} style={{ width: "3rem", height: "3rem" }}></img>
      <span
        style={{ textAlign: "center", fontWeight: "600", fontSize: "1.6rem" }}
      >
        {count}
      </span>
      <span style={{ textAlign: "center" }}>{objName}</span>
    </div>
  );
};

const Performance = ({ url, seoData }) => {
  const classes = useStyles();
  const labels = ["HTML", "CSS", "JS", "Images", "Other"];
  const labelColors = [
    "#FBB195",
    "#F67280",
    "#C06C84",
    "#6C5B7B",
    "#355C7D",
    "#4AB19D",
  ];
  const [pieState, setPieState] = useState({
    series: [
      parseFloat(
        seoData["website_data"]["data"]["html"]["original"].toFixed(2)
      ),
      parseFloat(seoData["website_data"]["data"]["css"]["original"].toFixed(2)),
      parseFloat(seoData["website_data"]["data"]["js"]["original"].toFixed(2)),
      parseFloat(
        seoData["website_data"]["data"]["images"]["original"].toFixed(2)
      ),
      parseFloat(
        seoData["website_data"]["data"]["other"]["original"].toFixed(2)
      ),
    ],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      title: {
        text: "Raw Page Size Breakdown",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "20px",
          fontWeight: 400,
          color: "#263238",
        },
      },
      labels: labels,
      colors: labelColors,
      legend: {
        align: "center",
        horizontalAlign: "center",
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, { seriesIndex, dataPointIndex, w }) {
          return w.config.series[seriesIndex][dataPointIndex];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      style: {
        ".apexcharts-legend": {
          alignItems: "flex-start",
        },
      },
    },
  });

  const [pieCompressedState, setPieCompressedState] = useState({
    series: [
      parseFloat(
        seoData["website_data"]["data"]["html"]["compressed"].toFixed(2)
      ),
      parseFloat(
        seoData["website_data"]["data"]["css"]["compressed"].toFixed(2)
      ),
      parseFloat(
        seoData["website_data"]["data"]["js"]["compressed"].toFixed(2)
      ),
      parseFloat(
        seoData["website_data"]["data"]["images"]["compressed"].toFixed(2)
      ),
      parseFloat(
        seoData["website_data"]["data"]["other"]["compressed"].toFixed(2)
      ),
    ],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      title: {
        text: "Download Page Size Breakdown",
        align: "left",
        margin: 3.2,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "16px",
          fontWeight: 400,
          color: "#263238",
        },
      },
      labels: labels,
      colors: labelColors,
      legend: {
        align: "center",
        horizontalAlign: "center",
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, { seriesIndex, dataPointIndex, w }) {
          return w.config.series[seriesIndex][dataPointIndex];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      style: {
        ".apexcharts-legend": {
          alignItems: "flex-start",
        },
      },
    },
  });

  return (
    <div>
      <h2 style={{ textAlign: "left", padding: "2rem" }}>Performance Results</h2>
      <DataHolder
        pass={seoData["pageSpeed_data"]["pass"]}
        required={seoData["pageSpeed_data"]["required"]}
        toIndex={3}
      >
        <h4>{seoData["pageSpeed_data"]["display_title"]}</h4>
        <p>{seoData["pageSpeed_data"]["text"]}</p>
        <p>{seoData["pageSpeed_data"]["description"]}</p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <CustomGuage
            title="Server Response"
            unit="s"
            value={seoData["pageSpeed_data"]["data"]["server_response_time"]}
            arcLengths={[0.15, 0.15, 0.7]}
            boundValues={[0.5, 1, 3]}
          />

          <CustomGuage
            title="All Page Content Loaded"
            unit="s"
            value={seoData["pageSpeed_data"]["data"]["content_load_time"]}
            arcLengths={[0.25, 0.25, 0.5]}
            boundValues={[5, 10, 20]}
          />

          <CustomGuage
            title="All Page Scripts Complete"
            unit="s"
            value={seoData["pageSpeed_data"]["data"]["script_load_time"]}
            arcLengths={[0.5, 0.25, 0.25]}
            boundValues={[10, 15, 20]}
          />
        </div>
      </DataHolder>

      <DataHolder
        pass={seoData["download_data"]["pass"]}
        required={seoData["download_data"]["required"]}
        toIndex={2}
      >
        <h4>{seoData["download_data"]["display_title"]}</h4>
        <p>{seoData["download_data"]["text"]}</p>
        <div>
          <Row>
            <Col>
              <CustomGuage
                title="Download Page Size"
                unit="mb"
                value={seoData["website_data"]["data"]["total_compressed_size"]}
                arcLengths={[0.2, 0.15, 0.65]}
                boundValues={[2.5, 5, 20]}
              />
            </Col>
            <Col>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chart
                  options={pieCompressedState.options}
                  series={pieCompressedState.series}
                  type="pie"
                  width={340}
                />
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: "1.1rem",
                    marginRight: "5rem",
                  }}
                >
                  Total :{" "}
                  {seoData["website_data"]["data"][
                    "total_compressed_size"
                  ].toFixed(1)}{" "}
                  MB
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </DataHolder>

      <DataHolder
        toIndex={2}
        pass={seoData["website_data"]["pass"]}
        required={seoData["website_data"]["required"]}
      >
        <h4>{seoData["website_data"]["display_title"]}</h4>
        <p>{seoData["website_data"]["text"]}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "90%",
            padding: "1.2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "400",
                textAlign: "center",
                margin: "10px 0px",
              }}
            >
              Compression Rates
            </span>
            {labels.map((label, idx) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: ".8rem",
                    margin: ".5rem",
                    width: "4rem",
                    textAlign: "center",
                  }}
                >
                  {label.toUpperCase()}
                </span>
                <div className={classes.progressBarWrapper}>
                  <div className={classes.progress_bar} id="html_bar">
                    <div
                      className={classes.progress}
                      style={{
                        width: `${
                          (100 -
                          seoData["website_data"]["data"][label.toLowerCase()][
                            "rate"
                          ].toFixed(2))
                        }%`,
                        backgroundColor: labelColors[idx],
                      }}
                    ></div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: ".8rem",
                    margin: ".5rem",
                    width: "7rem",
                  }}
                >
                  {seoData["website_data"]["data"][label.toLowerCase()][
                    "compressed"
                  ].toFixed(2)}{" "}
                  MB (
                  {`${Math.floor(
                    seoData["website_data"]["data"][label.toLowerCase()]["rate"]
                  )}%`}
                  )
                </span>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: ".8rem",
                  margin: ".5rem",
                  width: "4rem",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                TOTAL
              </span>
              <div className={classes.progressBarWrapper}>
                <div className={classes.progress_bar} id="html_bar">
                  <div
                    className={classes.progress}
                    style={{
                      width: `${
                        100 -
                        seoData["website_data"]["data"]["total_rate"].toFixed(2)
                      }%`,
                      backgroundColor: "#726EFF",
                    }}
                  ></div>
                </div>
              </div>
              <span
                style={{
                  fontSize: ".8rem",
                  margin: ".5rem",
                  width: "7rem",
                }}
              >
                {seoData["website_data"]["data"][
                  "total_compressed_size"
                ].toFixed(2)}{" "}
                MB (
                {`${
                  100 -
                  Math.floor(seoData["website_data"]["data"]["total_rate"])
                }%`}
                )
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chart
              options={pieState.options}
              series={pieState.series}
              type="pie"
              width={340}
            />
            <span
              style={{
                fontWeight: 400,
                fontSize: "1.1rem",
                marginRight: "5rem",
              }}
            >
              Total : {seoData["website_data"]["data"]["total_size"].toFixed(1)}{" "}
              MB
            </span>
          </div>
        </div>
      </DataHolder>

      <DataHolder
        pass={seoData["resource_data"]["pass"]}
        required={seoData["resource_data"]["required"]}
      >
        <h4>{seoData["resource_data"]["display_title"]}</h4>
        <p>{seoData["resource_data"]["description"]}</p>
        <div style={{ display: "flex" }}>
          <ObjectImageContainer
            image={totalResourcesImage}
            objName={"Total Objects"}
            count={seoData["resource_data"]["data"]["total_objects"]}
          />

          <ObjectImageContainer
            image={htmlImage}
            objName={"Number of HTML Pages"}
            count={seoData["resource_data"]["data"]["html_obj"]}
          />

          <ObjectImageContainer
            image={javascriptImage}
            objName={"Number of JS Pages"}
            count={seoData["resource_data"]["data"]["javascript_obj"]}
          />

          <ObjectImageContainer
            image={cssImage}
            objName={"Number of CSS Pages"}
            count={seoData["resource_data"]["data"]["css_obj"]}
          />

          <ObjectImageContainer
            image={imagesImage}
            objName={"Number of Images"}
            count={seoData["resource_data"]["data"]["image_obj"]}
          />

          <ObjectImageContainer
            image={staticImage}
            objName={"Other Resources"}
            count={seoData["resource_data"]["data"]["other_obj"]}
          />
        </div>
      </DataHolder>

      <DataHolder
        pass={seoData["amp_data"]["pass"]}
        required={seoData["amp_data"]["required"]}
      >
        <h4>{seoData["amp_data"]["display_title"]}</h4>
        <p>{seoData["amp_data"]["text"]}</p>
        <AccordionButton>
          <Table striped>
            <thead>
              <tr>
                <th>AMP Indicator</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AMP Related Doctype Declaration </td>
                <td>
                  {seoData["amp_data"]["data"]["doctype_declaration"] ? (
                    <DoneRounded style={{ color: "green" }} />
                  ) : (
                    <CloseRounded style={{ color: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>AMP Runtime </td>
                <td>
                  {seoData["amp_data"]["data"]["amp_runtime"] ? (
                    <DoneRounded style={{ color: "green" }} />
                  ) : (
                    <CloseRounded style={{ color: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>AMP CSS Boilerplate</td>
                <td>
                  {seoData["amp_data"]["data"]["amp_css_boilerplate"] ? (
                    <DoneRounded style={{ color: "green" }} />
                  ) : (
                    <CloseRounded style={{ color: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>Embedded Inline Custom CSS</td>
                <td>
                  {seoData["amp_data"]["data"]["custom_css"] ? (
                    <DoneRounded style={{ color: "green" }} />
                  ) : (
                    <CloseRounded style={{ color: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>AMP Images</td>
                <td>
                  {seoData["amp_data"]["data"]["amp_images"] ? (
                    <DoneRounded style={{ color: "green" }} />
                  ) : (
                    <CloseRounded style={{ color: "red" }} />
                  )}
                </td>
              </tr>
              <tr>
                <td>AMP HTML Canonical Link</td>
                <td>
                  {seoData["amp_data"]["data"]["canonical_link"] ? (
                    <DoneRounded style={{ color: "green" }} />
                  ) : (
                    <CloseRounded style={{ color: "red" }} />
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </AccordionButton>
      </DataHolder>

      <DataHolder
        pass={seoData["http2_data"]["pass"]}
        required={seoData["http2_data"]["required"]}
      >
        <h4>{seoData["http2_data"]["display_title"]}</h4>
        <p>{seoData["http2_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["optimizedImages_data"]["pass"]}
        required={seoData["optimizedImages_data"]["required"]}
      >
        <h4>{seoData["optimizedImages_data"]["display_title"]}</h4>
        <p>{seoData["optimizedImages_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["minification_data"]["pass"]}
        required={seoData["minification_data"]["required"]}
      >
        <h4>{seoData["minification_data"]["display_title"]}</h4>
        <p>{seoData["minification_data"]["text"]}</p>
        <p>{seoData["minification_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["deprecatedHTML_data"]["pass"]}
        required={seoData["deprecatedHTML_data"]["required"]}
      >
        <h4>{seoData["deprecatedHTML_data"]["display_title"]}</h4>
        <p>{seoData["deprecatedHTML_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["inlineStyles_data"]["pass"]}
        required={seoData["inlineStyles_data"]["required"]}
        toIndex={3}
      >
        <h4>{seoData["inlineStyles_data"]["display_title"]}</h4>
        <p>{seoData["inlineStyles_data"]["text"]}</p>
        <p>{seoData["inlineStyles_data"]["description"]}</p>
        <AccordionButton
          sx={{
            padding: "0px 2.2rem",
          }}
        >
          <Table striped>
            <thead>
              <tr>
                <th>Line</th>
                <th>Style</th>
              </tr>
            </thead>
            <tbody>
              {seoData["inlineStyles_data"]["data"] &&
                seoData["inlineStyles_data"]["data"].map((ele) => (
                  <tr>
                    <td>{ele.styles}</td>
                    <td>{ele.lineno}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </AccordionButton>
      </DataHolder>
    </div>
  );
};

export default Performance;
