import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function Subcategories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [subCatData, setSubCatData] = useState([]);

  useEffect(() => {
    loadSubCatData();
  }, [localStorage.getItem("ViewCatId")]);

  const loadSubCatData = () => {
    setIsLoading(true);
    Service.getSubcategories(localStorage.getItem("ViewCatId")).then((res) => {
      setSubCatData(res.data);
      setIsLoading(false);
    });
  };

  const viewproducts = (item) => {
    localStorage.setItem("ViewSCatId", item.SCatId);
    history.push("/products");
  };


  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="category-header">
        <h1>Shop By Sub-Categories</h1>
      </div>

      <div className="shop-row">
        <div className="shop-container max-col-4" data-layout="fitRows">
          {subCatData.map((item, index) => (
            <div className="product-item" key={index}>
              <div className="product">
                <figure className="product-image-container mb0">
                  <a
                    onClick={() => viewproducts(item)}
                    title="Product Name"
                    className="product-image-link"
                  >
                    <img src={item.SCatImage} alt={item.SCatName} />
                  </a>
                  <div className="product-action">
                    <a
                      onClick={() => viewproducts(item)}
                      className="btn-product btn-add-cart"
                      title="View Products"
                    >
                      <i className="icon-product icon-bag"></i>
                      <span>View Products</span>
                    </a>
                  </div>
                </figure>
                <div className="product-price-container text-center">
                  <span className="product-price">{item.SCatName}</span>
                </div>
              </div>
              {/* End .product */}
            </div>
          ))}
        </div>
      </div>
      {/* End .shop-row */}
    </div>
  );
}

export default Subcategories;
