import React, { useContext } from "react";
import { Context } from "./../Context";
import "./styles.css";
import { useTranslation } from "react-i18next";

export default ({ isLoading }) => {
  const { typeUser, removeAuth } = useContext(Context);
  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  try {
    var btnRemoveAuth = document.getElementById("removeAuth");
    btnRemoveAuth.addEventListener("click", () => {
      removeAuth();
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <nav
        style={{ zIndex: 10 }}
        className="navbar navbar-expand-lg bg-light   navbar-absolute fixed-top navbartracker mb-2 "
      >
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="d-flex justify-content-center align-items-center">
              <h5 className="text-secondary m-0">
                {t("Logged in as")} :
                <span className="text-dark text-capitalize font-weight-normal">
                  {typeUser}
                </span>
              </h5>
            </div>
          </div>

          <div className="navbar-form"></div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <div class="btn-group" role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  class="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={require("./../images/idioms.png")}
                    width="20px"
                    alt=""
                    className="pr-1"
                  />
                  Lenguages
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <button
                    class="dropdown-item bg-light"
                    onClick={() => changeLanguage("en")}
                  >
                    <span className="text-dark">English</span>
                  </button>
                  <button
                    class="dropdown-item bg-light"
                    onClick={() => changeLanguage("es")}
                  >
                    <span className="text-dark">Español</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                onClick={removeAuth}
                className=" btn btn-danger w-100"
                id="removeAuth"
              >
                {t("Log out")}
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
