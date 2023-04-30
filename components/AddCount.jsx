import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { toast } from "react-toastify";
import axios from "axios";
import { headers } from "@/next.config";

export default function AddCount({
  activeProject,
  completedProject,
  countries,
  industriesSaved,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [count, setCount] = useState({
    activeProject: null,
    completedProject: null,
    countries: null,
    industriesSaved: null,
  });

  useEffect(() => {
    setCount({
      activeProject: Number(activeProject),
      completedProject: Number(completedProject),
      countries: Number(countries),
      industriesSaved: Number(industriesSaved),
    });
  }, [activeProject, completedProject, countries, industriesSaved]);

  const handleUpdate = async () => {
    let data = JSON.stringify({
      activeProject: Number(count.activeProject),
      completedProject: Number(count.completedProject),
      countries: Number(count.countries),
      industriesSaved: Number(count.industriesSaved),
    });

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/count/add`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Count updated successfully");
        close();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Update Count" centered>
        <div className="border border-1"></div>
        <div className="d-flex" style={{ gap: "10px" }}>
          <div>
            <label className="label-contact mt-4">Active Project</label>
            <input
              className="form-control"
              type="number"
              placeholder="Active Project"
              defaultValue={activeProject}
              onChange={(e) =>
                setCount({ ...count, activeProject: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label-contact mt-4">Completed Project</label>
            <input
              className="form-control"
              type="number"
              placeholder="Completed Project"
              defaultValue={completedProject}
              onChange={(e) =>
                setCount({ ...count, completedProject: e.target.value })
              }
            />
          </div>
        </div>

        <div className="d-flex" style={{ gap: "10px" }}>
          <div>
            <label className="label-contact mt-4">Countries</label>
            <input
              className="form-control"
              type="number"
              placeholder="Countries"
              defaultValue={countries}
              onChange={(e) =>
                setCount({ ...count, countries: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label-contact mt-4">Industries Saved</label>
            <input
              className="form-control"
              type="number"
              placeholder="Industries Saved"
              defaultValue={industriesSaved}
              onChange={(e) =>
                setCount({ ...count, industriesSaved: e.target.value })
              }
            />
          </div>
        </div>
        <button
          className="btn btn-sm btn-primary rounded my-4"
          onClick={handleUpdate}
        >
          Update Count
        </button>
      </Modal>
      <button
        className="btn btn-sm btn-outlined-secondary border rounded my-2"
        onClick={open}
      >
        Update Count
      </button>
    </div>
  );
}
