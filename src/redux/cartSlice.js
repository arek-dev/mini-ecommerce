import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cartQuantity: 0,
    },
    reducers: {
      addProduct: (state, action)=>{
        const products = state.products.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, productQuantity: item.productQuantity + 1 };
          }
          return item;
          });

          if (state.products.find((item) => item.id === action.payload.id)) {
            return {
              ...state,
              products: [...products],
              cartQuantity: state.cartQuantity + 1,
            };
          }

          return {
            ...state,
            products: [
            ...state.products,
            { id: action.payload.id, product: action.payload, productQuantity: 1 },
            ],
            cartQuantity: state.cartQuantity + 1,     
          };                          
      },

      removeProduct: (state, action) => {
        if (state.products.find((item) => item.id === action.payload.id)) {
          if (state.products.find((item) => item.productQuantity === 1 && item.id === action.payload.id)) {
            return {
              ...state,
              products: state.products.filter((product) => {
                return product.id !== action.payload.id;
              }),
              cartQuantity: state.cartQuantity - 1,
            };
          }

          const products = state.products.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, productQuantity: item.productQuantity - 1 };
            }
            return item;
          });
            return {
              ...state,
              products: [...products],
              cartQuantity: state.cartQuantity - 1,
            };
          }             
      },
    },
});

export const {addProduct, removeProduct, doAmount} = CartSlice.actions;
export const CartReducer = CartSlice.reducer;

