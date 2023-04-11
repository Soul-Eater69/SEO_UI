import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import OnPageSeo from "./OnPageSeo";
import Usability from "./Usability";
import Performance from "./Performance";
import NavBar from "./NavBar";
import Spinner from "react-bootstrap/Spinner";
import Social from "./Social";
import RecommendationCard from "./RecommendationCard";
import { FetchData, setup } from "./FetchData";
import { gradeCalculator } from "./lib";
import InfoCard from "./InfoCard";

const useStyles = makeStyles({
  card: {
    width: "80%",
    height: "max-content",
    boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
    margin: "1rem auto",
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
  const [socialData, setSocialData] = useState({});
  const [url, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [initData, setInitData] = useState({});

  const gatherInitInfo = ({
    recommendations,
    seoData,
    usabilityData,
    performanceData,
    socialData,
  }) => {
    const desktopScreenshotURL =
      usabilityData?.device_rendering?.desktop_screenshot;

    const { grade, recommendation, priorityGradePercentage } = gradeCalculator({
      recommendations,
      seoData,
      usabilityData,
      performanceData,
      socialData,
    });

    return {
      intiObject: {
        desktopScreenshotURL,
        grade,
        recommendation,
        priorityGradePercentage,
      },
    };
  };

  const gatherRecommendations = (data) => {
    let recommendationsList = [];

    data.forEach((dataObj) => {
      Object.keys(dataObj).forEach((key) => {
        let obj = dataObj[key];
        if (obj.required && !obj.pass) {
          recommendationsList.push({
            recommendation: obj.recommendation,
            priority: obj.priority,
            category: obj.category,
          });
        }
      });
    });
    setRecommendations(recommendationsList);
  };

  const setUpData = useCallback(async () => {
    setIsLoading(true);

    const [url, token] = await setup(domainName);
    const [seoData, usabilityData, performanceData, socialData] =
      await FetchData(token);

    setURL(url);
    gatherRecommendations([
      seoData,
      performanceData,
      socialData,
      usabilityData,
    ]);

    setSeoData(seoData);
    setUsabilityData(usabilityData);
    setPerformanceData(performanceData);
    setSocialData(socialData);
    setIsDataSet(true);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setUpData();
  }, [setUpData]);

  useEffect(() => {
    const { intiObject } = gatherInitInfo({
      seoData,
      performanceData,
      socialData,
      usabilityData,
      recommendations,
    });

    setInitData(intiObject);
  }, [isDataSet, recommendations]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ marginTop: "5rem" }}>
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

        {isDataSet && !isLoading && (
          <>
            <InfoCard
              domainName={domainName}
              recommendation={initData.recommendation}
              screenshotUrl={initData.desktopScreenshotURL}
              grade={initData.grade}
              gradePercentage={initData.priorityGradePercentage}
              recommendations={recommendations}
              onPageScore={{
                grade: seoData["grade"],
                gradePercentage: seoData["percentage"],
              }}
              performanceScore={{
                grade: performanceData["grade"],
                gradePercentage: performanceData["percentage"],
              }}
              usabilityScore={{
                grade: usabilityData["grade"],
                gradePercentage: usabilityData["percentage"],
              }}
              socialScore={{
                grade: socialData["grade"],
                gradePercentage: socialData["percentage"],
              }}
            />
            {recommendations && (
              <RecommendationCard recommendations={recommendations} />
            )}

            <div className={classes.card}>
              <OnPageSeo url={url} seoData={seoData} />
            </div>

            <div className={classes.card}>
              <Usability url={url} seoData={usabilityData} />
            </div>

            <div className={classes.card}>
              <Performance url={url} seoData={performanceData} />
            </div>

            <div className={classes.card}>
              <Social url={url} seoData={socialData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(AuditPage);
