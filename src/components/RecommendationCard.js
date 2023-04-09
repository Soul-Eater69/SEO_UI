import { useState } from "react";
import RecommendationElementCard from "./RecommendationElementCard";

const RecommendationCard = ({ recommendations }) => {
  console.log("Recommendation Card", recommendations);
  const [filterOption, setFilterOption] = useState("");

  return (
    <div
      style={{
        width: "80%",
        height: "max-content",
        boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
        margin: "1rem auto",
        padding: "10px",
      }}
    >
      <h3 style={{ margin: "2rem 3rem" }}>Recommendations</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "3.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            margin: "0px 0px 1rem 0px",
            justifyContent: "flex-start",
          }}
        >
          <button
            onClick={() =>
              setFilterOption((prevValue) =>
                prevValue === "On-Page SEO" ? "" : "On-Page SEO"
              )
            }
            style={{
              background: filterOption === "On-Page SEO" ? "black" : "#f3f3f3",
              color: filterOption === "On-Page SEO" ? "white" : "black",
              borderRadius: "3px",
              boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
              border: `1px solid ${
                filterOption === "On-Page SEO" ? "black" : "#f3f3f3"
              }`,
            }}
          >
            On-Page SEO
          </button>
          <button
            onClick={() =>
              setFilterOption((prevValue) =>
                prevValue === "Performance" ? "" : "Performance"
              )
            }
            style={{
              background: filterOption === "Performance" ? "black" : "#f3f3f3",
              color: filterOption === "Performance" ? "white" : "black",
              borderRadius: "3px",
              boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
              border: `1px solid ${
                filterOption === "Performance" ? "black" : "#f3f3f3"
              }`,
            }}
          >
            Performance
          </button>
          <button
            onClick={() =>
              setFilterOption((prevValue) =>
                prevValue === "Usability" ? "" : "Usability"
              )
            }
            style={{
              background: filterOption === "Usability" ? "black" : "#f3f3f3",
              color: filterOption === "Usability" ? "white" : "black",
              borderRadius: "3px",
              boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
              border: `1px solid ${
                filterOption === "Usability" ? "black" : "#f3f3f3"
              }`,
            }}
          >
            Usability
          </button>
          <button
            onClick={() =>
              setFilterOption((prevValue) =>
                prevValue === "Social" ? "" : "Social"
              )
            }
            style={{
              background: filterOption === "Social" ? "black" : "#f3f3f3",
              color: filterOption === "Social" ? "white" : "black",
              borderRadius: "3px",
              boxShadow: "0px 0px 3px rgb(0 0 0/0.2)",
              border: `1px solid ${
                filterOption === "Social" ? "black" : "#f3f3f3"
              }`,
            }}
          >
            Social
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {filterOption !== ""
          ? recommendations.map(
              (recommendation) =>
                recommendation.category === filterOption && (
                  <RecommendationElementCard
                    title={recommendation.recommendation}
                    priority={recommendation.priority}
                    category={recommendation.category}
                  />
                )
            )
          : recommendations.map((recommendation) => (
              <RecommendationElementCard
                title={recommendation.recommendation}
                priority={recommendation.priority}
                category={recommendation.category}
              />
            ))}
      </div>
    </div>
  );
};

export default RecommendationCard;
