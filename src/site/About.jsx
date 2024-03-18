import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = () => {
    setIsLoading(true);
    Service.getAboutData().then((res) => {
      setAboutData(res.data);
      setIsLoading(false);
    });
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="page-header text-center">
        <h1>About Us</h1>
        {/* <p>Learn more about us</p> */}
      </div>
      {aboutData.map((item, index) => (
        <p className="lead" key={index}>
        {item.Description}
        </p>
      ))}
      <div className="mb20 mb10-xs"></div>
    </div>
  );
}

export default About;
