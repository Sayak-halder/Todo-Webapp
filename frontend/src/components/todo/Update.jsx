import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Update = ({ display, update }) => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setInputs({
      title: update.title,
      description: update.description,
    });
  }, [update]);

  const change = (e) => {
    const title = e.target.name;
    const description = e.target.value;
    setInputs({ ...inputs, [title]: description });
  };

  const submit = async () => {
    await axios
      .put(`http://localhost:3000/api/v2/updateTask/${update._id}`,inputs)
      .then((res) => {
        toast.success("Task updated successfully");
      });
    // console.log(inputs);
    display("none");
  };

  useEffect(()=>{

  },[submit]);

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update your task.</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={inputs.title}
        name="title"
        onChange={change}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={inputs.description}
        name="description"
        onChange={change}
      />
      <div>
        <button className="btn my-4" onClick={submit}>
          Update
        </button>
        <button
          className="btn my-4 mx-4 btn-bl"
          onClick={() => {
            display("none");
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
