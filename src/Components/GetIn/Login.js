import React, { useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { backend_route } from "../../GlobalVariables";
import { LoginAlertError } from "../../animations/Alerts";

import { useForm } from "react-hook-form";
import "../styles.css";
import "./../../index.css";
import { useTranslation } from "react-i18next";
export default function Login({ setIsLogginActive }) {
  const { setIsAuth, activateAuth } = useContext(Context);
  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

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

  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = async (data, e) => {
    console.log(data);
    axios
      .post(`${backend_route}/api/auth/login`, data)
      .then(res => {
        console.log("token recibido");
        activateAuth(res.data);
      })
      .catch(err => {
        LoginAlertError.fire();
        e.target.reset();
        console.log(err);
        console.log("mierda");
      });
  };

  return (
    <div className="col-md-6 d-flex flex-column justify-content-center  align-items-center">
      <div className="text-center">
        <h2 className="font-italic ">
          Bug-Tracker
          <img
            className="ml-2"
            src={require("./../../images/bug3.png")}
            width={"60px"}
            height={"60px"}
            overflow={"hidden"}
            alt=""
          />
        </h2>
      </div>
      <form
        className=" border border-light p-5 bg-light  rounded "
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="h4 mb-1 text-center">{t("Login")}</p>
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
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
            <p className="errorValidation text-alert">Print a correct email</p>
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
          {t("Login")}
        </button>

        <p className="font-italic text-dark d-flex justify-content-end">
          ¿{t("Create an account")}?_
          <a
            className=" border-bottom text-info font-weight-bold "
            onClick={() => {
              setIsLogginActive("register");
            }}
          >
            {t("Register")}
          </a>
        </p>
        <p className="font-italic text-dark d-flex justify-content-end">
          {t("Sign In As")}_
          <a
            className=" border-bottom text-info font-weight-bold  "
            onClick={() => {
              setIsLogginActive("demouser");
            }}
          >
            {t("Demo User")}
          </a>
        </p>
      </form>
      <div className="btn-group" role="group">
        <button
          id="btnGroupDrop1"
          type="button"
          class="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            className="pr-3"
            src={require("./../../images/idioms.png")}
            width="30px"
            alt=""
          />
          Lenguage
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <button
            class="dropdown-item bg-light"
            onClick={() => changeLanguage("en")}
          >
            <span className="text-dark">English</span>
          </button>
          <button
            class="dropdown-item bg-light "
            onClick={() => changeLanguage("es")}
          >
            <span className="text-dark">Español</span>
          </button>
        </div>
      </div>
    </div>
  );
}
