import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { backend_route } from "./../../GlobalVariables";
import { useTranslation } from "react-i18next";

export default function MyProjectsDeveloper() {
  const { t } = useTranslation();

  const { listProyects, setListProyects } = useContext(Context);

  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backend_route}/api/developer/project/getAssignedProjects`, {
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(res => {
        if (res.request.status === 200) {
          try {
            setloading(false);
            setListProyects(res.data);
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error pe chino");
        }
      });
  }, []);

  return (
    <div className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div class="card">
            <div class="card-header card-header-info">
              <h4 class="card-title ">{t("Your Projects")} </h4>
              <p class="card-category">
                {t("All your projects in your database")}
              </p>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table ">
                  <thead className="font-weight-bold">
                    <th>{t("Username")}</th>
                    <th>{t("Description")}</th>
                    {/* <th>Details</th> */}
                  </thead>
                  <tbody>
                    {loading ? (
                      <img
                        src={require("./../../images/loading.gif")}
                        width={"80px"}
                        alt=""
                      />
                    ) : (
                      listProyects.map((project, index) => {
                        return (
                          <tr key={index}>
                            <td>{project.name}</td>
                            <td> {project.description}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                  <tfoot>
                    {/* <nav>
                          <ul className="pagination">
                            {pageNumbers.map(number => (
                              <li key={number} className="page-item">
                                <a
                                  onClick={() => paginate(number)}
                                  className="page-link"
                                >
                                  {number}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </nav> */}
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
