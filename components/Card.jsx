import { Button } from "@mantine/core";
import { IconEdit, IconExternalLink } from "@tabler/icons-react";
import axios from "axios";
import React from "react";
import { ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";

const Card = ({
  id,
  title,
  description,
  name,
  link,
  showEdit = true,
  deleteById,
}) => {
  return (
    <div
      className="testimonial card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="d-flex">
          {name && <span className="pr-1">By: </span>}
          <p className="card-name">{name}</p>
        </div>
      </div>
      <ButtonGroup
        style={{
          gap: "10px",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-button"
        >
          <IconExternalLink />
        </a>
        {showEdit && (
          <Button
            variant="filled"
            onClick={() => window.open(`/dashboard/testimonials/${id}`)}
          >
            Edit
          </Button>
        )}
        <Button variant="outline" onClick={() => deleteById(id)}>
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Card;
