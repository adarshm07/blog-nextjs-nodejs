import { ImageUpload } from "@/components/ImageUpload";
import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddTestimonial() {
  // const post = useSelector((state) => state.post);
  const [testimonial, setTestimonial] = useState({
    name: "",
    title: "",
    description: "",
    url: "",
  });

  const publishTestimonial = async () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonial/add`,
        testimonial
      )
      .then((res) => {
        console.log(res.data.statusCode);
        if (res.data.statusCode === 201) toast("Testimonial published.");
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
        setTestimonial({ ...testimonial, url: data.data.path });
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
        <h4>Add Testimonial</h4>
        <hr />
        <br />
        <input
          type={"text"}
          max="200"
          name="name"
          onChange={(e) =>
            setTestimonial({ ...testimonial, name: e.target.value })
          }
          className="form-control mb-4"
          placeholder="Name"
        />
        <input
          type={"text"}
          max="200"
          name="title"
          onChange={(e) =>
            setTestimonial({ ...testimonial, title: e.target.value })
          }
          className="form-control mb-4"
          placeholder="Title"
        />
        <textarea
          max="400"
          name="description"
          onChange={(e) =>
            setTestimonial({ ...testimonial, description: e.target.value })
          }
          className="form-control mb-4"
          placeholder="Description"
        />
        <ImageUpload
          onDrop={onUpload}
          reject="Image/Video file less than 5mb"
          uploadImg="Upload Image/Videos"
          description="Drag'n'drop files here to upload. We can accept only img or video files that are less than 5mb in size."
        />
        <input
          type={"text"}
          max="200"
          name="url"
          onChange={(e) =>
            setTestimonial({ ...testimonial, url: e.target.value })
          }
          defaultValue={testimonial.url}
          value={testimonial.url}
          className="form-control mb-4"
          placeholder="URL"
          disabled={true}
        />

        <Button variant="outline" onClick={() => publishTestimonial()}>
          Add Testimonial
        </Button>
      </div>
    </Layout>
  );
}
