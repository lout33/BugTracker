import React, { useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { backend_route } from "../../GlobalVariables";
import { Toast } from "../../animations/Toast";

import { useForm } from "react-hook-form";
import "../styles.css";
import "./../../index.css";

export default function Login({ setIsLogginActive }) {
  const { setIsAuth, activateAuth } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        // encuntra un error automaticamente y lo envia al catch
        const res = await axios.get(
          `${backend_route}/api/global/account/myAccount`,
          {
            params: {},
            headers: { "auth-token": window.sessionStorage.getItem("token") }
          }
        );
        console.log("me llega mi account");
        if (!res) return;
        setIsAuth(true);
      } catch (error) {
        console.log("token invalido");
        console.log(error.response.data);
      }
    })();
  }, []);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async data => {
    axios
      .post(`${backend_route}/api/auth/login`, data)
      .then(res => {
        console.log("token recibido");
        activateAuth(res.data);
      })
      .catch(err => {
        console.log("token invalido");
        console.log(err.request.response);
        Toast.fire({
          icon: "error",
          title: "Try again"
        });
      });
  };

  return (
    <div className=" d-flex justify-content-center  align-items-center ">
      <div className="col-md-4">
        <div className="text-center">
          <h2> Bug-Tracker </h2>
        </div>
        <form
          className=" border border-light p-5 bg-light"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="h4 mb-1 text-center">Login</p>
          <div className="mb-4">
            <input
              type="text"
              // value={entrar.email}
              // onChange={handleInputChangeLogin}
              name="email"
              className="form-control mb-1"
              placeholder="example33@gmail.com"
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
              <p className="errorValidation text-alert ">Min 6 letter</p>
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
              // value={entrar.password}
              // onChange={handleInputChangeLogin}
              name="password"
              className="form-control mb-1"
              placeholder="Password"
              ref={register({ required: true, minLength: 6 })}
            />

            {errors.password && errors.password.type === "required" && (
              <p className="errorValidation text-alert ">
                Your input is required
              </p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorValidation text-alert ">Min 6 letter</p>
            )}
          </div>

          <button type="submit" className="btn btn-info btn-block my-4">
            Login
          </button>

          <p className="font-italic text-dark d-flex justify-content-end">
            Create an account?...
            <a
              className=" border-bottom text-info font-weight-bold "
              onClick={() => {
                setIsLogginActive("register");
              }}
            >
              Register...
            </a>
          </p>
          <p className="font-italic text-dark d-flex justify-content-end">
            Sign In As ?...
            <a
              className=" border-bottom text-info font-weight-bold  "
              onClick={() => {
                setIsLogginActive("demouser");
              }}
            >
              Demo User
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
