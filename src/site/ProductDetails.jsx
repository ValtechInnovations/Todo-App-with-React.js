import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function ProductDetails(props) {
  // useEffect(() => {
  window.scrollTo(0, 0);
  // }, []);

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msgClass, setMsgClass] = useState("");
  const [msgText, setMsgText] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [productsImages, setProductsImages] = useState([]);
  const [productsColors, setProductsColors] = useState([]);
  const [productsSizes, setProductsSizes] = useState([]);
  const [productsDescription, setProductsDescription] = useState([]);
  const [productsInformation, setProductsInformation] = useState([]);
  const [productsReviews, setProductsReviews] = useState([]);
  const [productsStock, setProductsStock] = useState([]);
  const [ratingValue, setRatingValue] = useState("");
  const [ratingCount, setRatingCount] = useState("");
  const [colorIndex, setColorIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [imgPath, setImgPath] = useState("");
  const [isVideo, setIsVideo] = useState();

  useEffect(() => {
    loadProductDetails();
    loadProductImages();
    loadProductColors();
    loadProductSizes();
    loadProductDescription();
    loadProductInformation();
    loadProductReviews();
    loadProductStock();
    loadTotalRatings();
  }, [localStorage.getItem("ViewProdId")]);

  const AssignColorIndex = (index, imgPath) => {
    setColorIndex(index);
    setImgPath(imgPath);
  };

  const AssignSizeIndex = (index) => {
    setSizeIndex(index);
  };

  const loadProductDetails = () => {
    setIsLoading(true);
    Service.getSingleProductDetails(localStorage.getItem("ViewProdId")).then(
      (res) => {
        setProductsData(res.data);
        if (res.data[0].VideoLink) {
          setIsVideo("https://www.youtube.com/embed/" + res.data[0].VideoLink);
        }
        setIsLoading(false);
      }
    );
  };

  const loadProductImages = () => {
    setIsLoading(true);
    Service.getSingleProductImages(localStorage.getItem("ViewProdId")).then(
      (res) => {
        setProductsImages(res.data);
        setIsLoading(false);
      }
    );
  };

  const loadProductColors = () => {
    setIsLoading(true);
    Service.getSingleProductColors(localStorage.getItem("ViewProdId")).then(
      (res) => {
        setProductsColors(res.data);
        setIsLoading(false);
      }
    );
  };

  const loadProductSizes = () => {
    setIsLoading(true);
    Service.getSingleProductSizes(localStorage.getItem("ViewProdId")).then(
      (res) => {
        setProductsSizes(res.data);
        setIsLoading(false);
      }
    );
  };

  const loadProductDescription = () => {
    setIsLoading(true);
    Service.getSingleProductDescription(
      localStorage.getItem("ViewProdId")
    ).then((res) => {
      setProductsDescription(res.data);
      setIsLoading(false);
    });
  };

  const loadProductInformation = () => {
    setIsLoading(true);
    Service.getSingleProductInformation(
      localStorage.getItem("ViewProdId")
    ).then((res) => {
      setProductsInformation(res.data);
      setIsLoading(false);
    });
  };

  const loadProductReviews = () => {
    setIsLoading(true);
    Service.getSingleProductReviews(localStorage.getItem("ViewProdId")).then(
      (res) => {
        setProductsReviews(res.data);
        setIsLoading(false);
      }
    );
  };

  const loadProductStock = () => {
    setIsLoading(true);
    Service.getSingleProductStock(localStorage.getItem("ViewProdId")).then(
      (res) => {
        setProductsStock(res.data);
        setIsLoading(false);
      }
    );
  };

  const loadTotalRatings = () => {
    setIsLoading(true);
    Service.getTotalRatings(localStorage.getItem("ViewProdId")).then((res) => {
      setRatingValue(res.data[0].Sum / res.data[0].Count);
      setRatingCount(res.data[0].Count);
      setIsLoading(false);
    });
  };

  const addToCart = (type) => {
    if (localStorage.getItem("UserLogin") != null) {
      if (productsColors.length > 0) {
        if (colorIndex == 0) {
          setShowMsg(true);
          setMsgClass("alert alert-danger alert-dismissible");
          setMsgText("Please select color..!");
        } else {
          if (productsSizes.length > 0) {
            if (sizeIndex == 0) {
              setShowMsg(true);
              setMsgClass("alert alert-danger alert-dismissible");
              setMsgText("Please select size..!");
            } else {
              if (type == "cart") {
                saveToCart(colorIndex, sizeIndex);
              } else {
                saveToCart(colorIndex, sizeIndex);
                history.push("/cart");
              }
            }
          } else {
            if (type == "cart") {
              saveToCart(colorIndex, sizeIndex);
            } else {
              saveToCart(colorIndex, sizeIndex);
              history.push("/cart");
            }
          }
        }
      } else {
        if (productsSizes.length > 0) {
          if (sizeIndex == 0) {
            setShowMsg(true);
            setMsgClass("alert alert-danger alert-dismissible");
            setMsgText("Please select size..!");
          } else {
            if (type == "cart") {
              saveToCart(colorIndex, sizeIndex);
            } else {
              saveToCart(colorIndex, sizeIndex);
              history.push("/cart");
            }
          }
        } else {
          if (type == "cart") {
            saveToCart(colorIndex, sizeIndex);
          } else {
            saveToCart(colorIndex, sizeIndex);
            history.push("/cart");
          }
        }
      }
    } else {
      localStorage.setItem("RedirectToProduct", "Yes");
      history.push("/login");
    }
  };

  const saveToCart = (cId, sId) => {
    var image;
    if (productsColors.length <= 0) {
      image = productsData[0].PImage;
    } else {
      image = imgPath;
    }
    var data = {
      UserId: localStorage.getItem("UserLogin"),
      ProdId: localStorage.getItem("ViewProdId"),
      ColorId: cId,
      SizeId: sId,
      Qty: 1,
      Image: image,
    };
    Service.addToCart(data).then((res) => {
      if (res.data.success) {
        setShowMsg(true);
        setMsgClass("alert alert-success alert-dismissible");
        setMsgText(res.data.success);
        localStorage.setItem("CartCountStatus", Date.now());
        loadCartCount();
      }
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

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="row">
        <div className="product-gallery-container">
          <div id="myCarousel" className="carousel slide">
            {productsColors.length > 0 ? (
              <>
                <ol className="carousel-indicators">
                  {productsColors.map((item, index) => (
                    <li
                      data-target="#myCarousel"
                      data-slide-to={index}
                      className={index == 0 ? "active" : ""}
                      key={index}
                    ></li>
                  ))}
                </ol>
                <div className="carousel-inner">
                  {productsColors.map((item, i) => (
                    <div className={i == 0 ? "item active" : "item"} key={i}>
                      <img src={item.Image} href={item.Image} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <ol className="carousel-indicators">
                  {productsImages.map((item, index) => (
                    <li
                      data-target="#myCarousel"
                      data-slide-to={index}
                      className={index == 0 ? "active" : ""}
                      key={index}
                    ></li>
                  ))}
                </ol>

                <div className="carousel-inner">
                  {productsImages.map((pitem, i) => (
                    <div className={i == 0 ? "item active" : "item"} key={i}>
                      <img src={pitem.ProdImage} />
                    </div>
                  ))}
                </div>
              </>
            )}

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
        </div>

        {productsData.map((itemp, index) => (
          <div className="product-details" key={index}>
            <h2 className="product-title">{itemp.PName}</h2>

            <div className="product-meta-row">
              <div className="product-price-container">
                <span className="product-price">₹{itemp.DiscountedPrice}</span>
              </div>
              {/* Endd .product-price-container */}
              {/* <div className="product-ratings-wrapper">
                <div className="ratings-container">
                  <div className="product-ratings">
                    <span
                      className="ratings"
                      style={{ width: ratingValue + "%" }}
                    ></span>
                  </div>
                </div>
                <span className="ratings-link" title="Reviews">
                  {ratingCount} Reviews
                </span>
              </div> */}
            </div>
            {/* End .product-meta-row */}
            <div className="product-content">
              <p>{itemp.Description}</p>
            </div>
            {/* End .product-content */}

            <ul className="product-meta-list">
              {productsStock.map((itemst, index) => (
                <li key={index}>
                  <label>Availability:</label>
                  <span className="product-stock">
                    {" "}
                    Hurry up..! Only {itemst.AvailableQty} Qty is left.
                  </span>
                </li>
              ))}
            </ul>

            {productsColors.length > 0 && (
              <div>
                <label>Color:</label>
                <ul className="filter-color-list">
                  {productsColors.map((itemc, index) => (
                    <li
                      data-target="#myCarousel"
                      data-slide-to={index}
                      onClick={() =>
                        AssignColorIndex(itemc.ColorId, itemc.Image)
                      }
                      className={colorIndex == itemc.ColorId ? "active" : ""}
                      key={index}
                    >
                      <span
                        className="filter-color"
                        style={{
                          backgroundImage:
                            "linear-gradient(" + itemc.Code + ")",
                        }}
                      ></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {productsSizes.length > 0 && (
              <div>
                <label>Size:</label>
                <ul className="filter-size-list">
                  {productsSizes.map((items, index) => (
                    <li
                      onClick={() => AssignSizeIndex(items.SizeId)}
                      className={sizeIndex == items.SizeId ? "active" : ""}
                      key={index}
                    >
                      <span className="filter-size">{items.SizeName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showMsg == true && (
              <div className="mt20">
                <div
                  //className="alert alert-success alert-dismissible"
                  className={msgClass}
                  role="alert"
                >
                  <strong>{msgText}</strong>
                </div>
              </div>
            )}

            <div className="product-action">
              {/* <div className="product-quantity">
                <label>QTD:</label>
                <input
                  className="single-product-quantity form-control"
                  type="text"
                  onChange={(e) => setQty(e.target.value)}
                />
              </div> */}
              {/* end .product-quantity */}

              <a
                onClick={() => addToCart("cart")}
                className="btn btn-accent btn-addtobag"
                style={{ marginRight: "10px" }}
              >
                Add to Cart
              </a>

              <a
                onClick={() => addToCart("buy")}
                className="btn btn-accent btn-addtobag"
              >
                Buy Now
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* End .row */}

      <div className="product-details-tab">
        {/* Nav tabs */}
        <ul className="nav nav-tabs" role="tablist">
          {isVideo && (
            <li role="presentation" className="active">
              <a
                href="#video"
                aria-controls="video"
                role="tab"
                data-toggle="tab"
              >
                Video
              </a>
            </li>
          )}
          {productsDescription.length > 0 && (
            <li role="presentation">
              <a
                href="#description"
                aria-controls="description"
                role="tab"
                data-toggle="tab"
              >
                Description
              </a>
            </li>
          )}
          {productsInformation.length > 0 && (
            <li role="presentation">
              <a
                href="#information"
                aria-controls="information"
                role="tab"
                data-toggle="tab"
              >
                Specification
              </a>
            </li>
          )}

          {/* <li role="presentation">
            <a
              href="#reviews"
              aria-controls="reviews"
              role="tab"
              data-toggle="tab"
            >
              Reviews
            </a>
          </li> */}
        </ul>

        {/* Tab panes */}
        <div className="tab-content">
          {isVideo && (
            <div role="tabpanel" className="tab-pane active" id="video">
              <iframe width="100%" height="345" src={isVideo}></iframe>
            </div>
          )}
          {productsDescription.length > 0 && (
            <div role="tabpanel" className="tab-pane" id="description">
              {productsDescription.map((item, index) => (
                <p key={index}>{item.Description}</p>
              ))}
            </div>
          )}

          {/* End .tab-pane */}
          {productsInformation.length > 0 && (
            <div role="tabpanel" className="tab-pane" id="information">
              <div className="table-responsive">
                <table className="table product-info-table">
                  <tbody>
                    {productsInformation.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Heading}:</td>
                        <td>{item.Description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* End .table-responsive */}
            </div>
          )}

          {/* End .tab-pane */}

          {/* <div role="tabpanel" className="tab-pane" id="reviews">
            <div className="product-reviews comments">
              <ul className="comments-list media-list">
                {productsReviews.map((item, index) => (
                  <li className="media" key={index}>
                    <div className="comment">
                      <div className="media-left">
                        <img
                          className="media-object"
                          src={item.Image}
                          alt={item.FName}
                        />
                      </div>
                      <div className="media-body">
                        <h4 className="media-heading">
                          {item.FName} {item.LName}
                        </h4>
                        <div className="ratings-container">
                          <div className="product-ratings">
                            <span
                              className="ratings"
                              style={{ width: item.Value }}
                            ></span>
                          </div>
                        </div>
                        <p>{item.Description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          {/* End .tab-pane */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
