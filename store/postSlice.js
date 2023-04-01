import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    content: "",
    action: "",
  },
  reducers: {
    // void is added to fix immer issue.
    updatePost: (state, action) => void (state.content = action.payload),
    updateAction: (state, action) => void (state.action = action.payload),
  },
});

export const { updatePost, updateAction } = postSlice.actions;
export default postSlice.reducer;
