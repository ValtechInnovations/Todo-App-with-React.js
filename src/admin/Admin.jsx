import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Service from "../service/Service";
import Loader from "../service/Loader";
import { useHistory } from "react-router-dom";

function Admin({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [orgData, setOrgData] = useState([]);

  useEffect(() => {
    loadOrgData();
  }, []);

  const loadOrgData = () => {
    setIsLoading(true);
    Service.getOrgData().then((res) => {
      setOrgData(res.data);
      setIsLoading(false);
    });
  };

  const logout = () => {
    localStorage.removeItem("AdminLogin");
    history.push("/admin");
  };

  return (
    <div id="wrapper">
      {isLoading ? <Loader /> : null}

      <div className="main">
        <div className="container-fluid">
          <div className="row">
            {children}
            <aside className="col-md-3 col-md-pull-9 sidebar sidebar-shop">
              <div className="widget widget-box widget-shop-category active">
                <h3 className="widget-title">Admin Dashboard</h3>
                <hr />

                <ul className="shop-category-list accordion">
                  <li>
                    <Link to="/admin/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/admin/profile">Profile</Link>
                  </li>
                  {/* <li>
                    <Link to="/admin/update-logo">Update Logo</Link>
                  </li> */}
                  <li>
                    <Link to="/admin/manage-slider">Manage Slider</Link>
                  </li>
                  <li>
                    <Link to="/admin/manage-categories">Manage Categories</Link>
                  </li>
                  <li>
                    <Link to="/admin/manage-sub-categories">
                      Manage Sub Categories
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/manage-products">Manage Products</Link>
                  </li>

                  {/* Color option hide for master computer no need for this option */}
                  {/* <li>
                    <Link to="/admin/manage-colors">Manage Colors</Link>
                  </li>
                  <li>
                    <Link to="/admin/manage-sizes">Manage Sizes</Link>
                  </li> */}
                  <li>
                    <Link to="/admin/manage-images">Manage Images</Link>
                  </li>
                  <li>
                    <Link to="/admin/manage-descriptions">
                      Manage Description
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/manage-informations">
                      Manage Specifications
                    </Link>
                  </li>
                  <li className="text-center">
                    <a
                      target="_blank"
                      href="https://master.computer.edumaster.co.in/"
                      className="btn btn-success text-white"
                      style={{ marginRight: "1rem" }}
                    >
                      View Site
                    </a>
                    <a
                      onClick={() => logout()}
                      className="btn btn-danger text-white"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
              {/* End .widget */}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
