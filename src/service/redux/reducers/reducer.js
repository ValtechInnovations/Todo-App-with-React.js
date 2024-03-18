const initialState = {
    cartData: []
}
export default function cartItems(state = [], action) {
    switch (action.type) {
        case "ADD_TO_CART":
             return [
               action.data
            ]
        default:
            return state
    }
}
