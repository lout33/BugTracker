import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";

import { Link } from "@reach/router";
import { CardTickets } from "../../Components/Admin/Ticket/CardTickets";
import { backend_route } from "../../GlobalVariables";
import { NewTicketModal } from "../../Components/Admin/Ticket/NewTicketModal";
import { Toast } from "../../animations/Alerts";

export default () => {
  const {
    listProyects,
    listTickets,
    setListTickets,
    user,
    setListProyects
  } = useContext(Context);

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend_route}/api/admin/personnel/myDevs`, {
        params: {},
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        console.log(res.data);
        setDevs(res.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  }, []);

  //asign ticket to dev

  const [pickedTicket, setPickedTicket] = useState(undefined);
  const handleOptionChangeTicket = e => {
    setPickedTicket(e.target.value);
    console.log(e.target.value);
  };

  const [pickedDeveloper, setPickedDeveloper] = useState(undefined);

  const handleOptionChangeDeveloper = e => {
    setPickedDeveloper(e.target.value);
    console.log(e.target.value);
  };

  const onAssignTicketToDev = () => {
    axios
      .post(
        `${backend_route}/api/global/ticket/assignTicketToDev`,
        {
          devId: pickedDeveloper,
          ticketId: pickedTicket
        },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(res => {
        if (res.request.status === 200) {
          console.log(res.data);
          setListTickets(res.data);
          Toast.fire({
            icon: "success",
            title: "Process executed with success"
          });
        } else {
          console.log("error");
        }
      })
      .catch(err => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Process NOT executed with success"
        });
      });
  };

  return (
    <div className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div>
            <h4> Create New Ticket </h4>
            <button
              type="button"
              className="btn btn-warning"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              New Ticket
            </button>
            <NewTicketModal></NewTicketModal>
          </div>
          <hr />
          <div>
            <h4> Assign Ticket to Developer</h4>

            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-warning"
              data-toggle="modal"
              data-target="#exampleModal2"
            >
              Assign
            </button>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal2"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="exampleModalLabel">
                      ASSIGN TICKET TO DEV
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
                      <h4>Pick your ticket</h4>

                      <select
                        value={pickedTicket}
                        onChange={handleOptionChangeTicket}
                        className="w-100  list-group"
                        size="2"
                      >
                        {listTickets.map((ticket, index) => {
                          return (
                            <option
                              className={
                                "list-group-item list-group-item-action "
                              }
                              key={index}
                              value={ticket._id}
                            >
                              {ticket.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <br />
                    <div>
                      <h4>Pick your dev</h4>

                      <select
                        value={pickedDeveloper}
                        onChange={handleOptionChangeDeveloper}
                        className="w-100  list-group"
                        size="2"
                      >
                        {devs.map((dev, index) => {
                          return (
                            <option
                              className={
                                "list-group-item list-group-item-action "
                              }
                              key={index}
                              value={dev._id}
                            >
                              {dev.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <br />
                    <button
                      // onSubmit={onSubmitRegistro}
                      type="button"
                      onClick={onAssignTicketToDev}
                      className="btn btn-warning"
                      data-dismiss="modal"
                    >
                      Assing and close
                    </button>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <CardTickets></CardTickets>
        </div>
      </div>
    </div>
  );
};
