import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const notify = () => toast("Wow so easy!");

  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/getall`,
    headers: {},
  };

  const fetchBlog = async () => {
    axios(config)
      .then(function (response) {
        setPosts(response.data.data);
        if (response.data.statusCode === 200) toast("Blog posts fetched.");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  // console.log(posts);

  const deletePostById = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/delete/${id}`)
      .then((res) => {
        if (res.data.statusCode === 201) toast("Blog post deleted.");
        fetchBlog();
      })
      .catch((error) => {
        console.log(error);
        toast("Error");
      });
  };

  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <div className="mt-2">
          <div className="page-title">
            <h4>Posts</h4>
          </div>
        </div>
        <div className="d-flex justify-content-end m-2">
          <Link
            className="btn btn-outlined-secondary border rounded"
            href={"/dashboard/posts/addpost"}
          >
            Add Post
          </Link>
        </div>
        <div className="my-4">
          {posts &&
            posts.map((post, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center p-2 m-2 border rounded"
                >
                  <p className="m-0">{post.title}</p>
                  <div className="d-flex" style={{ gap: "4px" }}>
                    <button
                      className="btn btn-sm btn-text"
                      onClick={() => window.open(`/blog/${post._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-text"
                      onClick={() =>
                        window.open(`/dashboard/posts/${post._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-text"
                      onClick={(e) => deletePostById(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}
