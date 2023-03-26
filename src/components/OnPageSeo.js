import React, { useState, useCallback, useEffect } from "react";
import DataHolder from "./DataHolder";
import { makeStyles } from "@mui/styles";
import Table from "react-bootstrap/Table";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import HighlightText from "./HighlightText";
import AccordionButton from "./AccordionButton";

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

const OnPageSeo = ({ url, seoData }) => {
  const classes = useStyles();
  const pathname = new URL(url).pathname;
  const isSubPage = pathname.split("/").length > 2;

  return (
    <div className={classes.main_container}>
      <h2 style={{ textAlign: "left", padding: "2rem" }}>
        On-Page SEO Results
      </h2>
      <DataHolder
        pass={seoData["title_data"]["pass"]}
        required={seoData["title_data"]["required"]}
      >
        <h4>{seoData["title_data"]["display_title"]}</h4>
        <p>{seoData["title_data"]["description"]}</p>
        <p>{seoData["title_data"]["text"]}</p>
        <p>Length : {seoData["title_data"]["length"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["meta_data"]["pass"]}
        required={seoData["meta_data"]["required"]}
      >
        <h4>{seoData["meta_data"]["display_title"]}</h4>
        <p>{seoData["meta_data"]["text"]}</p>
        <p>{seoData["meta_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["serp_data"]["pass"]}
        required={seoData["serp_data"]["required"]}
      >
        <h4>{seoData["serp_data"]["display_title"]}</h4>
        <p>{seoData["serp_data"]["description"]}</p>
        <div className={classes.serp_container}>
          <div className={classes.serp_header}>
            <span>{url}</span>
            <span style={{ marginLeft: "8px" }}>⋮</span>
          </div>
          <span className={classes.title_span}>
            {seoData["title_data"]["text"]}
          </span>
        </div>
      </DataHolder>

      <DataHolder
        pass={seoData["hreflang_data"]["pass"]}
        required={seoData["hreflang_data"]["required"]}
      >
        <h4>{seoData["hreflang_data"]["display_title"]}</h4>
        <p>{seoData["hreflang_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["language_data"]["pass"]}
        required={seoData["language_data"]["required"]}
      >
        <h4>{seoData["language_data"]["display_title"]}</h4>
        <p>{seoData["language_data"]["description"]}</p>
        {seoData["language_data"]["pass"] == 1 && (
          <>Declared : {seoData["language_data"]["text"]}</>
        )}
      </DataHolder>

      <DataHolder
        pass={seoData["h1_data"]["pass"]}
        required={seoData["h1_data"]["required"]}
      >
        <h4>{seoData["h1_data"]["display_title"]}</h4>
        <p>{seoData["h1_data"]["description"]}</p>
        {seoData["h1_data"]["pass"] == 1 && (
          <div>
            <Table striped style={{ borderCollapse: "collapse" }} width="200%">
              <thead>
                <tr>
                  <th className={classes.th}>Tag</th>
                  <th className={classes.th}>Value</th>
                </tr>
              </thead>
              <tbody>
                {seoData["h1_data"]["text"].map((ele) => (
                  <tr className={classes.tr}>
                    <td className={classes.td}>H1</td>
                    <td className={classes.td}>{ele}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </DataHolder>

      <DataHolder
        pass={seoData["headers_data"]["pass"]}
        required={seoData["headers_data"]["required"]}
      >
        <h4>{seoData["headers_data"]["display_title"]}</h4>
        <p>{seoData["headers_data"]["description"]}</p>
        <Row>
          {seoData["headers_data"]["pass"] == 1 && (
            <div>
              <Table
                striped
                style={{ borderCollapse: "collapse", minWidth: "180%" }}
              >
                <thead>
                  <tr>
                    <th className={classes.th} style={{ width: "30%" }}>
                      Header Tag
                    </th>
                    <th className={classes.th} style={{ width: "15%" }}>
                      Frequency
                    </th>
                    <th className={classes.th} style={{ width: "55%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {Array(6)
                    .fill()
                    .map((ele, idx) => {
                      const frequency =
                        seoData["headers_data"]["text"][`h${idx + 1}`];
                      const percentage =
                        (frequency / seoData["headers_data"]["total_h_tags"]) *
                        100;

                      return (
                        <tr className={classes.tr}>
                          <td
                            className={classes.td}
                            style={{ width: "30%" }}
                          >{`H${idx + 1}`}</td>
                          <td className={classes.td} style={{ width: "15%" }}>
                            {frequency}
                          </td>
                          <td className={classes.td} style={{ width: "60%" }}>
                            <div
                              style={{
                                backgroundColor: "#5d9cec",
                                height: "10px",
                                borderRadius: "4px",
                                width:
                                  frequency !== 0 ? `${percentage}%` : "0.5%",
                              }}
                            ></div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          )}
        </Row>
        <Row>
          <AccordionButton data={seoData["headers_data"]["tags"]}>
            <Table striped width={"100%"}>
              <thead>
                <tr>
                  <th className={classes.th}>Tag</th>
                  <th className={classes.th}>Value</th>
                </tr>
              </thead>
              <tbody>
                {Array(6)
                  .fill()
                  .flatMap((ele, idx) => {
                    const text = seoData["headers_data"]["tags"][`H${idx + 1}`];
                    return text.map((item, i) => ({
                      key: `H${idx + 1}-item-${i}`,
                      col1: `H${idx + 1}`,
                      col2: item,
                    }));
                  })
                  .map((row) => (
                    <tr key={row.key} className={classes.tr}>
                      <td width={"15%"} className={classes.td}>
                        {row.col1}
                      </td>
                      <td width={"85%"} className={classes.td}>
                        {row.col2}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </AccordionButton>
        </Row>
      </DataHolder>

      <DataHolder
        pass={seoData["content_data"]["pass"]}
        required={seoData["content_data"]["required"]}
      >
        <h4>{seoData["content_data"]["display_title"]}</h4>
        <p>{seoData["content_data"]["description"]}</p>
        {seoData["content_data"]["pass"] == 1 && (
          <>Word Count : {seoData["content_data"]["text"]}</>
        )}
      </DataHolder>

      <DataHolder
        pass={seoData["images_data"]["pass"]}
        required={seoData["images_data"]["required"]}
      >
        <h4>{seoData["images_data"]["display_title"]}</h4>
        <p>{seoData["images_data"]["description"]}</p>
        <p>
          We found {seoData["images_data"]["total_imgs"]} images on your page
          and {seoData["images_data"]["missing_attrs"]} of them are missing the
          attribute.
        </p>
        <p>
          Alt attributes are an often overlooked and simple way to signal to
          Search Engines what an image is about, and help it rank in image
          search results.
        </p>
        {console.log(seoData["images_data"])}
      </DataHolder>

      <DataHolder
        pass={seoData["canonical_data"]["pass"]}
        required={seoData["canonical_data"]["required"]}
      >
        <h4>{seoData["canonical_data"]["display_title"]}</h4>
        <p>{seoData["canonical_data"]["description"]}</p>
        <HighlightText text={url} />
      </DataHolder>

      <DataHolder
        pass={seoData["no_index_tag_data"]["pass"]}
        required={seoData["no_index_tag_data"]["required"]}
      >
        <h4>{seoData["no_index_tag_data"]["display_title"]}</h4>
        <p>{seoData["no_index_tag_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["no_index_header_data"]["pass"]}
        required={seoData["no_index_header_data"]["required"]}
      >
        <h4>{seoData["no_index_header_data"]["display_title"]}</h4>
        <p>{seoData["no_index_header_data"]["description"]}</p>
      </DataHolder>

      <DataHolder
        pass={seoData["ssl_data"]["pass"]}
        required={seoData["ssl_data"]["required"]}
      >
        <h4>{seoData["ssl_data"]["display_title"]}</h4>
        <p>{seoData["ssl_data"]["description"]}</p>
      </DataHolder>

      {!isSubPage && (
        <DataHolder
          pass={seoData["robots_data"]["pass"]}
          required={seoData["robots_data"]["required"]}
        >
          <h4>{seoData["robots_data"]["display_title"]}</h4>
          <p>{seoData["robots_data"]["description"]}</p>
          <HighlightText text={`${url}/robots.txt`} />
        </DataHolder>
      )}

      {!isSubPage && (
        <DataHolder
          pass={seoData["blocked_data"]["pass"]}
          required={seoData["blocked_data"]["required"]}
        >
          <h4>{seoData["blocked_data"]["display_title"]}</h4>
          <p>{seoData["blocked_data"]["description"]}</p>
        </DataHolder>
      )}

      {!isSubPage && (
        <DataHolder
          pass={seoData["xml_data"]["pass"]}
          required={seoData["xml_data"]["required"]}
        >
          <h4>{seoData["xml_data"]["display_title"]}</h4>
          <p>{seoData["xml_data"]["description"]}</p>
          <HighlightText text={`${url}/sitemap_index.xml`} />
        </DataHolder>
      )}
      <DataHolder
        pass={seoData["structured_data"]["pass"]}
        required={seoData["structured_data"]["required"]}
      >
        <h4>{seoData["structured_data"]["display_title"]}</h4>
        <p>{seoData["structured_data"]["description"]}</p>
      </DataHolder>
    </div>
  );
};

export default OnPageSeo;
