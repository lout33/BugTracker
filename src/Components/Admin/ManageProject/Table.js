import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";

import Swal from "sweetalert2";
import { backend_route } from "../../../GlobalVariables";
import axios from "axios";
import "./../../styles.css";

export function Table({ filteredArray }) {
  ////////////////////////////////////////////////////////////////////////////////////////////
  const { myPersonel, setMyPersonel } = useContext(Context);
  ////////////////////////////////////////////////////////////////////////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPersonnel = filteredArray.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  // const totalPersonel = myPersonel.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(filteredArray.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  /////////////////////////////////////////////////////////////////////
  useEffect(() => {
    axios
      .get(`${backend_route}/api/admin/personnel/myPersonel`, {
        params: {},
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(function(res) {
        setMyPersonel(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  //////////////////////////////////////////////////////
  const onDeleteAssignedProject = (projectId, personalId) => {
    // personalId
    console.log("data enviada");
    console.log(projectId);
    console.log(personalId);

    axios
      .post(
        `${backend_route}/api/admin/project/deleteAssignedProject`,
        {
          projectId: projectId,
          // projectName: pickedProject.projectName,
          personalId: personalId
        },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(function(res) {
        console.log(res.data);
        setMyPersonel(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className=" ">
          <tr>
            <th className="font-weight-bold">Username</th>
            <th className="font-weight-bold">Email</th>
            <th className="font-weight-bold">Projects Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {currentPersonnel.map((person, index) => {
            return (
              <tr key={index}>
                <td>{person.name}</td>
                <td> {person.email}</td>
                <td className="">
                  {person.assignedProjects.map((project, index) => {
                    return (
                      <div key={index}>
                        <p>
                          {project.name}
                          <span className="ml-3">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                onDeleteAssignedProject(project.id, person._id);
                              }}
                            >
                              <i className="material-icons  ">delete_forever</i>
                            </button>
                          </span>
                        </p>
                      </div>
                    );
                  })}
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
