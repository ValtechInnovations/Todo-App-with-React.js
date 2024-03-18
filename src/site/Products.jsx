import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [localStorage.getItem("ViewSCatId")]);

  const loadProducts = () => {
    setIsLoading(true);
    Service.getProducts(localStorage.getItem("ViewSCatId")).then((res) => {
      setProductsData(res.data);
      setIsLoading(false);
    });
  };

  const details = (item) => {
    localStorage.setItem("ViewProdId", item.ProdId);
    history.push("/product-details");
  };

  const shopping = () => {
    history.push("/categories");
  };

  return (
    <div className="col-md-9 col-md-push-3">
      {isLoading ? <Loader /> : null}
      {productsData.length <= 0 ? (
        <div>
          <div className="page-header text-center">
            <h1>Product are not available in this categories..!</h1>
          </div>
          <form action="#" className="signin-form">
            <div className="clearfix form-action">
              <input
                onClick={() => shopping()}
                type="submit"
                className="btn btn-accent center-block min-width"
                value="Continue Shopping"
              />
            </div>
            {/* End .form-action */}
          </form>
        </div>
      ) : (
        <div>
          <div className="category-header">
            <h1>Product List</h1>
          </div>

          <div className="shop-row">
            <div className="shop-container max-col-4" data-layout="fitRows">
              {productsData.map((item, index) => (
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
          {/* End .shop-row */}
        </div>
      )}
    </div>
  );
}

export default Products;
