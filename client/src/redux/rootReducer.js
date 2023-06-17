const initState = {
  loading: false,
  cartItems: [],
};

export const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "deleteFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "updateCart":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, number: action.payload.number }
            : item
        ),
      };
    case "showLoading":
      return {
        ...state,
        loading: true
      };
    case "hideLoading":
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
