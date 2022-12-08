import { createSlice } from '@reduxjs/toolkit'

const CategoriesSlice = createSlice({
    name: 'categories',
    initialState: {
      activeCategory: '',
      status: '',
    },
    reducers: {  
      setActiveCategory: (state, action) => {
        return {
          ...state,
          activeCategory: action.payload,
        };
      },
    },
  });
  
  export const { setActiveCategory } = CategoriesSlice.actions;
  export const CategoriesReducer = CategoriesSlice.reducer;
  