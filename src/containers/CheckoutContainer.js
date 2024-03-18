import Checkout from "../user/Checkout";
import { connect } from "react-redux";
import { addToCart } from "../service/redux/actions/actions";

const mapStateToProps = (state) => ({
  data: state.cartItems,
});
const mapDispatchToProps = (dispatch) => ({
  addToCartHandler: (data) => dispatch(addToCart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
// export default Home;
