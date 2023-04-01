import Layout from "@/components/Layout";
import { PostCard } from "@/components/PostCard";
import SideBar from "@/container/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
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
  return (
    <div>
      <Layout>
        <h2>Dashboard</h2>
        <PostCard posts={posts} />
      </Layout>
    </div>
  );
}
