import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import { updateAction, updateTitle } from "@/store/postSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EditPost() {
  const router = useRouter();
  const { editPost } = router.query;

  const dispatch = useDispatch();

  const post = useSelector((state) => state.post);

  const [currentPost, setCurrentPost] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editPost != undefined) {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/get/${editPost}`,
        headers: {},
      };
      axios(config)
        .then(function (response) {
          setCurrentPost(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    dispatch(updateAction(""));
  }, [editPost]);

  const handleChange = (e) => {
    setTitle(e.target.value);
    dispatch(updateTitle(e.target.value));
  };

  useEffect(() => {
    if (post.action === "editpost") {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/update/${editPost}`,
          {
            title: post.title,
            description: post.content,
          }
        )
        .then(function (response) {
          if (response.data.statusCode === 201) toast("Updated.");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [editPost, post]);

  return (
    <Layout>
      <div className="mt-4">
        {/* {currentPost && currentPost.title ? ( */}
        <input
          type={"text"}
          defaultValue={currentPost.title}
          max="200"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleChange}
          className="form-control mb-4"
          placeholder="Post Title"
        />
        {/* ) : null} */}
        {currentPost && currentPost.description ? (
          <TextEditor content={currentPost.description} />
        ) : (
          <p>Loading post...</p>
        )}
      </div>
    </Layout>
  );
}
