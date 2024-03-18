import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProtectedRoute from "../service/UserProtectedRoute";
import AdminProtectedRoute from "../service/AdminProtectedRoute";

//import Site from "../site/Site";
import SiteContainer from "../containers/SiteContainer";
//import User from '../user/User'
import Admin from "../admin/Admin";

// site views
import Home from "../site/Home";
import About from "../site/About";
import Contact from "../site/Contact";
import UserLogin from "../site/UserLogin";
import CreateAccount from "../site/CreateAccount";
import VerifyOtp from "../site/VerifyOtp";
import Welcome from "../site/Welcome";
import Categories from "../site/Categories";
import Subcategories from "../site/Subcategories";
import Products from "../site/Products";
import SearchResult from "../site/SearchResult";
// import ProductDetails from "../site/ProductDetails";
import ProductDetailsConatiner from "../containers/ProductDetailsConatiner";
import AdminLogin from "../site/AdminLogin";

// user Views
import UserProfile from "../user/UserProfile";
// import Cart from "../user/Cart";
import CartContainer from "../containers/CartContainer";
import ResetPass from "../user/ResetPass";
import CheckoutContainer from "../containers/CheckoutContainer";
import OrderStatus from "../user/OrderStatus";
import Orders from "../user/Orders";

// admin Views
import AdminProfile from "../admin/AdminProfile";
import UpdateLogo from "../admin/UpdateLogo";
import ManageCategories from "../admin/ManageCategories";
import CategoryForm from "../admin/CategoryForm";
import SubCategoryForm from "../admin/SubCategoryForm";
import ManageSubCategories from "../admin/ManageSubCategories";
import ManageProducts from "../admin/ManageProducts";
import ProductForm from "../admin/ProductForm";
import ManageColors from "../admin/ManageColors";
import ColorForm from "../admin/ColorForm";
import ManageImages from "../admin/ManageImages";
import ImagesForm from "../admin/ImagesForm";
import ManageDescription from "../admin/ManageDescription";
import DescriptionForm from "../admin/DescriptionForm";
import ManageInformations from "../admin/ManageInformations";
import InformationForm from "../admin/InformationForm";
import ManageSizes from "../admin/ManageSizes";
import SizeForm from "../admin/SizeForm";
import ManageSlider from "../admin/ManageSlider";
import SliderForm from "../admin/SliderForm";
import PlacedOrders from "../admin/PlacedOrders";

function Routers() {
  return (
    <Router>
      <Switch>
        <Route path="/:path?" exact>
          <SiteContainer>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/login" component={UserLogin} />
              <Route path="/admin" component={AdminLogin} />
              <Route path="/create" component={CreateAccount} />
              <Route path="/verify-otp" component={VerifyOtp} />
              <Route path="/welcome" component={Welcome} />
              <Route path="/categories" component={Categories} />
              <Route path="/sub-categories" component={Subcategories} />
              <Route path="/products" component={Products} />
              <Route path="/search-result" component={SearchResult} />
              {/* <Route path="/product-details" component={ProductDetails} /> */}
              <Route
                path="/product-details"
                component={ProductDetailsConatiner}
              />
              <UserProtectedRoute path="/profile" component={UserProfile} />
              <UserProtectedRoute path="/cart" component={CartContainer} />
              <UserProtectedRoute path="/reset-pass" component={ResetPass} />
              <UserProtectedRoute
                path="/checkout"
                component={CheckoutContainer}
              />
              <UserProtectedRoute
                path="/order-status"
                component={OrderStatus}
              />
              <UserProtectedRoute path="/placed-orders" component={Orders} />
            </Switch>
          </SiteContainer>
        </Route>

        {/* <Route path='/user/:path?' exact>
        <User>
          <Switch>
            <Route path='/user/profile' component={UserProfile} />
          </Switch>
        </User>
      </Route> */}

        <Route path="/admin/:path?" exact>
          <Admin>
            <Switch>
              <AdminProtectedRoute
                path="/admin/profile"
                component={AdminProfile}
              />
              <AdminProtectedRoute
                path="/admin/update-logo"
                component={UpdateLogo}
              />
              <AdminProtectedRoute
                path="/admin/manage-categories"
                component={ManageCategories}
              />
              <AdminProtectedRoute
                path="/admin/category"
                component={CategoryForm}
              />
              <AdminProtectedRoute
                path="/admin/manage-sub-categories"
                component={ManageSubCategories}
              />
              <AdminProtectedRoute
                path="/admin/sub-category"
                component={SubCategoryForm}
              />
              <AdminProtectedRoute
                path="/admin/manage-products"
                component={ManageProducts}
              />
              <AdminProtectedRoute
                path="/admin/product"
                component={ProductForm}
              />
              <AdminProtectedRoute
                path="/admin/manage-colors"
                component={ManageColors}
              />
              <AdminProtectedRoute path="/admin/color" component={ColorForm} />
              <AdminProtectedRoute
                path="/admin/manage-images"
                component={ManageImages}
              />
              <AdminProtectedRoute path="/admin/image" component={ImagesForm} />
              <AdminProtectedRoute
                path="/admin/manage-descriptions"
                component={ManageDescription}
              />
              <AdminProtectedRoute
                path="/admin/descriptions"
                component={DescriptionForm}
              />
              <AdminProtectedRoute
                path="/admin/manage-informations"
                component={ManageInformations}
              />
              <AdminProtectedRoute
                path="/admin/informations"
                component={InformationForm}
              />
              <AdminProtectedRoute
                path="/admin/manage-sizes"
                component={ManageSizes}
              />
              <AdminProtectedRoute path="/admin/sizes" component={SizeForm} />
              <AdminProtectedRoute
                path="/admin/manage-slider"
                component={ManageSlider}
              />
              <AdminProtectedRoute
                path="/admin/slider"
                component={SliderForm}
              />
              <AdminProtectedRoute
                path="/admin/orders"
                component={PlacedOrders}
              />
            </Switch>
          </Admin>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routers;
