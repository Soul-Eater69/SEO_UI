import { useState, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  search_section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
  },

  search_section_header: {
    fontSize: "3.6rem",
    fontFamily: "'Source Sans Pro', sans-serif",
    fontFfamily: "'Tilt Neon', cursive",
  },

  search_section_sub_title: {
    fontSize: "1.4rem",
    color: "grey",
    fontWeight: "400",
  },

  input_container: {
    display: "flex",
    width: "55%",
  },

  search_section_input: {
    height: "3.5rem",
    width: "80%",
    "&:focus": {
      outline: "none",
    },
    borderRadius: "4px",
    border: "1px solid grey",
    fontSize: "1.7rem",
    boxSizing: "border-box",
    padding: "10px",
  },

  audit_btn: {
    width: "20%",
    padding: "8px",
    marginLeft: "7px",
    border: "1px solid black",
    borderRadius: "4px",
    color: "white",
    background: "black",
    fontSize: "1.7rem",
    cursor: "pointer",
  },
});

const SearchSection = () => {
  const [isUrlValid, setIsUrlValid] = useState(false);

  const classes = useStyles();
  const urlRef = useRef();
  const navigate = useNavigate()

  const isValidUrl = (url) => {
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
    const domainRegex = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
    return urlRegex.test(url) || domainRegex.test(url);
  };
  

  const handleAudit = () => {
    const url = urlRef.current.value;
    if (url === "" || !isValidUrl(url)) {
      setIsUrlValid(false);
      alert("Please enter a valid URL or domain name");
    } else {
      setIsUrlValid(true);
  
      let domainName = url;
      let protocol = "https";
      let isWWW = false;
  
      if (url.startsWith("http://")) {
        protocol = "http";
        domainName = url.substring(7);
      } else if (url.startsWith("https://")) {
        domainName = url.substring(8);
      }
  
      if (domainName.startsWith("www.")) {
        domainName = domainName.substring(4);
        isWWW = true;
      }
      
      console.log(domainName)
      navigate(`/${domainName}`, { state: { domainName } });
    };
  }
  

  return (
    <section className={classes.search_section}>
      <span className={classes.search_section_header}>
        SEO Audit & Reporting Tool
      </span>
      <span className={classes.search_section_sub_title}>
        Enter an URL to Analyze the Website for Free
      </span>
      <div className={classes.input_container}>
        <input
          type="text"
          className={classes.search_section_input}
          ref={urlRef}
        ></input>
        <button className={classes.audit_btn} onClick={handleAudit}>
          Audit
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
