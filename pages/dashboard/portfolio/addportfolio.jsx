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
      .catch((error) => console.log("error", error));
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
        <ImageUpload
          onDrop={onUpload}
          accept={["application/pdf"]}
          reject="PDF file less than 5mb"
          uploadImg="Upload PDF"
          description="Drag'n'drop files here to upload. We can accept only .pdf files that are less than 5mb in size."
        />
        {portfolio.url !== "" ? (
          <div style={{ margin: "10px 0px" }}>
            <span className="text-muted">PDF Uploaded. Ready to Publish.</span>
          </div>
        ) : null}
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
