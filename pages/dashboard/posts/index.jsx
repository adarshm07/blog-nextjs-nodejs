import Layout from "@/components/Layout";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchAllPosts } from "@/hooks/useFetchAllPosts";

export default function Posts() {
  const allPosts = useSelector((state) => state.post.allPosts);
  const fetchAllPosts = useFetchAllPosts();

  useEffect(() => {
    fetchAllPosts();
  }, [allPosts]);

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
          <PostCard posts={allPosts} />
        </div>
      </div>
    </Layout>
  );
}
