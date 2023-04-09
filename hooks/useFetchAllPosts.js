import { fetchBlog } from "@/store/postSlice";
import { useDispatch } from "react-redux";

export const useFetchAllPosts = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/getall`
      );
      const res = await data.json();
      dispatch(fetchBlog(res.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  return fetchData;
};
