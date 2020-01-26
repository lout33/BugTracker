import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { backend_route } from "../../GlobalVariables";

export function NewTicketModal() {
  const {
    listProyects,
    setListProyects,
    listTickets,
    setListTickets,
    user
  } = useContext(Context);

  const initialFormState = {
    name: "",
    description: "",
    projectId: undefined,
    // status: "",
    type: "bug",
    priority: "low",
    imageDescription: ""
    // file: {}
  };
  const [input, setInput] = useState(initialFormState);
  const [loading, setloading] = useState(true);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value }); //anade el name y surname mas al adduser
    // console.log(input);
  };

  useEffect(() => {
    axios
      .get(`${backend_route}/api/submitter/project/getAssignedProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        if (res.request.status === 200) {
          try {
            setListProyects(res.data);
            setloading(false);
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error pe chino");
        }
      });
  }, []);

  const handleCreateTicket = e => {
    e.preventDefault();
    setInput(initialFormState);

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
        if (res.request.status === 200) {
          console.log(res.data);

          console.log("ticket creado correctamente");
          setListTickets(res.data);
        } else {
          console.log("error pe chino");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        New Ticket
      </button>

      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">
                NEW TICKET
              </h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div>
                <h4>Select project to attach </h4>
                <select
                  value={input.projectId}
                  name="projectId"
                  onChange={handleInputChange}
                  className="w-100 list-group"
                  size="2"
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
                <h4> Create your new ticket </h4>

                <input
                  type="text"
                  // value={registro.name}
                  name="name"
                  onChange={handleInputChange}
                  className="form-control mb-4"
                  placeholder="Name"
                />

                <input
                  type="text"
                  // value={registro.email}
                  name="description"
                  onChange={handleInputChange}
                  className="form-control mb-4"
                  placeholder="Description"
                />
                <div>
                  <h4>Priority </h4>
                  <select
                    value={input.priority}
                    name="priority"
                    onChange={handleInputChange}
                    className="w-100 custom-select"
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                    <option value="urgent">urgent</option>
                  </select>
                </div>

                <div>
                  <h4>Type </h4>
                  <select
                    value={input.type}
                    name="type"
                    onChange={handleInputChange}
                    className="w-100 custom-select"
                  >
                    <option value="bug">Bug/Error</option>
                    <option value="feature">Feature/Request</option>
                    <option value="inquiry">InquiryQuestion</option>
                  </select>
                </div>

                <button
                  // onSubmit={onSubmitRegistro}
                  type="button"
                  onClick={handleCreateTicket}
                  class="btn btn-warning"
                  data-dismiss="modal"
                >
                  Create ticket and Close
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
