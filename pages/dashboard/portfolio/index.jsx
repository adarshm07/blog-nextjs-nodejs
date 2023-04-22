import Layout from "@/components/Layout";
import Card from "@/components/Card";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);

  const getPortfolio = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/getAll`)
      .then((res) => {
        console.log(res.data);
        setPortfolio(res.data.data);
      });
  };

  const deletePostById = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/delete/${id}`)
      .then((res) => {
        if (res.data.statusCode === 201) toast.success("Portfolio deleted.");
        getPortfolio();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <div className="mt-2">
          <div className="page-title">
            <h4>Testimonials</h4>
          </div>
        </div>
        <div className="d-flex justify-content-end m-2">
          <Link
            className="btn btn-outlined-secondary border rounded"
            href={"/dashboard/portfolio/addportfolio"}
          >
            Add Portfolio
          </Link>
        </div>
        <div className="my-4">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {portfolio &&
              portfolio.map((item) => {
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    // title={item.url}
                    description={item.description}
                    // name={item.name}
                    showEdit={false}
                    link={item.url}
                    deleteById={deletePostById}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
