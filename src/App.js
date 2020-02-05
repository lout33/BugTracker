import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import { Context } from "./Context";
import axios from "axios";

import { Router, Redirect } from "@reach/router";

import ManageRoleAssignment from "./pages/Admin/ManageRoleAssignment";
import ManageProjectUsers from "./pages/Admin/ManageProjectUsers";

import MyProjectsSubmitter from "./pages/Submitter/MyProjectsSubmitter";
import MyTicketsSubmitter from "./pages/Submitter/MyTicketsSubmitter";

import MyProjectsManager from "./pages/Manager/MyProjectsManager";
import MyTicketsManager from "./pages/Manager/MyTicketsManager";

import MyProjectsDeveloper from "./pages/Developer/MyProjectsDeveloper";
import MyTicketsDeveloper from "./pages/Developer/MyTicketsDeveloper";
import "./App.css";
import NotFound from "./pages/NotFound";
import { backend_route } from "./GlobalVariables";
import Spinner from "./utils/Spinner";

// import Navbar from "./Components/Navbar";
// import Sidebar from "./Components/Sidebar";

const Navbar = lazy(() => import("./Components/Navbar"));
const Sidebar = lazy(() => import("./Components/Sidebar"));

const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const GetIn = lazy(() => import("./pages/GetIn"));
const MyProjects = lazy(() => import("./pages/Admin/MyProjects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const MyTickets = lazy(() => import("./pages/Admin/MyTickets"));
const TicketDetail = lazy(() => import("./pages/TicketDetail"));
const TicketEdit = lazy(() => import("./pages/TicketEdit"));

// import GetIn from "./pages/GetIn";
// import DashboardHome from "./pages/DashboardHome";
// import MyProjects from "./pages/Admin/MyProjects";
// import ProjectDetail from "./pages/ProjectDetail";
// import MyTickets from "./pages/Admin/MyTickets";
// import TicketDetail from "./pages/TicketDetail";
// import TicketEdit from "./pages/TicketEdit";

function App(props) {
  const { isAuth, setIsAuth, setUser, typeUser, setTypeUser } = useContext(
    Context
  );

  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${backend_route}/api/global/account/myAccount`, {
        params: {},
        headers: { "auth-token": window.sessionStorage.getItem("token") }
      })
      .then(function(data) {
        console.log(data);
        setIsAuth(true);
        if (data.data.assignedProjects) {
          if (data.data.role == "submitter") {
            setTypeUser("submitter");
            setUser(data.data);
          } else if (data.data.role == "developer") {
            setTypeUser("developer");
            setUser(data.data);
          } else if (data.data.role == "manager") {
            setTypeUser("manager");
            setUser(data.data);
          } else {
            setTypeUser("normal");
            setUser(data.data);
          }
        } else {
          setTypeUser("admin");
          setUser(data.data);
        }
        setisLoading(false);
      })
      .catch(function(error) {
        console.log(error);
        console.log("token invalido");
      });
  }, [isAuth]);

  return (
    <Suspense
      fallback={
        <Spinner/>
      }
    >
      <div className="wrapper">
        <Sidebar/>
        <div className="main-panel">
          <Navbar/>
          <Router>
            {isAuth && <Redirect noThrow from="/getin" to="/"/>}
            <GetIn path="/getin"/>
            {!isAuth && <Redirect noThrow from="/" to="/getin"/>}
            {/* {!isAuth && <Redirect noThrow from="/*" to="/getin"></Redirect>} */}

            {/* //Para cuando este logeado */}

            {isLoading ? (
              <NotFound default/>
            ) : (
              <DashboardHome exact path="/"/>
            )}

            {isAuth && (
              <ManageRoleAssignment path="/manageRole"/>
            )}
            {isAuth && (
              <ManageProjectUsers path="/manageProject"/>
            )}
            {typeUser == "admin" && (
              <MyProjects path="/myProjects"/>
            )}
            {typeUser == "admin" && <MyTickets path="/myTickets"/>}
            {typeUser == "submitter" && (
              <MyProjectsSubmitter path="/myProjects"/>
            )}
            {typeUser == "submitter" && (
              <MyTicketsSubmitter path="/myTickets"/>
            )}
            {typeUser == "manager" && (
              <MyProjectsManager path="/myProjects"/>
            )}
            {typeUser == "manager" && (
              <MyTicketsManager path="/myTickets"/>
            )}
            {typeUser == "developer" && (
              <MyProjectsDeveloper path="/myProjects"/>
            )}
            {typeUser == "developer" && (
              <MyTicketsDeveloper path="/myTickets"/>
            )}
            <ProjectDetail path="/myProjects/details/:projectId"/>
            <TicketDetail path={`/myTickets/details/:ticketId`}/>
            <TicketEdit path={`/myTickets/edit/:ticketId`}/>
            <NotFound default/>
          </Router>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
