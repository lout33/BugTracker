import React, { useContext } from "react";
import { Context } from "./../Context";
import "./styles.css";
export default function Navbar({ isLoading }) {
  const { typeUser, removeAuth } = useContext(Context);

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
      <nav className="navbar navbar-expand-lg  bg-secondary  navbar-absolute fixed-top navbartracker mb-3">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div>
              <h5 className="text-secondary">
                Logged in as:
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
              <button
                type="submit"
                onClick={removeAuth}
                className=" btn btn-danger w-100"
                id="removeAuth"
              >
                Log out
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
