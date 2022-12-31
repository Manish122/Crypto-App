import { createReducer } from "@reduxjs/toolkit";

export const firstReducer = createReducer(
  {
    search: "",
  },
  {
    dataInput: (state, action) => {
      state.search = action.payload;
      // console.log(action.payload);
    },
  }
);
// export default firstReducer;
