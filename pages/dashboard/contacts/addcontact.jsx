import { ImageUpload } from "@/components/ImageUpload";
import Layout from "@/components/Layout";
import TextEditor from "@/components/TextEditor";
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddContact() {
  // const post = useSelector((state) => state.post);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    objection: "",
  });

  const publishContact = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/add`, contact)
      .then((res) => {
        if (res.data.statusCode === 201) toast.success("Contact Updated.");
      });
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
        <h4>Add Contact</h4>
        <hr />
        <br />
        <input
          type="text"
          name="name"
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          className="form-control mb-4"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="form-control mb-4"
          placeholder="Email"
        />
        <input
          type="text"
          name="number"
          onChange={(e) => setContact({ ...contact, number: e.target.value })}
          className="form-control mb-4"
          placeholder="Number"
        />
        <input
          type="text"
          name="subject"
          onChange={(e) => setContact({ ...contact, subject: e.target.value })}
          className="form-control mb-4"
          placeholder="Subject"
        />

        <textarea
          max="400"
          name="objection"
          onChange={(e) =>
            setContact({ ...contact, objection: e.target.value })
          }
          className="form-control mb-4"
          placeholder="Message"
        />
        <Button variant="outline" onClick={() => publishContact()}>
          Add Contact
        </Button>
      </div>
    </Layout>
  );
}
