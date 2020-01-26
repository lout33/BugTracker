import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";

import axios from "axios";

import { backend_route } from "../../GlobalVariables";
import { CardPersonnel } from "../../Components/Admin/ManageProject/CardPerssonel";

export default function ManageProjectUsers() {
  const {
    listProyects,
    setListProyects,
    myPersonel,
    setMyPersonel,
    user
  } = useContext(Context);

  const [pickedPersonel, setPickedPersonel] = useState(undefined);
  const [pickedProject, setPickedProject] = useState(undefined);

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
  //////////////////////////////////////////////////////

  const handleOptionChangePersonel = e => {
    setPickedPersonel(e.target.value);
    // console.log(e.target.value);
    console.log(pickedPersonel);
  };

  const handleOptionChangeProject = e => {
    setPickedProject(e.target.value);
    // const { name, value } = e.target;
    // setPickedProject({ ...pickedProject, [name]: value });
  };

  const onSubmitAssignToProject = e => {
    e.preventDefault();
    // "adminId":"5e10c31f3062a710ce57b17a",
    // "projectId":"5e10cc8b867c70113f0db410",
    // "userId":"5e10d1038dcaad1174a08811"

    axios
      .post(
        `${backend_route}/api/admin/project/assignUsersToProject`,
        {
          projectId: pickedProject,
          // projectName: pickedProject.projectName,
          userId: pickedPersonel
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
    <div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <form>
                <div>
                  <h4> List of projects</h4>
                  <small>Select:</small>
                  <select
                    value={pickedProject}
                    onChange={handleOptionChangeProject}
                    size="3"
                    className="w-100  list-group"
                  >
                    {listProyects.map((project, index) => {
                      return (
                        <option
                          key={index}
                          value={project._id}
                          className={"list-group-item list-group-item-action "}
                        >
                          {project.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <br />
                <div>
                  <h4>List of my perssonel</h4>
                  <small>Select:</small>

                  <select
                    value={pickedPersonel}
                    onChange={handleOptionChangePersonel}
                    size="3"
                    className="w-100  list-group"
                  >
                    {myPersonel.map((person, index) => {
                      return (
                        <option
                          key={index}
                          value={person._id}
                          className={"list-group-item list-group-item-action "}
                        >
                          {person.name}: {person.role}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <br />
                <button
                  onClick={onSubmitAssignToProject}
                  className="w-100  btn btn-warning"
                  type="submit"
                >
                  Assign Project
                </button>
                {/* <input type="submit" placeholder="AssignProject" /> */}
                {/* onSubmit={onSubmitAssignToProject} */}
              </form>
            </div>
            <div className="col-md-8">
              <CardPersonnel></CardPersonnel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
