import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/v1/register", inputs)
      .then((res) => {
        if (res.data.message === "user already exists") {
          alert(res.data.message);
        } else {
          alert(res.data.message);
          setInputs({
            email: "",
            username: "",
            password: "",
          });
          history("/signin");
        }
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 d-flex justify-content-center align-items-center column">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-1 my-3 input-signup"
                name="email"
                type="email"
                placeholder="Enter your email !"
                onChange={change}
                value={inputs.email}
              />
              <input
                className="p-1 my-3 input-signup"
                name="username"
                type="username"
                placeholder="Enter your username !"
                onChange={change}
                value={inputs.username}
              />
              <input
                className="p-1 my-3 input-signup"
                name="password"
                type="password"
                placeholder="Enter your password !"
                onChange={change}
                value={inputs.password}
              />
              <button className="btn-signup" onClick={submit}>
                SignUp
              </button>
            </div>
          </div>
          <div className="col-lg-4 d-flex justify-content-center align-items-center col-left column">
            <HeadingComp first="Sign" second="Up" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
