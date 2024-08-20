import { createSlice } from '@reduxjs/toolkit'

// // Load cart items from local storage
// const loadCartItems = () => {
//     if (typeof window !== "undefined") {
//       const storedCartItems = localStorage.getItem('cartItems');
//       return storedCartItems ? JSON.parse(storedCartItems) : [];
//     }
//     return [];
//   };

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    // cartItems: loadCartItems(),
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
        // state.cartItems = action.payload

        const item = state.cartItems.find(
            // (p) => p.id === action.payload.id
            (p) => p.id === action.payload.id && p.selectedSize === action.payload.selectedSize
        );
        if (item) {
            item.quantity++;
            item.attributes.price = item.oneQuantityPrice * item.quantity;
        }else{
            state.cartItems.push({ ...action.payload, quantity: 1 });
        }

        // Save updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    clearCart(state) {
      state.cartItems = [];
      // Clear localStorage as well
      localStorage.removeItem('cartItems');
    },

    updateCart: (state, action) => {
        state.cartItems = state.cartItems.map((cp) => {
            // if(cp.id === action.payload.id){
            if(cp.id === action.payload.id && cp.selectedSize === action.payload.selectedSize){
                if(action.payload.key === "quantity"){
                    cp.attributes.price = cp.oneQuantityPrice * action.payload.val
                }
                return {...cp, [action.payload.key]: action.payload.val}
            }
            return cp;
        })

        // Save updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(
            // cp.id !== action.payload.id
            (cp) => !(cp.id === action.payload.id && cp.selectedSize === action.payload.selectedSize)
        )

        // Save updated cart to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    loadCartFromLocalStorage: (state) => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          state.cartItems = JSON.parse(storedCartItems);
        }
    },

  }
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart, loadCartFromLocalStorage, clearCart } = cartSlice.actions

export default cartSlice.reducer