import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../../../Context";
import axios from "axios";
import { backend_route } from "./../../../GlobalVariables";
import { Toast } from "../../../animations/Alerts";
import { useTranslation } from "react-i18next";

export function NewTicketModal() {
  const { t } = useTranslation();

  const {
    listProyects,
    listTickets,
    setListTickets,
    user,
    setListProyects
  } = useContext(Context);

  const initialFormState = {
    name: "",
    // submitter: "", //toma al admin no al submiter por ahora
    description: "",
    projectId: undefined,
    // status: "",
    type: "bug",
    priority: "low",
    imageDescription: "",
    file: {}
  };
  const [input, setInput] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value }); //anade el name y surname mas al adduser
    // console.log(input);
  };

  const handleCreateTicket = e => {
    e.preventDefault();

    axios
      .post(
        `${backend_route}/api/global/ticket/createTicket`,
        {
          ...input
        },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        console.log("ticket creado correctamente");
        // console.log(res.data);
        // me llega una lista de todos los tickets
        setListTickets(res.data);
        // setInput((initialFormState.description = ""));

        Toast.fire({
          icon: "success",
          title: "Process executed with success"
        });
      })
      .catch(err => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Process NOT executed with success"
        });
      });
  };

  useEffect(() => {
    axios
      .get(`${backend_route}/api/admin/project/myProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(function(res) {
        console.log(res.data);
        setListProyects(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  /////////////////////////////////////////////////////////////////////

  return (
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
            <h4 className="modal-title" id="exampleModalLabel">
              {t("New Ticket")}
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <h4>{t("Select project to attach")}</h4>
              <select
                value={input.projectId}
                name="projectId"
                onChange={handleInputChange}
                className="w-100  list-group"
                size="3"
              >
                {listProyects.map((project, index) => {
                  return (
                    <option
                      className={"list-group-item list-group-item-action "}
                      key={index}
                      value={project._id}
                    >
                      {project.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <form className=" border border-light p-5">
              <h4> {t("Create your new ticket")}</h4>

              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleInputChange}
                className="form-control mb-4"
                placeholder="Name"
              />

              <input
                type="text"
                value={input.description}
                name="description"
                onChange={handleInputChange}
                className="form-control mb-4"
                placeholder="Description"
              />
              <div>
                <h4> {t("Priority")}</h4>
                <select
                  value={input.priority}
                  name="priority"
                  onChange={handleInputChange}
                  className="w-100 custom-select"
                >
                  <option value="low">{t("low")}</option>
                  <option value="medium">{t("medium")}</option>
                  <option value="high">{t("high")}</option>
                  <option value="urgent">{t("urgent")}</option>
                </select>
              </div>

              <div>
                <h4> {t("Type")} </h4>
                <select
                  value={input.type}
                  name="type"
                  onChange={handleInputChange}
                  className="w-100 custom-select"
                >
                  <option value="bug">
                    {t("Bug")}/{t("Error")}
                  </option>
                  <option value="feature">
                    {t("Feature")}/{t("Request")}
                  </option>
                  <option value="inquiry">
                    {t("Inquiry")}/{t("Question")}
                  </option>
                </select>
              </div>

              <button
                // onSubmit={onSubmitRegistro}
                type="button"
                onClick={handleCreateTicket}
                className="btn btn-warning"
                data-dismiss="modal"
              >
                {t("Create ticket and Close")}
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
  );
}
