import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { navigate } from "@reach/router";

import { backend_route } from "./../GlobalVariables";
import CardAssignedPersonnel from "../Components/ProjectDetail/CardAssignedPersonnel";
import CardTicketsForThisProject from "../Components/ProjectDetail/CardTicketsForThisProject";
import { useTranslation } from "react-i18next";

export default props => {
  const { t } = useTranslation();

  const [proyectoDetail, setProyectoDetail] = useState({});

  const [listTicketsForThisProject, setListTicketsForThisProject] = useState(
    []
  );

  //   const projectId = props.projectId;
  //   console.log(projectId);

  // LOGIC PAGINATION
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [postsPerPage] = useState(10);
  //   const indexOfLastPost = currentPage * postsPerPage;
  //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //   const currentTickets = proyectoDetail.tickets.slice(
  //     indexOfFirstPost,
  //     indexOfLastPost
  //   );

  //   // Change page
  //   const paginate = pageNumber => setCurrentPage(pageNumber);
  //   //    const totalProyects = listTickets.length;

  //   const pageNumbers = [];

  //   for (
  //     let i = 1;
  //     i <= Math.ceil(proyectoDetail.tickets.length / postsPerPage);
  //     i++
  //   ) {
  //     pageNumbers.push(i);
  //   }
  /////////////////////////////////////////////////////////////////////

  const onNavigateToProjects = () => {
    navigate("/myProjects");
  };

  useEffect(() => {
    axios
      .post(
        `${backend_route}/api/global/project/getProjectById`,
        { projectId: props.projectId },
        {
          params: {},
          headers: { "auth-token": window.sessionStorage.getItem("token") }
        }
      )
      .then(function(res) {
        console.log(res.data);
        setProyectoDetail(res.data);
        console.log(res.data.tickets);
        setListTicketsForThisProject(res.data.tickets);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header card-header-info">
                  <h4 className="card-title ">
                    {t("Details for this project")}{" "}
                  </h4>

                  <button
                    onClick={onNavigateToProjects}
                    class=" btn btn-link  btn-sm  text-white"
                  >
                    <i class="material-icons">arrow_back</i>

                    {t("Back to list")}
                  </button>
                  {/* <button>Edit</button> */}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      {/* <thead class=" text-primary">
                            <th>Assigned Developer</th>
                            <th>Assigned Developer</th>
                          </thead> */}
                      <tbody id="tbody">
                        <tr>
                          <td>
                            <h4>{t("Project Name")}</h4>
                            <p>{proyectoDetail.name}</p>
                          </td>
                          <td>
                            <h4>{t("Project Description")} </h4>
                            <p>{proyectoDetail.description}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <CardAssignedPersonnel props={props}></CardAssignedPersonnel>
            </div>
            <div className="col-md-7">
              <CardTicketsForThisProject
                listTicketsForThisProject={listTicketsForThisProject}
              ></CardTicketsForThisProject>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ProjectDetail;
