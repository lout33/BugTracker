import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../Context";
import { navigate } from "@reach/router";

import axios from "axios";
import { backend_route } from "./../GlobalVariables";
import { Comments } from "../Components/TIcketDetail/Comments";
import { Historial } from "../Components/TIcketDetail/Historial";
import { Attachments } from "../Components/TIcketDetail/Attachments";
import { useTranslation } from "react-i18next";

export default props => {
  const { t } = useTranslation();

  const [ticketDetail, setTicketDetail] = useState({});
  const [imagesDetail, setImagesDetail] = useState([]);
  const [commentsDetail, setCommentsDetail] = useState([]);
  const [historiesDetail, setHistoriesDetail] = useState([]);

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
        console.log(res.data);
        setTicketDetail(res.data);
        setImagesDetail(res.data.image);
        setCommentsDetail(res.data.comments);

        //////////////////////////////
        setHistoriesDetail(res.data.historial);
        console.log(res.data.historial);

        //////////////////////////////
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const handleInputChangeLogin = event => {
    //anade el name y surname mas al adduser
  };

  const onNavigateToTickets = () => {
    navigate("/myTickets");
  };

  return (
    <div>
      <div className="content">
        <div className="container-fluid">
          <div className="row d-flex flex-row justify-content-center">
            <div className="col-md-6 ">
              <div className="card">
                <div className="card-header card-header-info">
                  <h4 className="card-title ">
                    {t("Details for this ticket")}
                  </h4>
                  {/* <p className="card-category">All about your ticket</p> */}
                  <button
                    onClick={onNavigateToTickets}
                    class="btn btn-link  btn-sm   text-white"
                  >
                    <i class="material-icons">arrow_back</i>

                    {t("Back to list")}
                  </button>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <tbody id="tbody">
                        <tr>
                          <td>
                            <h6> {t("Ticket Title")}</h6>
                            <p>{ticketDetail.name}</p>
                          </td>
                          <td>
                            <h6>{t("Ticket Description")} </h6>
                            <p>{ticketDetail.description}</p>
                            {/* anadir la description en el bakencd */}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>{t("Assigned Developer")} </h6>
                            <p>
                              {ticketDetail.assignedDeveloper &&
                                ticketDetail.assignedDeveloper.devName}
                            </p>
                          </td>
                          <td>
                            <h6>{t("Submiter")} </h6>
                            {ticketDetail.submitter && (
                              <p>{ticketDetail.submitter.name}</p>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>{t("Project")} </h6>
                            <p>{ticketDetail.byProjectName}</p>
                            {/* A que project pertenece ,lo anado enel back */}
                          </td>
                          <td>
                            <h6>{t("Ticket Priority")} </h6>
                            <p>{ticketDetail.priority}</p>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <h6>{t("Ticket Status")} </h6>
                            <p>{ticketDetail.status}</p>
                          </td>
                          <td>
                            <h6>{t("Ticket Type")} </h6>
                            <p>{ticketDetail.type}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h6>{t("Created")} </h6>
                            <p>{ticketDetail.createdAt}</p>
                          </td>
                          <td>
                            <h6>{t("Updated")} </h6>
                            <p>{ticketDetail.updatedAt}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <Historial
                historiesDetail={historiesDetail}
                setHistoriesDetail={setHistoriesDetail}
              ></Historial>
            </div>
            <div className="col-md-6">
              <Comments
                props={props}
                commentsDetail={commentsDetail}
                setCommentsDetail={setCommentsDetail}
              ></Comments>
            </div>

            <hr />
            <div className="col-md-6">
              <Attachments
                props={props}
                imagesDetail={imagesDetail}
                setImagesDetail={setImagesDetail}
              ></Attachments>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default TicketDetail;
