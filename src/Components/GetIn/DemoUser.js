import React, { useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { navigate } from "@reach/router";

import { backend_route } from "../../GlobalVariables";
import { useTranslation } from "react-i18next";

async function handleDemos(email, password) {
  const res = await axios.post(`${backend_route}/api/auth/login`, {
    email: email,
    password: password
  });
  return res;
}

export default function DemoUser({ isLogginActive, setIsLogginActive }) {
  const { activateAuth } = useContext(Context);
  const { t, i18n } = useTranslation();

  const loginAs = async user => {
    try {
      if (user === "admin") {
        const res = await handleDemos("demoAdmin@gmail.com", "demoAdmin");
        activateAuth(res.data);
        navigate(`/`);
      } else if (user === "manager") {
        const res = await axios.post(`${backend_route}/api/auth/login`, {
          email: "demoManager@gmail.com",
          password: "demoManager"
        });

        activateAuth(res.data);
        navigate(`/`);
      } else if (user === "submitter") {
        const res = await axios.post(`${backend_route}/api/auth/login`, {
          email: "demoSubmitter@gmail.com",
          password: "demoSubmitter"
        });
        activateAuth(res.data);
        navigate(`/`);
      } else if (user === "developer") {
        const res = await axios.post(`${backend_route}/api/auth/login`, {
          email: "demoDeveloper@gmail.com",
          password: "demoDeveloper"
        });
        activateAuth(res.data);
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center   "
      style={{ height: "800px" }}
    >
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex ">
          <button
            className="  btn btn-warning"
            onClick={() => {
              loginAs("admin");
            }}
          >
            <figure height={"auto"} width={"180px"}>
              <img
                src={require("./../../images/admin.png")}
                width={"180px"}
                height={"180px"}
                overflow={"hidden"}
                alt=""
              />
            </figure>

            <h4>{t("Admin")}</h4>
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              loginAs("manager");
            }}
          >
            <figure height={"auto"} width={"180px"}>
              <img
                src={require("./../../images/manager.png")}
                width={"180px"}
                height={"180px"}
                overflow={"hidden"}
                alt=""
              />
            </figure>
            <h4>{t("Project Manager")}</h4>
          </button>
        </div>
        <div>
          <button
            className="btn btn-warning"
            onClick={() => {
              loginAs("developer");
            }}
          >
            <figure height={"auto"} width={"180px"}>
              <img
                src={require("./../../images/developer.png")}
                width={"180px"}
                height={"180px"}
                overflow={"hidden"}
                alt=""
              />
            </figure>
            <h4>{t("Developer")}</h4>
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              loginAs("submitter");
            }}
          >
            <figure height={"auto"} width={"180px"}>
              <img
                src={require("./../../images/submitter.png")}
                width={"180px"}
                height={"180px"}
                overflow={"hidden"}
                alt=""
              />
            </figure>

            <h4>{t("Submitter")}</h4>
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center w-100">
        <p className="font-italic text-light ">
          ¿{t("Have an account")}?_
          <a
            onClick={() => {
              setIsLogginActive("login");
            }}
            className=" border-bottom text-light  font-weight-bold"
          >
            {t("Login")}
          </a>
        </p>
      </div>
    </div>
  );
}
