import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { backend_route } from "../../../GlobalVariables";
import { Toast } from "../../../animations/Alerts";
import { useTranslation } from "react-i18next";

import { Context } from "../../../Context";

export function Modal() {
  const { setMyPersonel } = useContext(Context);
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const initialFormStateTwo = {
    name: "",
    email: "",
    password: ""
  };
  const [registro, setRegistro] = useState(initialFormStateTwo);

  const onSubmit = (data, e) => {
    e.target.reset();

    axios
      .post(`${backend_route}/api/admin/ticket/addPersonel`, data, {
        params: {},
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        // me devuelve mi lista de personles
        console.log(res.data);

        setMyPersonel(res.data);
        Toast.fire({
          icon: "success",
          title: "Create user with success"
        });
      })
      .catch(err => {
        console.log(err.response.data);

        Toast.fire({
          icon: "error",
          title: "Error! to create user"
        });
      });
    console.log(registro);

    setRegistro(initialFormStateTwo);
  };

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {t("Add Personnel")}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body  ">
              <form
                className=" border border-light p-5  "
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className=" mb-4">
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

                <div className=" mb-4">
                  <input
                    type="text"
                    // value={registro.email}
                    // onChange={handleInputChangeRegistro}
                    name="email"
                    className="form-control"
                    placeholder="E-mail"
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
                    <p className="errorValidation text-alert">
                      Print a correct email
                    </p>
                  )}
                </div>

                <div className=" mb-4">
                  <input
                    type="password"
                    // value={registro.password}
                    // onChange={handleInputChangeRegistro}
                    name="password"
                    className="form-control"
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
                    <p className="errorValidation text-alert ">Min 6 letter</p>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <p className="errorValidation text-alert">
                      Print a correct email
                    </p>
                  )}
                </div>

                <button
                  // onSubmit={onSubmitRegistro}
                  // onClick={onSubmitRegistro}

                  type="submit"
                  className="btn btn-warning"
                >
                  {t("Add Personnel")}
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                {t("Close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
