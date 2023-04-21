import { ImageUpload } from "@/components/ImageUpload";
import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddLogo() {
  // const post = useSelector((state) => state.post);
  const [logo, setLogo] = useState();

  const uploadLogo = async (file) => {
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
      .then((response) => response.json())
      .then(async (result) => {
        let raw = { url: await result.data.path };
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logo/add`, {
          method: "POST",
          body: JSON.stringify(raw),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(async (res) => {
            const result = await res.json();
            if (result.statusCode === 201) toast("Logo uploaded");
          })
          .catch((err) => {
            console.log(err);
            toast("Error, couldn't upload");
          });
      })
      .catch((error) => console.log("error", error));

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonial/add`, logo)
    //   .then((res) => {
    //     console.log(res.data.statusCode);
    //     if (res.data.statusCode === 201) toast("Logo Uploaded.");
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
        <h4>Add Logo</h4>
        <hr />
        <br />
        {/* <input type="file" name="image" value={logo} onChange={(e) => console.log(e.target)}/> */}
        {/* create an input field to accept images */}
        <ImageUpload onDrop={uploadLogo} />

        {/* <Button variant="outline" onClick={() => uploadLogo()}>
          Add Logo
        </Button> */}
      </div>
    </Layout>
  );
}
