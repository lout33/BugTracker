import React, { useContext, Fragment, useState } from "react";
import { Context } from "./../Context";
import { Link } from "@reach/router";
import styled from "styled-components";
import "./styles.css";
import { useTranslation } from "react-i18next";

export default () => {
  const { user, typeUser } = useContext(Context);
  const { t, i18n } = useTranslation();

  const [selectedButton, setSelectedButton] = useState(
    window.sessionStorage.getItem("active") || "dashboard"
  );

  const handleActive = val => {
    if (val == "dashboard") {
      window.sessionStorage.setItem("active", "dashboard");
      setSelectedButton("dashboard");
    } else if (val == "manageRole") {
      window.sessionStorage.setItem("active", "manageRole");
      setSelectedButton("manageRole");
    } else if (val == "manageProject") {
      window.sessionStorage.setItem("active", "manageProject");
      setSelectedButton("manageProject");
    } else if (val == "myProjects") {
      window.sessionStorage.setItem("active", "myProjects");
      setSelectedButton("myProjects");
    } else if (val == "myTickets") {
      window.sessionStorage.setItem("active", "myTickets");
      setSelectedButton("myTickets");
    }
    console.log(val);
  };

  return (
    <div className="sidebar" data-color="orange">
      <div className="d-flex flex-row logo">
        <div className="d-flex flex-row">
          <div>
            <img src={require("./../images/logo.png")} width={"80px"} alt="" />
          </div>
          <div className="overflow-hidden w-75">
            <h3>{t("Welcome")}</h3>
            <h4 className="font-weight-normal text-capitalize overflow-hidden">
              {user.name}
            </h4>
          </div>
        </div>
      </div>

      <div className="sidebar-wrapper">
        <ul className="nav navbar-nav">
          <li className={selectedButton == "dashboard" ? "active" : "nav-item"}>
            <Link
              className="nav-link"
              to="/"
              onClick={() => {
                handleActive("dashboard");
              }}
            >
              <i className="material-icons">dashboard</i>
              <p>{t("Dashboard")}</p>
            </Link>
          </li>
          {typeUser === "admin" && (
            <Fragment>
              <li
                className={
                  selectedButton == "manageRole" ? "active" : "nav-item"
                }
              >
                <Link
                  className="nav-link"
                  to="/manageRole"
                  onClick={() => {
                    handleActive("manageRole");
                  }}
                >
                  <i className="material-icons">group_add</i>

                  <p>{t("Manage Role Assignment")}</p>
                </Link>
              </li>
              <li
                className={
                  selectedButton == "manageProject"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <Link
                  onClick={() => {
                    handleActive("manageProject");
                  }}
                  className="nav-link"
                  to="/manageProject"
                >
                  <i className="material-icons">"people_alt"</i>
                  <p>{t("Manage Projects Users")}</p>
                </Link>
              </li>
            </Fragment>
          )}

          <li
            className={
              selectedButton == "myProjects" ? "nav-item active" : "nav-item"
            }
          >
            <Link
              onClick={() => {
                handleActive("myProjects");
              }}
              className="nav-link"
              to="/myProjects"
            >
              <i className="material-icons">library_books</i>

              <p>{t("My projects")}</p>
            </Link>
          </li>
          <li
            className={
              selectedButton == "myTickets" ? "nav-item active" : "nav-item"
            }
          >
            <Link
              onClick={() => {
                handleActive("myTickets");
              }}
              className="nav-link"
              to="/myTickets"
            >
              <i className="material-icons">loyalty</i>
              <p>{t("My tickets")} </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

const List = styled.li``;
