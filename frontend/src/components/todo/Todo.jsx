import React, { useEffect, useState } from "react";
import "./Todo.css";
import Todocard from "./Todocard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import { useSelector } from "react-redux";

let toupdateArray=[];
let id = sessionStorage.getItem("id");

const Todo = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const [array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      console.log(id);
    }
  }, [isLoggedIn, id]);

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    if (inputs.title === "" || inputs.description === "") {
      toast.error("Task and description can not be empty!");
    } else {
      if (id) {
        await axios
          .post("http://localhost:3000/api/v2/addTask", {
            title: inputs.title,
            description: inputs.description,
            id: id,
          })
          .then((res) => {
            console.log(res);
          });
        setInputs({ title: "", description: "" });
        toast.success("Task Added Successfully");
      } else {
        setArray([...array, inputs]);
        setInputs({ title: "", description: "" });
        toast.success("Task Added Successfully");
        toast.error("Task Added, not saved! please signup");
      }
    }
  };

  const del = async (ele) => {
    if (ele) {
      await axios
        .delete(`http://localhost:3000/api/v2/deleteTask/${ele}`, {
          data: { id: id },
        })
        .then(() => {
          toast.success("Task Deleted Successfully");
        });
    } else {
      toast.error("Please Signup");
    }
  };

  const dis = (value) => {
    //console.log(value);
    document.getElementById("todo-update").style.display = value;
  };

  const update=(value)=>{
    toupdateArray=array[value];
    // console.log(toupdateArray);
  }

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        await axios
          .get(`http://localhost:3000/api/v2/getTask/${id}`)
          .then((res) => {
            setArray(res.data.list);
          });
      };
      fetch();
    }else{
      toast.error("Please Signup");
    }
  }, [submit]);

  return (
    <div>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-column todo-input-div w-50">
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              onChange={change}
              value={inputs.title}
            />
            <textarea
              name="description"
              id="textarea"
              type="text"
              placeholder="Description"
              className="p-2 todo-inputs"
              onChange={change}
              value={inputs.description}
            />
          </div>
          <button className="btn" onClick={submit}>
            Add
          </button>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row">
              {array &&
                array.map((item, index) => (
                  <>
                    <div className="col-lg-3 col-8 mx-5 my-2" key={index}>
                      <Todocard
                        title={item.title}
                        description={item.description}
                        id={item._id}
                        delid={del}
                        display={dis}
                        updateId={index}
                        tobeUpdate={update}
                      />
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <div className="container update">
          <Update display={dis} update={toupdateArray}/>
        </div>
      </div>
    </div>
  );
};

export default Todo;
