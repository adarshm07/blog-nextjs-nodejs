import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditPost() {
  const router = useRouter();
  const { editPost } = router.query;
  const post = useSelector((state) => state.post);

  const [currentPost, setCurrentPost] = useState([]);

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
  }, [editPost]);

  useEffect(() => {
    if (post.action === "editpost") {
      axios
        .put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/update/${editPost}`,
          {
            title: "Blog Post 1",
            description: post.content,
          }
        )
        .then(function (response) {
          // setCurrentPost(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [post]);

  return (
    <Layout>
      <div>
        <h2>Edit Post</h2>
        {currentPost.title && <h2>{currentPost.title}</h2>}
        {currentPost.description ? (
          <TextEditor content={currentPost.description} />
        ) : (
          <p>Loading post...</p>
        )}
      </div>
    </Layout>
  );
}
