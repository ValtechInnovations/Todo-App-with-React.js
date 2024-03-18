import Site from "../site/Site";
import { connect } from "react-redux";
import {addToCart} from '../service/redux/actions/actions'

const mapStateToProps = (state) => ({
  data: state.cartItems,
});
const mapDispatchToProps=dispatch=>({
  addToCartHandler:data=>dispatch(addToCart(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Site);
// export default Home;
