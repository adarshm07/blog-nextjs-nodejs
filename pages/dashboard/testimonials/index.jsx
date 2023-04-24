import Layout from "@/components/Layout";
import Card from "@/components/Card";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonial = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonial/getAll`)
      .then((res) => {
        console.log(res.data);
        setTestimonials(res.data.data);
      });
  };

  const deletePostById = async (id) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonial/delete/${id}`
      )
      .then((res) => {
        if (res.data.statusCode === 201) toast("Testimonial post deleted.");
        getTestimonial();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };

  useEffect(() => {
    getTestimonial();
  }, []);

  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <div className="mt-2">
          <div className="page-title">
            <h4>Testimonials</h4>
          </div>
        </div>
        <div className="d-flex m-2">
          <Link
            className="btn btn-outlined-secondary border rounded"
            href={"/dashboard/testimonials/addtestimonial"}
          >
            Add Testimonial
          </Link>
        </div>
        <div className="my-4">
          <div
            style={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "20px",
            }}
          >
            {testimonials &&
              testimonials.map((item) => {
                return (
                  <Card
                    key={item._id}
                    id={item._id}
                    title={item.title}
                    description={item.description}
                    name={item.name}
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
