import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [sliderData, setSliderData] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    loadSlider();
    loadTrendingProducts();
    loadAboutData();
  }, []);

  const loadAboutData = () => {
    setIsLoading(true);
    Service.getAboutData().then((res) => {
      setAboutData(res.data);
      setIsLoading(false);
    });
  };

  const loadSlider = () => {
    setIsLoading(true);
    Service.getSliders().then((res) => {
      setSliderData(res.data);
      setIsLoading(false);
    });
  };

  const loadTrendingProducts = () => {
    setIsLoading(true);
    Service.getTrendingProducts().then((res) => {
      setTrendingProducts(res.data);
      setIsLoading(false);
    });
  };

  const details = (item) => {
    localStorage.setItem("ViewProdId", item.ProdId);
    history.push("/product-details");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}

      {sliderData.length > 0 && (
        <div id="myCarousel" className="carousel slide mb30">
          <ol className="carousel-indicators">
            {sliderData.map((item, index) => (
              <li
                data-target="#myCarousel"
                data-slide-to={index}
                className={index == 0 ? "active" : ""}
                key={index}
              ></li>
            ))}
          </ol>

          <div className="carousel-inner">
            {sliderData.map((item, i) => (
              <div className={i == 0 ? "item active" : "item"} key={i}>
                <img src={item.Image} />
                <div className="carousel-caption">
                  <h3 className="text-white">{item.Heading}</h3>
                  <div className="clearfix form-action">
                    <Link
                      to={item.Url}
                      type="submit"
                      className="btn btn-primary min-width"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a
            className="left carousel-control"
            href="#myCarousel"
            data-slide="prev"
          >
            <span
              className="glyphicon glyphicon-chevron-left"
              style={{ marginTop: "-16px", marginLeft: "-16px" }}
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span
              className="glyphicon glyphicon-chevron-right"
              style={{ marginTop: "-16px", marginRight: "-16px" }}
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      )}

      {trendingProducts.length > 0 && (
        <div>
          <h3 className="carousel-title">Trending Products</h3>
          <div className="shop-row">
            <div className="shop-container max-col-4" data-layout="fitRows">
              {trendingProducts.map((item, index) => (
                <div className="product-item" key={index}>
                  <div className="product">
                    <figure className="product-image-container">
                      <a
                        onClick={() => details(item)}
                        title={item.PName}
                        className="product-image-link"
                      >
                        <img src={item.PImage} alt={item.PName} />
                      </a>
                      <div className="product-action">
                        <a
                          onClick={() => details(item)}
                          className="btn-product btn-add-cart"
                          title="View Details"
                        >
                          <i className="icon-product icon-bag"></i>
                          <span>View Details</span>
                        </a>
                      </div>
                    </figure>
                    <h3 className="product-title">
                      <a onClick={() => details(item)}>{item.PName}</a>
                    </h3>
                    <div className="product-price-container">
                      <span className="product-price">
                        ₹{item.DiscountedPrice}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* margin */}

      <div className="page-header text-center">
        <h1>About Us</h1>
        {/* <p>Learn more about us</p> */}
      </div>
      {aboutData.map((item, index) => (
        <p className="lead" key={index}>
          {item.Description}
        </p>
      ))}

      <div className="mb50 visible-sm visible-xs"></div>
      {/* margin */}
    </div>
  );
}

export default Home;
