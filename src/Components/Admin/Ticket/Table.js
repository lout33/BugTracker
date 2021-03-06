import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";
import { Link } from "@reach/router";

import { backend_route } from "../../../GlobalVariables";
import axios from "axios";
import "./../../styles.css";
import Swal from "sweetalert2";
import { SuccesCenterTimer } from "../../../animations/Alerts";

import { useTranslation } from "react-i18next";
export function Table({ filteredArray }) {
  const { t } = useTranslation();

  ////////////////////////////////////////////////////////////////////////////////////////////
  const {
    myPersonel,
    setMyPersonel,
    setListProyects,
    listProyects,
    setListTickets
  } = useContext(Context);
  ////////////////////////////////////////////////////////////////////////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTickets = filteredArray.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // const totalPersonel = myPersonel.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredArray.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //////////////////////////////////////////////////////
  // GET LIST OF TICKETS
  useEffect(() => {
    axios
      .get(`${backend_route}/api/admin/ticket/getListOfTickets`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        if (res.request.status === 200) {
          try {
            console.log(res.data);
            setListTickets(res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error pe chino");
        }
      });
  }, []);
  //////////////////////////////////////////////////////

  const onDeleteTicketById = ticketId => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        axios
          .post(
            `${backend_route}/api/global/ticket/deleteTicketById`,
            { ticketId: ticketId },
            {
              headers: { "auth-token": window.sessionStorage.getItem("token") }
            }
          )
          .then(res => {
            if (res.request.status === 200) {
              console.log("ticket eliminado correctamente");
              // me trae la lista de de tickets
              setListTickets(res.data);
              SuccesCenterTimer.fire();
            } else {
              console.log("error pe chino");
            }
          });
      }
    });
  };
  /////////////////////////////////////////////////////////////////////

  return (
    <div className="table-responsive">
      <table className="table ">
        <thead className=" ">
          <tr>
            <th className="font-weight-bold"> {t("title")}</th>
            <th className="font-weight-bold">{t("projectName")}</th>
            <th className="font-weight-bold">{t("assignedDeveloper")}</th>
            <th className="font-weight-bold">{t("priority")}</th>
            <th className="font-weight-bold">{t("status")}</th>
            <th className="font-weight-bold">{t("type")}</th>
            <th className="font-weight-bold">{t("createdAt")}</th>
            <th className="font-weight-bold">{t("details")}</th>
          </tr>
        </thead>
        <tbody>
          {currentTickets.map((ticket, index) => {
            return (
              <tr key={index}>
                <td>{ticket.name}</td>
                <td>{ticket.byProjectName}</td>

                <td>
                  {ticket.assignedDeveloper && ticket.assignedDeveloper.devName}
                </td>
                <td> {ticket.priority}</td>
                <td> {ticket.status}</td>
                <td> {ticket.type}</td>
                <td> {ticket.createdAt}</td>

                <td className="text-secondary">
                  <Link to={`./details/${ticket._id}`}>{t("details")}</Link>
                  <br />
                  <Link to={`./edit/${ticket._id}`}>{t("edit")}</Link>
                  <br />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      onDeleteTicketById(ticket._id);
                    }}
                  >
                    {t("Delete")}
                    <i className="material-icons ml-1">delete_forever</i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <nav>
                <ul className="pagination">
                  {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                      <a onClick={() => paginate(number)} className="page-link">
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
