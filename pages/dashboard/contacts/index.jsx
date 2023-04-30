import Layout from "@/components/Layout";
import { TableSort } from "@/components/Table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [update, setUpdate] = useState(false);

  const getContacts = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/getAll`)
      .then((res) => {
        // console.log(res.data);
        setContacts(res.data.data);
      });
  };

  useEffect(() => {
    getContacts();
  }, [update]);

  useEffect(() => {
    getContacts();
  }, []);
  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <div className="mt-2">
          <div className="page-title">
            <h4>Contacts</h4>
          </div>
        </div>
        <div className="d-flex m-2">
          <Link
            className="btn btn-outlined-secondary border rounded"
            href={"/dashboard/contacts/addcontact"}
          >
            Add Contact
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
            <TableSort data={contacts} setUpdate={setUpdate} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
