import axios from "axios";

const BASE_URL = "http://localhost:5000/master-computer-api";
// const BASE_URL = "https://atjoin.in/ved-paithani-api";
// const BASE_URL = "https://master.computer.edumaster.co.in/master-computer-api";

class Service {
  getOrgData() {
    return axios.get(BASE_URL + "/orginfo");
  }

  getCartCount(id) {
    return axios.get(BASE_URL + "/cart/count/" + id);
  }

  getAboutData() {
    return axios.get(BASE_URL + "/orginfo/about");
  }

  getAllCategories() {
    return axios.get(BASE_URL + "/categories");
  }

  getAllSubCategories() {
    return axios.get(BASE_URL + "/categories/all-subcategories");
  }

  getCatSubCat() {
    return axios.get(BASE_URL + "/categories/categories-subcategories");
  }

  getSubcategories(id) {
    return axios.get(BASE_URL + "/categories/subcategories/" + id);
  }

  getProducts(id) {
    return axios.get(BASE_URL + "/products/" + id);
  }

  getAllProducts() {
    return axios.get(BASE_URL + "/products");
  }

  getAllOrders() {
    return axios.get(BASE_URL + "/orders");
  }

  getColorByProduct(id) {
    return axios.get(BASE_URL + "/colors/" + id);
  }

  getDescriptionByProduct(id) {
    return axios.get(BASE_URL + "/descriptions/" + id);
  }

  getSizesByProduct(id) {
    return axios.get(BASE_URL + "/sizes/" + id);
  }

  getInfoByProduct(id) {
    return axios.get(BASE_URL + "/informations/" + id);
  }

  getImagesByProduct(id) {
    return axios.get(BASE_URL + "/images/" + id);
  }

  searchProduct(id) {
    return axios.get(BASE_URL + "/products/search-products/" + id);
  }

  getTrendingProducts() {
    return axios.get(BASE_URL + "/products/trending/products");
  }

  getSingleProductDetails(id) {
    return axios.get(BASE_URL + "/products/details/" + id);
  }

  getCartData(id) {
    return axios.get(BASE_URL + "/cart/" + id);
  }

  getProfileData(id) {
    return axios.get(BASE_URL + "/users/" + id);
  }

  updateCartProductQty(data) {
    return axios.post(BASE_URL + "/cart/update-cart", data);
  }

  deleteCartProduct(id) {
    return axios.delete(BASE_URL + "/cart/delete-cart/" + id);
  }

  deleteCategory(id) {
    return axios.delete(BASE_URL + "/categories/delete-categories/" + id);
  }

  deleteSubCategory(id) {
    return axios.delete(BASE_URL + "/categories/delete-sub-categories/" + id);
  }

  deleteSlider(id) {
    return axios.delete(BASE_URL + "/sliders/delete-slider/" + id);
  }

  deleteColor(id) {
    return axios.delete(BASE_URL + "/colors/delete-color/" + id);
  }

  deleteDescription(id) {
    return axios.delete(BASE_URL + "/descriptions/delete-description/" + id);
  }

  deleteSize(id) {
    return axios.delete(BASE_URL + "/sizes/delete-size/" + id);
  }

  deleteInfo(id) {
    return axios.delete(BASE_URL + "/informations/delete-information/" + id);
  }

  deleteImage(id) {
    return axios.delete(BASE_URL + "/images/delete-image/" + id);
  }

  deleteProduct(id) {
    return axios.delete(BASE_URL + "/products/delete-product/" + id);
  }

  deleteOrder(id) {
    return axios.delete(BASE_URL + "/orders/delete-order/" + id);
  }

  updateOrderStatus(status, orderId) {
    return axios.get(
      BASE_URL + "/orders/update-order-status/" + status + "/" + orderId
    );
  }

  getTotalRatings(id) {
    return axios.get(BASE_URL + "/products/total/rating/" + id);
  }

  getSingleProductImages(id) {
    return axios.get(BASE_URL + "/products/images/" + id);
  }

  getSingleProductColors(id) {
    return axios.get(BASE_URL + "/products/colors/" + id);
  }

  getSingleProductSizes(id) {
    return axios.get(BASE_URL + "/products/sizes/" + id);
  }

