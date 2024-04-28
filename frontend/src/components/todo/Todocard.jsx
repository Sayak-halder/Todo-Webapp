import React from "react";
import "./Todo.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Todocard = ({
  title,
  description,
  id,
  delid,
  display,
  updateId,
  tobeUpdate,
}) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">{description.split("", 77)}...</p>
      </div>
      <div className="d-flex justify-content-around card-icon-head">
        <div
          className="card-icons"
          onClick={() => {
            display("block");
            // console.log(updateId);
            tobeUpdate(updateId);
          }}
        >
          <FaEdit className="upd" />
          Update
        </div>
        <div
          className="d-flex text-danger justify-content-center align-items-center card-icon-head card-icons"
          onClick={() => {
            delid(id);
          }}
        >
          <MdDelete className="del" />
          Delete
        </div>
      </div>
    </div>
  );
};

export default Todocard;
