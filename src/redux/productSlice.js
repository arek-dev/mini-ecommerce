import { createSlice } from '@reduxjs/toolkit'

export const ProductSlice = createSlice({
    name: 'product',
    initialState: {
      activeProduct: {},
      status: '',
    },
    reducers: {  
      setActiveProduct: (state, action) => {
        return {
          ...state,
          activeProduct: action.payload,
        };
      },
    },
  });
  
  export const { setActiveProduct } = ProductSlice.actions;
  export const ProductReducer = ProductSlice.reducer;
  