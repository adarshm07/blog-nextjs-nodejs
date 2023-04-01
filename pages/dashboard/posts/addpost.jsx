import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AddPost() {
  const post = useSelector((state) => state.post);

  const publishPost = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/add`, {
        title: "Blog post 4",
        description: post.content,
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    if (post.action === "addpost") {
      publishPost();
    }
  }, [post]);

  return (
    <Layout>
      <div>
        <h2>Add Post</h2>
        <TextEditor content={post} />
      </div>
    </Layout>
  );
}