  getSingleProductDescription(id) {
    return axios.get(BASE_URL + "/products/description/" + id);
  }

  getSingleProductInformation(id) {
    return axios.get(BASE_URL + "/products/information/" + id);
  }

  getSingleProductReviews(id) {
    return axios.get(BASE_URL + "/products/reviews/" + id);
  }

  getSingleProductStock(id) {
    return axios.get(BASE_URL + "/products/stock/" + id);
  }

  getSliders() {
    return axios.get(BASE_URL + "/sliders");
  }

  getUserOrders(id) {
    return axios.get(BASE_URL + "/orders/get-user-orders/" + id);
  }

  getTestimonials() {
    return axios.get(BASE_URL + "/orginfo/get-testimonials");
  }

  sendEnquiry(data) {
    return axios.post(BASE_URL + "/orginfo/enquiry", data);
  }

  addToCart(data) {
    return axios.post(BASE_URL + "/cart/add-to-cart", data);
  }

  getPostalData(pincode) {
    return axios.get("https://api.postalpincode.in/pincode/" + pincode);
  }

  createAccount(data) {
    return axios.post(BASE_URL + "/users/create-account", data);
  }

  updateProfile(data) {
    return axios.post(BASE_URL + "/users/update-profile", data);
  }

  updateOrgProfile(data) {
    return axios.post(BASE_URL + "/orginfo/update-profile", data);
  }

  updateLogo(data) {
    return axios.post(BASE_URL + "/orginfo/update-logo", data);
  }

  addNewCategory(data) {
    return axios.post(BASE_URL + "/categories/add-new", data);
  }

  addNewSubCategory(data) {
    return axios.post(BASE_URL + "/categories/add-new-sub-category", data);
  }

  addNewSlider(data) {
    return axios.post(BASE_URL + "/sliders/add-slider", data);
  }

  addNewImage(data) {
    return axios.post(BASE_URL + "/images/add-new-image", data);
  }

  addNewColor(data) {
    return axios.post(BASE_URL + "/colors/add-new-color", data);
  }

  addNewDesc(data) {
    return axios.post(BASE_URL + "/descriptions/add-new-description", data);
  }

  addNewSize(data) {
    return axios.post(BASE_URL + "/sizes/add-new-size", data);
  }

  addNewInfo(data) {
    return axios.post(BASE_URL + "/informations/add-new-information", data);
  }

  addNewProduct(data) {
    return axios.post(BASE_URL + "/products/add-new-product", data);
  }

  updateCategory(data) {
    return axios.post(BASE_URL + "/categories/update-category", data);
  }

  updateSubCategory(data) {
    return axios.post(BASE_URL + "/categories/update-sub-category", data);
  }

  updateSlider(data) {
    return axios.post(BASE_URL + "/sliders/update-slider", data);
  }

  updateImage(data) {
    return axios.post(BASE_URL + "/images/update-image", data);
  }

  updateColor(data) {
    return axios.post(BASE_URL + "/colors/update-color", data);
  }

  updateDesc(data) {
    return axios.post(BASE_URL + "/descriptions/update-description", data);
  }

  updateSize(data) {
    return axios.post(BASE_URL + "/sizes/update-size", data);
  }

  updateInfo(data) {
    return axios.post(BASE_URL + "/informations/update-information", data);
  }

  updateProduct(data) {
    return axios.post(BASE_URL + "/products/update-product", data);
  }

  verifyOtp(data) {
    return axios.post(BASE_URL + "/users/check-otp", data);
  }

  userLogin(data) {
    return axios.post(BASE_URL + "/users/user-login", data);
  }

  adminLogin(data) {
    return axios.post(BASE_URL + "/orginfo/admin-login", data);
  }

  placeOrder(data) {
    return axios.post(BASE_URL + "/orders/place-order", data);
  }

  // createEmployee(employee){
  //     return axios.post(EMPLOYEE_API_BASE_URL, employee);
  // }

  // getEmployeeById(employeeId){
  //     return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
  // }

  // updateEmployee(employee, employeeId){
  //     return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
  // }

  // deleteEmployee(employeeId){
  //     return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
  // }
}

export default new Service();
