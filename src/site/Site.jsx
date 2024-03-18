import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function Site(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    for (var i = 0; i < 5; i++) {
      setTimeout(() => {
        console.log(i);
      }, 1000);
    }
  }, []);
  const history = useHistory();
  const [selectCat, setSelectCat] = useState("All Category");
  const [isLoading, setIsLoading] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [subCatData, setSubCatData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadOrgData();
    loadCatData();
    loadSubCatData();
    loadProductData();
    loadTestimonials();
    if (localStorage.getItem("UserLogin")) {
      loadCartCount();
    }
  }, []);

  const loadCatData = () => {
    setIsLoading(true);
    Service.getAllCategories().then((res) => {
      setCatData(res.data);
      console.log(res.data);
      setIsLoading(false);
    });
  };

  const loadCartCount = () => {
    if (localStorage.getItem("UserLogin")) {
      setIsLoading(true);
      Service.getCartCount(localStorage.getItem("UserLogin")).then((res) => {
        props.addToCartHandler(res.data[0].Count);
        setIsLoading(false);
      });
    }
  };

  function handleSearchTextChange(e) {
    setSearchText(e.target.value);
  }

  const search = (e) => {
    localStorage.setItem("SearchText", searchText);
    if (searchText != "") {
      history.push("/search-result");
    }
    e.preventDefault();
  };

  const loadOrgData = () => {
    setIsLoading(true);
    Service.getOrgData().then((res) => {
      setOrgData(res.data);
      setIsLoading(false);
    });
  };

  const logout = () => {
    localStorage.removeItem("UserLogin");
    history.push("/login");
    window.location.reload();
  };

  const loadProductData = () => {
    setIsLoading(true);
    Service.getAllProducts().then((res) => {
      setProductData(res.data);
      setIsLoading(false);
    });
  };

  const loadSubCatData = () => {
    setIsLoading(true);
    Service.getCatSubCat().then((res) => {
      setSubCatData(res.data);
      setIsLoading(false);
    });
  };

  const loadTestimonials = () => {
    setIsLoading(true);
    Service.getTestimonials().then((res) => {
      setTestimonials(res.data);
      setIsLoading(false);
    });
  };

  const Subcategories = (item) => {
    setSelectCat(item.CatName);
    localStorage.setItem("ViewCatId", item.CatId);
    history.push("/sub-categories");
  };

  const viewproducts = (item) => {
    setSelectCat(item.SCatName);
    localStorage.setItem("ViewSCatId", item.SCatId);
    history.push("/products");
  };

  const productdetails = (item) => {
    localStorage.setItem("ViewProdId", item.ProdId);
    history.push("/product-details");
  };

  return (
    <div id="wrapper">
      {isLoading ? <Loader /> : null}
      <header className="header sticky-header">
        <div className="container">
          {orgData.map((item, i) => (
            <Link to="/home" className="site-logo" title={item.OrgName} key={i}>
              <img src={item.Logo} alt={item.OrgName} />
              <span className="sr-only">{item.OrgName}</span>
            </Link>
          ))}

          <div className="search-form-container">
            <a href="#" className="search-form-toggle" title="Toggle Search">
              <i className="fa fa-search"></i>
            </a>
            <form onClick={search} className="open">
              <div className="dropdown search-dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-expanded="false"
                >
                  {selectCat}
                  <i className="fa fa-caret-down"></i>
                </a>
                <ul className="dropdown-menu">
                  {catData.map((item, i) => (
                    <li key={i}>
                      <a onClick={() => Subcategories(item)}>{item.CatName}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <input
                type="search"
                className="form-control"
                placeholder="Search by product"
                required
                onChange={handleSearchTextChange}
              />
              <button type="submit" title="Search" className="btn">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>

          {localStorage.getItem("UserLogin") == null ? (
            <ul className="top-links">
              <li>
                <Link to="/login">Sign In</Link>
              </li>
              <li>
                <Link to="/create">Sign Up</Link>
              </li>
            </ul>
          ) : null}

          {localStorage.getItem("UserLogin") != null && (
            <div className="dropdown cart-dropdown">
              <Link
                to="/cart"
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <span className="cart-icon">
                  <img src="assets/images/bag.png" alt="Cart" />
                  <span className="cart-count">{props.data}</span>
                </span>
              </Link>
            </div>
          )}

          {localStorage.getItem("UserLogin") ? (
            <div className="dropdown cart-dropdown">
              <a
                className="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
              >
                <span className="cart-icon">
                  <img src="assets/images/user.png" alt="User" />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-menu-wrapper">
                  <ul style={{ fontSize: "15px", lineHeight: "30px" }}>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/cart">View Cart</Link>
                    </li>
                    <li>
                      <Link to="/placed-orders">Your Orders</Link>
                    </li>
                    <li>
                      <Link to="/reset-pass">Reset Password</Link>
                    </li>
                    <li>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => logout()}
                      >
                        Logout
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
          <a href="#" className="sidemenu-btn" title="Menu Toggle">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
      </header>

      <aside className="sidemenu">
        <div className="sidemenu-wrapper">
          <div className="sidemenu-header">
            {orgData.map((item, i) => (
              <a href="/home" className="sidemenu-logo" key={i}>
                <img src={item.Logo} alt={item.OrgName} />
              </a>
            ))}
          </div>

          <ul className="metismenu">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="#" aria-expanded="false">
                Shopping <span className="sidemenu-icon"></span>
              </a>
              <ul aria-expanded="false" className="collapse">
                {subCatData.map((item, i) => (
                  <li key={i}>
                    <a onClick={() => viewproducts(item)}>{item.SCatName}</a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="main paddingTop">
        <div className="container">
          <div className="row">
            {props.children}
            <aside className="col-md-3 col-md-pull-9 sidebar sidebar-shop">
              <div className="widget widget-box widget-shop-category active">
                <h3 className="widget-title">
                  Category
                  {/* <a href="#" className="btn-filter" role="button">
                    Filter<i className="fa fa-caret-down"></i>
                  </a> */}
                </h3>

                <ul className="shop-category-list accordion">
                  {catData.map((item, i) => (
                    <li key={i}>
                      <a onClick={() => Subcategories(item)}>{item.CatName}</a>
                      <button
                        className="accordion-btn collapsed"
                        type="button"
                        data-toggle="collapse"
                        // data-target="#ved"
                        data-target={"#" + item.CatId}
                        aria-expanded="false"
                        aria-controls="accordion-ul-1"
                      >
                        <span className="accordion-icon"></span>
                      </button>

                      <ul
                        className="collapse"
                        id={item.CatId}
                        aria-expanded="false"
                      >
                        {subCatData.map((item1, j) =>
                          item.CatId == item1.CatId ? (
                            <li key={j}>
                              <a onClick={() => viewproducts(item1)}>
                                <i className="fa fa-caret-right"></i>
                                {item1.SCatName}
                              </a>
                            </li>
                          ) : null
                        )}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              {/* End .widget */}

              <div className="widget widget-box widget-shop-filter">
                <h3 className="widget-title">
                  Filter
                  <a href="#" className="btn-category" role="button">
                    Categories<i className="fa fa-caret-down"></i>
                  </a>
                </h3>

                <div className="filter-box">
                  <h5 className="filter-label">Sort By</h5>
                  <ul className="shop-filter-list">
                    <li>
                      <a href="#">
                        <i className="fa fa-caret-right"></i>Default
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-caret-right"></i>Popularity
                      </a>
                    </li>
                    <li className="active">
                      <a href="#">
                        <i className="fa fa-caret-right"></i>Average Rating
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-caret-right"></i>Newness
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-caret-right"></i>Price: Low to high
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-caret-right"></i>Price: high to Low
                      </a>
                    </li>
                  </ul>
                </div>
                {/* End .filter-box */}

                <div className="filter-box">
                  <h5 className="filter-label">
                    Price
                    <span className="filter-price-text">
                      <span className="filter-price-prefix">$</span>
                      <span id="filter-price-range"></span>
                    </span>
                  </h5>
                  <div className="price-slider-wrapper">
                    <div id="price-slider"></div>
                    {/* End #price-slider */}
                  </div>
                  {/* End .price-slider-wrapper */}
                </div>
                {/* End .filter-box */}

                <div className="filter-box">
                  <h5 className="filter-label">Color</h5>
                  <div className="row">
                    <div className="col-xs-6">
                      <ul className="filter-color-list">
                        <li>
                          <span
                            className="filter-color"
                            style={{ backgroundColor: "#1e73be" }}
                          ></span>
                          <span className="filter-color-text">Blue</span>
                        </li>
                        <li>
                          <span
                            className="filter-color"
                            style={{ backgroundColor: "#c0c0c0" }}
                          ></span>
                          <span className="filter-color-text">Gray</span>
                        </li>
                        <li>
                          <span
                            className="filter-color"
                            style={{ backgroundColor: "#dc9814" }}
                          ></span>
                          <span className="filter-color-text">Orange</span>
                        </li>
                      </ul>
                    </div>
                    {/* End col-xs-6 */}

                    <div className="col-xs-6">
                      <ul className="filter-color-list">
                        <li>
                          <span
                            className="filter-color"
                            style={{ backgroundColor: "#736751" }}
                          ></span>
                          <span className="filter-color-text">Brown</span>
                        </li>
                        <li>
                          <span
                            className="filter-color"
                            style={{ backgroundColor: "#05ac92" }}
                          ></span>
                          <span className="filter-color-text">Green</span>
                        </li>
                        <li>
                          <span
                            className="filter-color"
                            style={{ backgroundColor: "#fff" }}
                          ></span>
                          <span className="filter-color-text">White</span>
                        </li>
                      </ul>
                    </div>
                    {/* End col-xs-6 */}
                  </div>
                  {/* End row */}
                </div>
                {/* End .filter-box */}

                <a href="#" className="btn btn-apply btn-block">
                  Apply Filter
                </a>
              </div>
              {/* End .widget */}

              {/* <div className="widget widget-newsletter">
                <h3 className="widget-title">Newsletter</h3>
                <p>
                  Enter your email address below to subscribe to my newsletter
                </p>

                <form action="#">
                  <div className="form-group">
                    <img
                      src="assets/images/icon-newsletter-email.png"
                      alt="Email"
                    />
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  <input
                    type="submit"
                    value="subscribe now"
                    className="btn btn-block"
                  />
                </form>
              </div> */}
              {/* End .widget */}

              {/* <div className="widget widget-testimonial">
                <h3 className="widget-title">Happy Customer</h3>
                <div
                  className="owl-data-carousel owl-carousel"
                  data-owl-settings='{ "items":1, "margin": 5, "loop": true, "nav": true, "dots":true }'
                >
                  {testimonials.map((item, i) => (
                    <div className="testimonial" key={i}>
                      <img src={item.Image} alt={item.Name} />
                      <h5 className="testimonial-owner">{item.Name}</h5>
                      <div className="testimonial-owner-position">
                        {item.Tag}
                      </div>
                      <p>{item.Description}</p>
                    </div>
                  ))}
                </div>
              </div>
               */}
            </aside>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="info-bar">
            <div className="info-bar-col">
              <h5 className="info-bar-title">SHIPPING &amp; EASY RETURN</h5>
              <p>Easy Shipping & Easy Return</p>
            </div>
            <div className="info-bar-col">
              <h5 className="info-bar-title">Returned within 7 days</h5>
              <p>Money back guarantee</p>
            </div>
            <div className="info-bar-col">
              <h5 className="info-bar-title">ONLINE SUPPORT 24/7</h5>
              <p>Highly customer satisfaction</p>
            </div>
          </div>
        </div>
        <div className="footer-inner">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                {orgData.map((item, i) => (
                  <div className="widget widget-about" key={i}>
                    <h4 className="widget-title">{item.OrgName}</h4>
                    <address>
                      <span>{item.Address}</span>
                      <span>{item.Contact}</span>
                      <a
                        href={
                          "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" +
                          item.Email
                        }
                      >
                        {item.Email}
                      </a>
                    </address>
                  </div>
                ))}
              </div>

              <div className="col-sm-6 col-md-3">
                <div className="widget">
                  <h4 className="widget-title">Quick Links</h4>

                  <ul className="links">
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/">Shopping</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="clearfix visible-sm"></div>

              {/* <div className="col-sm-6 col-md-3">
                <div className="widget">
                  <h4 className="widget-title">My Account</h4>

                  <ul className="links">
                    <li>
                      <Link to="/create">Create Account</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/forgot-password">Forgot Password</Link>
                    </li>
                  </ul>
                </div>
              </div> */}

              <div className="col-sm-6 col-md-3">
                <div className="widget widget-newsletter">
                  <h4 className="widget-title">Follow Us</h4>
                  <p>Follow us on social media.</p>

                  {orgData.map((item, i) => (
                    <div className="social-icons" key={i}>
                      <a
                        target="_blank"
                        href={item.FBLink}
                        className="social-icon"
                        title="Facebook"
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a
                        target="_blank"
                        href={item.InstaLink}
                        className="social-icon"
                        title="Instagram"
                      >
                        <i className="fa fa-instagram"></i>
                      </a>
                      <a
                        target="_blank"
                        href={item.WhatsappLink}
                        className="social-icon"
                        title="WhatsApp"
                      >
                        <i className="fa fa-whatsapp"></i>
                      </a>
                      <a
                        target="_blank"
                        href={item.YoutubeLink}
                        className="social-icon"
                        title="Youtube"
                      >
                        <i className="fa fa-youtube"></i>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          {orgData.map((item, i) => (
            <div className="container" key={i}>
              <a href="/home" style={{ textAlign: "left" }}>
                {item.OrgName} &copy; 2021. All Rights Reserved&nbsp;
              </a>
              <Link className="img-cards" to="/privacy-policy">
                Privacy Policy&nbsp;
              </Link>
              <Link className="img-cards" to="/terms-and-conditions">
                Terms & Conditions&nbsp;
              </Link>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default Site;
