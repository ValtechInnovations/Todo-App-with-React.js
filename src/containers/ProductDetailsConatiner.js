import ProductDetails from '../site/ProductDetails'
import {connect} from 'react-redux'
import {addToCart} from '../service/redux/actions/actions'

const mapStateToProps=state=>({
    // data:state.cardItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(ProductDetails)
// export default Home;