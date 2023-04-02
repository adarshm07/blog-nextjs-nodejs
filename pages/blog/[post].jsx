import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
  const router = useRouter();
  const { post } = router.query;

  const [currentPost, setCurrentPost] = useState([]);
  console.log(post);

  useEffect(() => {
    if (post != undefined) {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog/get/${post}`,
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
  }, [post]);

  return (
    <Layout>
      <div className="blog-title">
        <h4>{currentPost.title}</h4>
      </div>
      <div className="blog-description">
        <p dangerouslySetInnerHTML={{ __html: currentPost.description }}></p>
      </div>
    </Layout>
  );
}
