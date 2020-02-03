import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../Context";
import { navigate } from "@reach/router";

import axios from "axios";

import { backend_route } from "./../GlobalVariables";
import { SuccesCenterTimer, ErrorCenterTimer } from "./../animations/Alerts";

import { useTranslation } from "react-i18next";
export default props => {
  // props.ticketId
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .post(
        `${backend_route}/api/global/ticket/getTicketById`,
        { ticketId: props.ticketId },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(function(res) {
        // me llega los detalles de ONE Proyecto
        setTicketToEdit({ ...res.data, ticketId: props.ticketId });
        console.log(ticketToEdit);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  // const initialFormState = {
  //   name: "",
  //   // submitter: "", //toma al admin no al submiter por ahora
  //   description: "",
  //   status: "",
  //   type: "",
  //   priority: "",
  //   imageDescription: "",
  //   file: {}
  // };
  const [ticketToEdit, setTicketToEdit] = useState({});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTicketToEdit({ ...ticketToEdit, [name]: value }); //anade el name y surname mas al adduser
    console.log(ticketToEdit);
  };

  const onUpdateTicket = () => {
    console.log("update");

    axios
      .post(
        `${backend_route}/api/global/ticket/updateTicketById`,
        {
          ...ticketToEdit
        },
        {
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        setTicketToEdit(res.data);
        SuccesCenterTimer.fire();
      })
      .catch(err => {
        ErrorCenterTimer.fire();
        console.log(err);
      });
  };

  const onNavigateToTickets = () => {
    navigate("/myTickets");
  };

  return (
    <div className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {/* LAYOUT */}
            {/* YOUR CONTENT  */}
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-info">
                  <h4 class="card-title ">{t("Edit Ticket")} </h4>
                  <button
                    onClick={onNavigateToTickets}
                    class="btn btn-link  btn-sm   text-white"
                  >
                    <i class="material-icons">arrow_back</i>

                    {t("Back to list")}
                  </button>
                  {/* <p class="card-category">Change Ticket Properties</p> */}
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-sm">
                      <tbody id="tbody">
                        <tr>
                          <td>
                            <h4>{t("Ticket Title")}</h4>
                            <input
                              type="text"
                              value={ticketToEdit.name}
                              name="name"
                              onChange={handleInputChange}
                              className="form-control mb-4"
                              placeholder="Name"
                            />
                          </td>
                          <td>
                            <h4>{t("Ticket Description")}</h4>

                            <input
                              type="text"
                              name="description"
                              value={ticketToEdit.description}
                              onChange={handleInputChange}
                              className="form-control mb-4"
                              placeholder="Description"
                            />
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <h4>{t("Project")}</h4>
                            <p>{ticketToEdit.byProjectName}</p>
                          </td>
                          <td>
                            <h4> {t("Assigned Developer")}</h4>

                            <p>
                              {ticketToEdit.assignedDeveloper &&
                                ticketToEdit.assignedDeveloper.devName}
                            </p>
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <h4>{t("Ticket Priority")}</h4>

                            <select
                              value={ticketToEdit.priority}
                              name="priority"
                              onChange={handleInputChange}
                              className="w-100 custom-select"
                            >
                              <option value="low">{t("low")}</option>
                              <option value="medium">{t("medium")}</option>
                              <option value="high">{t("high")}</option>
                              <option value="urgent">{t("urgent")}</option>
                            </select>
                          </td>
                          <td>
                            <h4>{t("Ticket Status")}</h4>
                            <select
                              value={ticketToEdit.status}
                              name="status"
                              onChange={handleInputChange}
                              className="w-100 custom-select"
                            >
                              <option value="informado">
                                {t("Informado")}
                              </option>
                              <option value="inprogress">
                                {t("In Progress")}
                              </option>
                              <option value="closed">{t("Closed")}</option>
                            </select>
                          </td>
                        </tr>
                        <br />
                        <tr>
                          <td>
                            <h4>{t("Ticket Type")}</h4>
                            <select
                              value={ticketToEdit.type}
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
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <button
                          type="button"
                          onClick={onUpdateTicket}
                          class="btn btn-warning"
                        >
                          {t("Update Ticket")}
                        </button>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default TicketEdit;
