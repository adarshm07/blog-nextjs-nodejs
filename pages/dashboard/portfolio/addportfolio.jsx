import { ImageUpload } from "@/components/ImageUpload";
import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddPortfolio() {
  // const post = useSelector((state) => state.post);
  const [portfolio, setPortfolio] = useState({
    url: "",
    description: "",
  });

  const publishPortfolio = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/add`, portfolio)
      .then((res) => {
        console.log(res.data.statusCode);
        if (res.data.statusCode === 201) toast.success("Portfolio published.");
      });
  };

  const onUpload = async (file) => {
    var formdata = new FormData();
    formdata.append("image", file[0], file[0].name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/upload`,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
        setPortfolio({ ...portfolio, url: data.data.path });
      })

      // .then(async (result) => {
      //   let raw = { url: await result.data.path,  };
      //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/add`, {
      //     method: "POST",
      //     body: JSON.stringify(raw),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //     .then(async (res) => {
      //       const result = await res.json();
      //       if (result.statusCode === 201) toast("Logo uploaded");
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       toast("Error, couldn't upload");
      //     });
      // })
      .catch((error) => console.log("error", error));

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile/add`, formData)
    //   .then((res) => {
    //     console.log(res.data.statusCode);
    //     if (res.data.statusCode === 201) toast.success("Portfolio published.");
    //   });
  };

  return (
    <Layout>
      <div
        className="mt-4"
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h4>Add Portfolio</h4>
        <hr />
        <br />
        {/* input type file */}
        <ImageUpload onDrop={onUpload} />
        <textarea
          max="400"
          name="description"
          onChange={(e) =>
            setPortfolio({ ...portfolio, description: e.target.value })
          }
          className="form-control mb-4"
          placeholder="Description"
        />
        <input
          type={"hidden"}
          max="200"
          name="url"
          onChange={(e) => setPortfolio({ ...portfolio, url: e.target.value })}
          className="form-control mb-4"
          placeholder="URL"
        />

        <Button variant="outline" onClick={() => publishPortfolio()}>
          Add Portfolio
        </Button>
      </div>
    </Layout>
  );
}
