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

  const updatedData = [
    {
      name: "Athena Weissnat",
      company: "Little - Rippin",
      email: "Elouise.Prohaska@yahoo.com",
    },
    {
      name: "Deangelo Runolfsson",
      company: "Greenfelder - Krajcik",
      email: "Kadin_Trantow87@yahoo.com",
    },
    {
      name: "Danny Carter",
      company: "Kohler and Sons",
      email: "Marina3@hotmail.com",
    },
    {
      name: "Trace Tremblay PhD",
      company: "Crona, Aufderhar and Senger",
      email: "Antonina.Pouros@yahoo.com",
    },
    {
      name: "Derek Dibbert",
      company: "Gottlieb LLC",
      email: "Abagail29@hotmail.com",
    },
    {
      name: "Viola Bernhard",
      company: "Funk, Rohan and Kreiger",
      email: "Jamie23@hotmail.com",
    },
    {
      name: "Austin Jacobi",
      company: "Botsford - Corwin",
      email: "Genesis42@yahoo.com",
    },
    {
      name: "Hershel Mosciski",
      company: "Okuneva, Farrell and Kilback",
      email: "Idella.Stehr28@yahoo.com",
    },
    {
      name: "Mylene Ebert",
      company: "Kirlin and Sons",
      email: "Hildegard17@hotmail.com",
    },
    {
      name: "Lou Trantow",
      company: "Parisian - Lemke",
      email: "Hillard.Barrows1@hotmail.com",
    },
    {
      name: "Dariana Weimann",
      company: "Schowalter - Donnelly",
      email: "Colleen80@gmail.com",
    },
    {
      name: "Dr. Christy Herman",
      company: "VonRueden - Labadie",
      email: "Lilyan98@gmail.com",
    },
    {
      name: "Katelin Schuster",
      company: "Jacobson - Smitham",
      email: "Erich_Brekke76@gmail.com",
    },
    {
      name: "Melyna Macejkovic",
      company: "Schuster LLC",
      email: "Kylee4@yahoo.com",
    },
    {
      name: "Pinkie Rice",
      company: "Wolf, Trantow and Zulauf",
      email: "Fiona.Kutch@hotmail.com",
    },
    {
      name: "Brain Kreiger",
      company: "Lueilwitz Group",
      email: "Rico98@hotmail.com",
    },
  ];

  //   console.log(updatedData);
  //   console.log(contacts);

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
            {/* {contacts &&
              contacts.map((item) => {
                return (
                    {item}
                );
              })} */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
