import Layout from "@/components/Layout";
import Card from "@/components/Card";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Logos() {
  const [logos, setLogos] = useState([]);

  const getLogos = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logo/getAll`)
      .then((res) => {
        console.log(res.data);
        setLogos(res.data.data);
      });
  };

  const deleteLogoById = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logo/delete/${id}`)
      .then((res) => {
        if (res.data.statusCode === 201) toast("Logo deleted.");
        getLogos();
      })
      .catch((error) => {
        console.log(error);
        toast("Error");
      });
  };

  useEffect(() => {
    getLogos();
  }, []);

  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <div className="mt-2">
          <div className="page-title">
            <h4>Logos</h4>
          </div>
        </div>
        <div className="d-flex justify-content-end m-2">
          <Link
            className="btn btn-outlined-secondary border rounded"
            href={"/dashboard/logo/addlogo"}
          >
            Add Logo
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
            {logos &&
              logos.map((item) => {
                return (
                  <div
                    key={item._id}
                    style={{
                      position: "relative",
                      border: "1px solid #f4f4f4",
                    }}
                  >
                    {item.url && (
                      <div>
                        <img src={item.url} alt="" height="100" width="auto" />
                        <button
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            fontSize: "12px",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            border: 0,
                            borderRadius: "4px",
                            padding: "4px 6px",
                          }}
                          onClick={() => deleteLogoById(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
