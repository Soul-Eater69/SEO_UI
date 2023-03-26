import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span
      style={{
        background: "#f4f8fb",
        borderTop: ".14rem solid #ebeff2",
        padding: "8px",
        minWidth:"50%",
        maxWidth:"max-content"
      }}
    >
      {text}
    </span>
  );
};

export default HighlightText;
