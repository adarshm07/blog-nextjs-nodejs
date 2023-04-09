import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"; // Step 1: Import useDispatch

const postSlice = createSlice({
  name: "post",
  initialState: {
    title: "",
    content: "",
    action: "",
    allPosts: [],
  },
  reducers: {
    // void is added to fix immer issue.
    updateTitle: (state, action) => void (state.title = action.payload),
    updatePost: (state, action) => void (state.content = action.payload),
    updateAction: (state, action) => void (state.action = action.payload),
    fetchBlog: (state, action) => void (state.allPosts = action.payload), // fix the action to set allPosts
  },
});

export const { updateTitle, updatePost, updateAction, fetchBlog } =
  postSlice.actions;
export default postSlice.reducer;

// export const FetchAllPosts = async () => {
//   const dispatch = useDispatch(); // Step 2: Get a reference to the Redux store's dispatch function

//   try {
//     const data = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/getall`
//     );
//     const res = await data.json();
//     dispatch(fetchBlog(res.data.data)); // Step 3: Dispatch the fetchBlog action with the data received from the API
//   } catch (error) {
//     console.log("error", error);
//   }
// };
