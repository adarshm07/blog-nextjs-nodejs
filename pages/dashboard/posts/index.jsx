import Layout from "@/components/Layout";
import { PostCard } from "@/components/PostCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

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
        console.log("Post Deleted", res);
        fetchBlog();
      });
  };

  const data = [
    {
      title: "Top 10 places to visit in Norway this summer",
      image:
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "August 18, 2022",
    },
    {
      title: "Best forests to visit in North America",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "August 27, 2022",
    },
    {
      title: "Hawaii beaches review: better than you think",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "September 9, 2022",
    },
    {
      title: "Mountains at night: 12 best locations to enjoy the view",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "September 12, 2022",
    },
    {
      title: "Top 10 places to visit in Norway this summer",
      image:
        "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "August 18, 2022",
    },
    {
      title: "Best forests to visit in North America",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "August 27, 2022",
    },
    {
      title: "Hawaii beaches review: better than you think",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "September 9, 2022",
    },
    {
      title: "Mountains at night: 12 best locations to enjoy the view",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
      date: "September 12, 2022",
    },
  ];
  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <h2>Posts</h2>
        <div>
          {posts &&
            posts.map((post, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <p className="m-0">{post.title}</p>
                  <div>
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
