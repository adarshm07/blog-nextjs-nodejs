import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ImageUpload } from "@/components/ImageUpload";

export default function EditTestimonial() {
  const router = useRouter();
  const { edittestimonial } = router.query;

  const [testimonial, setTestimonial] = useState({
    name: "",
    title: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonial/get/${edittestimonial}`,
        testimonial
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTestimonial({
            name: res.data.data?.name,
            title: res.data.data?.title,
            description: res.data.data?.description,
            url: res.data.data?.url,
          });
        }
      });
  }, [edittestimonial]);

  const updateTestimonial = async () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/testimonial/update/${edittestimonial}`,
        testimonial
      )
      .then((res) => {
        console.log(res.data.statusCode);
        if (res.data.statusCode === 201) toast("Testimonial updated.");
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
        <h4>Edit Testimonial</h4>
        <hr />
        <br />
        <input
          type={"text"}
          max="200"
          name="name"
          defaultValue={testimonial.name}
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
          defaultValue={testimonial.title}
          className="form-control mb-4"
          placeholder="Title"
        />
        <textarea
          max="400"
          name="description"
          onChange={(e) =>
            setTestimonial({ ...testimonial, description: e.target.value })
          }
          defaultValue={testimonial.description}
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
          className="form-control mb-4"
          placeholder="URL"
          disabled={true}
        />

        <Button variant="outline" onClick={updateTestimonial}>
          Update Testimonial
        </Button>
      </div>
    </Layout>
  );
}
