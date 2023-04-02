import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddPost() {
  const post = useSelector((state) => state.post);
  const [title, setTitle] = useState("");

  const publishPost = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/add`, {
        title: title,
        description: post.content,
      })
      .then((res) => {
        console.log(res.data.statusCode);
        if (res.data.statusCode === 201) toast("Blog Post published.");
      });
  };

  useEffect(() => {
    if (post.action === "addpost") {
      publishPost();
    }
  }, [post]);

  return (
    <Layout>
      <div className="mt-4">
        <input
          type={"text"}
          max="200"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-4"
          placeholder="Post Title"
        />
        <TextEditor content={post} />
      </div>
    </Layout>
  );
}
