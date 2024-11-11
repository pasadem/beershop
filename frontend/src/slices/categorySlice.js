import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: { category: "", producer: "" } };

const cartSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.items.category = action.payload;
      
    },
    updateProducer: (state, action) => {
        state.items.producer = action.payload;
        
      },
      
  },
});

export const { updateCategory, updateProducer } = cartSlice.actions;

export default cartSlice.reducer;
