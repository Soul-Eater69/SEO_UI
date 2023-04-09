import React, { useState } from "react";
import DataHolder from "./DataHolder";
import { makeStyles } from "@mui/styles";
import GradeSection from "./GradeSection";
import { Table } from "react-bootstrap";
import AccordionButton from "./AccordionButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VisibilityIcon from "@mui/icons-material/Visibility";

const useStyles = makeStyles({});

const Social = ({ seoData }) => {
  const classes = useStyles();

  return (
    <div>
      <h2 style={{ textAlign: "left", padding: "2rem" }}>Social Results</h2>
      <GradeSection seoData={seoData} />
      <DataHolder
        pass={seoData["facebook_data"]["pass"]}
        required={seoData["facebook_data"]["required"]}
        toIndex={3}
      >
        <h4>{seoData["facebook_data"]["display_title"]}</h4>
        <p>{seoData["facebook_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["facebookGraph_data"]["pass"]}
        required={seoData["facebookGraph_data"]["required"]}
        toIndex={3}
      >
        <h4>{seoData["facebookGraph_data"]["display_title"]}</h4>
        <p>{seoData["facebookGraph_data"]["description"]}</p>
        <AccordionButton>
          <Table striped>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {seoData["facebookGraph_data"]["data"].map((ele) => (
                <tr>
                  <td>{ele.property}</td>
                  <td>{ele.content}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </AccordionButton>
      </DataHolder>

      <DataHolder
        pass={seoData["facebookPixel_data"]["pass"]}
        required={seoData["facebookPixel_data"]["required"]}
      >
        <h4>{seoData["facebookPixel_data"]["display_title"]}</h4>
        <p>{seoData["facebookPixel_data"]["text"]}</p>
        <p>{seoData["facebookPixel_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["twitter_data"]["pass"]}
        required={seoData["twitter_data"]["required"]}
      >
        <h4>{seoData["twitter_data"]["display_title"]}</h4>
        <p>{seoData["twitter_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["twitterCards_data"]["pass"]}
        required={seoData["twitterCards_data"]["required"]}
      >
        <h4>{seoData["twitterCards_data"]["display_title"]}</h4>
        <p>{seoData["twitterCards_data"]["text"]}</p>
        <AccordionButton>
          <Table striped>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {seoData["twitterCards_data"]["data"].map((ele) => (
                <tr>
                  <td>{ele.tag}</td>
                  <td>{ele.content}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </AccordionButton>
      </DataHolder>

      <DataHolder
        pass={seoData["instagram_data"]["pass"]}
        required={seoData["instagram_data"]["required"]}
      >
        <h4>{seoData["instagram_data"]["display_title"]}</h4>
        <p>{seoData["instagram_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["linkedin_data"]["pass"]}
        required={seoData["linkedin_data"]["required"]}
      >
        <h4>{seoData["linkedin_data"]["display_title"]}</h4>
        <p>{seoData["linkedin_data"]["text"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["youtube_data"]["pass"]}
        required={seoData["youtube_data"]["required"]}
      >
        <h4>{seoData["youtube_data"]["display_title"]}</h4>
        <p>{seoData["youtube_data"]["text"]}</p>
      </DataHolder>

      {seoData["youtube_data"]["data"]["hasData"] && (
        <DataHolder pass={1} required={0}>
          <h4>YouTube Activity</h4>
          <p>You have a good number of YouTube channel subscribers</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 2,
              }}
            >
              <YouTubeIcon sx={{ fontSize: "2.5rem", color: "red" }} />
              <span style={{ fontWeight: 600 }}>
                {Number(
                  seoData["youtube_data"]["data"]["subscribers"]
                ).toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
              <VisibilityIcon sx={{ fontSize: "2.5rem" }} />
              <span style={{ fontWeight: 600 }}>
                {Number(
                  seoData["youtube_data"]["data"]["views"]
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </DataHolder>
      )}
    </div>
  );
};

export default Social;
