import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function Categories() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    loadCatData();
  }, []);

  const loadCatData = () => {
    setIsLoading(true);
    Service.getAllCategories().then((res) => {
      setCatData(res.data);
      setIsLoading(false);
    });
  };

  const Subcategories = (item) => {
    localStorage.setItem("ViewCatId", item.CatId);
    history.push("/sub-categories");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      <div className="category-header">
        <h1>Shop By Categories</h1>
      </div>

      <div className="shop-row">
        <div className="shop-container max-col-4" data-layout="fitRows">
          {catData.map((item, index) => (
            <div className="product-item" key={index}>
              <div className="product">
                <figure className="product-image-container mb0">
                  <a
                    onClick={() => Subcategories(item)}
                    title="Product Name"
                    className="product-image-link"
                  >
                    <img src={item.CatImage} alt={item.CatName} />
                  </a>
                  <div className="product-action">
                    <a
                      onClick={() => Subcategories(item)}
                      className="btn-product btn-add-cart"
                      title="Add to Bag"
                    >
                      <i className="icon-product icon-bag"></i>
                      <span>View Products</span>
                    </a>
                  </div>
                  {/* End .product-action */}
                </figure>
                {/* <h3 className="product-title">
                  <a href="product.html">{item.CatName}</a>
                </h3> */}
                <div className="product-price-container text-center">
                  <span className="product-price">{item.CatName}</span>
                </div>
                {/* Endd .product-price-container */}
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

export default Categories;
