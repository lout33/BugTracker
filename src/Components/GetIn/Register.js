import React, { useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { navigate } from "@reach/router";
import { useForm } from "react-hook-form";
import "../styles.css";
import { backend_route } from "../../GlobalVariables";

export default function Register({ isLogginActive, setIsLogginActive }) {
  const { activateAuth } = useContext(Context);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    axios.post(`${backend_route}/api/auth/register`, data).then(res => {
      activateAuth(res.data);
      navigate(`/`);
    });
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div className="text-center">
          <h2> Bug-Tracker </h2>
        </div>
        <form
          className=" border border-light p-5 bg-light"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="h4 mb-4">Sign In</p>

          <div className="mb-4">
            <input
              type="text"
              // value={registro.name}
              // onChange={handleInputChangeRegistro}
              name="name"
              className="form-control"
              placeholder="Name"
              ref={register({
                required: true,
                minLength: 6
              })}
            />
            {errors.name && errors.name.type === "required" && (
              <p className="errorValidation text-alert ">
                Your input is required
              </p>
            )}

            {errors.name && errors.name.type === "minLength" && (
              <p className="errorValidation text-alert ">Min 6 letter</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              // value={registro.email}
              // onChange={handleInputChangeRegistro}
              name="email"
              className="form-control "
              placeholder="E-mail"
              ref={register({
                required: true,
                minLength: 6,
                pattern: /^[a-zA-Z]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p className="errorValidation text-alert ">
                Your input is required
              </p>
            )}
            {errors.email && errors.email.type === "minLength" && (
              <p className="errorValidation text-alert ">Min 6 letters</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="errorValidation text-alert">
                Print a correct email
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              // value={registro.password}
              // onChange={handleInputChangeRegistro}
              name="password"
              className="form-control "
              placeholder="Password"
              ref={register({
                required: true,
                minLength: 6
              })}
            />

            {errors.password && errors.password.type === "required" && (
              <p className="errorValidation text-alert ">
                Your input is required
              </p>
            )}

            {errors.password && errors.password.type === "minLength" && (
              <p className="errorValidation text-alert ">Min 6 letters</p>
            )}

            {errors.password && errors.password.type === "pattern" && (
              <p className="errorValidation text-alert">
                Print a correct email
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-info btn-block mb-4 ">
            Sign In
          </button>

          <p className="font-italic text-dark d-flex justify-content-end">
            Have an account?
            <a
              onClick={() => {
                setIsLogginActive("login");
              }}
              className=" border-bottom text-info font-weight-bold  "
            >
              Login...
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
