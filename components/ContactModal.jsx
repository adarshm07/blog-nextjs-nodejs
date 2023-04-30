import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import { toast } from "react-toastify";
import axios from "axios";

export default function ContactModal({ children, id, setUpdate }) {
  const [opened, { open, close }] = useDisclosure(false);

  const deleteContactById = async (e) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact/delete/${id}`)
      .then((res) => {
        if (res.data.statusCode === 201) toast.success("Contact deleted.");
        setUpdate(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error");
      });
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Contact Details" centered>
        {children}
      </Modal>

      <Group position="center">
        <button className="btn btn-sm btn-primary" onClick={open}>
          View
        </button>
        <button
          onClick={() => deleteContactById(id)}
          className="btn btn-sm btn-secondary"
        >
          Delete
        </button>
      </Group>
    </>
  );
}
