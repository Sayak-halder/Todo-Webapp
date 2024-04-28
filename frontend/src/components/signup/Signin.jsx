import React, { useState } from "react";
import "./Signup.css";
import HeadingComp from "./HeadingComp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
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
      .post("http://localhost:3000/api/v1/signin", inputs)
      .then((res) => {
        sessionStorage.setItem("id", res.data.others._id);
        dispatch(authActions.login());
        history("/todo");
      });
  };

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-flex justify-content-center align-items-center col-right column">
            <HeadingComp first="Sign" second="In" />
          </div>
          <div className="col-lg-8 d-flex justify-content-center align-items-center column">
            <div className="d-flex flex-column w-100 p-5">
              <input
                className="p-1 my-3 input-signup"
                name="email"
                type="email"
                placeholder="Enter your email !"
                value={inputs.email}
                onChange={change}
              />
              <input
                className="p-1 my-3 input-signup"
                name="password"
                type="password"
                placeholder="Enter your password !"
                value={inputs.password}
                onChange={change}
              />
              <button className="btn-signup" onClick={submit}>
                SignIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
