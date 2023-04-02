import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    title: "",
    content: "",
    action: "",
  },
  reducers: {
    // void is added to fix immer issue.
    updateTitle: (state, action) => void (state.title = action.payload),
    updatePost: (state, action) => void (state.content = action.payload),
    updateAction: (state, action) => void (state.action = action.payload),
  },
});

export const { updateTitle, updatePost, updateAction } = postSlice.actions;
export default postSlice.reducer;
