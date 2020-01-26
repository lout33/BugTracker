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

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
const DashboardHome = lazy(() => import("./pages/DashboardHome"));
const GetIn = lazy(() => import("./pages/GetIn"));
const MyProjects = lazy(() => import("./pages/Admin/MyProjects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const MyTickets = lazy(() => import("./pages/Admin/MyTickets"));
const TicketDetail = lazy(() => import("./pages/TicketDetail"));
const TicketEdit = lazy(() => import("./pages/TicketEdit"));

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
      });
  }, [isAuth]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* LAYOUT */}
      <div className="wrapper">
        <Sidebar></Sidebar>
        <div className="main-panel">
          {/* <!-- Navbar --> */}
          <Navbar></Navbar>
          <Router>
            {/* // Para cuando quiera entrar sin permiso */}
            {isAuth && <Redirect noThrow from="/getin" to="/"></Redirect>}
            <GetIn path="/getin"></GetIn>
            {!isAuth && <Redirect noThrow from="/" to="/getin"></Redirect>}
            {/* {!isAuth && <Redirect noThrow from="/*" to="/getin"></Redirect>} */}

            {/* //Para cuando este logeado */}

            {isLoading ? (
              <NotFound default></NotFound>
            ) : (
              <DashboardHome exact path="/"></DashboardHome>
            )}

            {isAuth && (
              <ManageRoleAssignment path="/manageRole"></ManageRoleAssignment>
            )}
            {isAuth && (
              <ManageProjectUsers path="/manageProject"></ManageProjectUsers>
            )}
            {typeUser == "admin" && (
              <MyProjects path="/myProjects"></MyProjects>
            )}
            {typeUser == "admin" && <MyTickets path="/myTickets"></MyTickets>}
            {typeUser == "submitter" && (
              <MyProjectsSubmitter path="/myProjects"></MyProjectsSubmitter>
            )}
            {typeUser == "submitter" && (
              <MyTicketsSubmitter path="/myTickets"></MyTicketsSubmitter>
            )}
            {typeUser == "manager" && (
              <MyProjectsManager path="/myProjects"></MyProjectsManager>
            )}
            {typeUser == "manager" && (
              <MyTicketsManager path="/myTickets"></MyTicketsManager>
            )}
            {typeUser == "developer" && (
              <MyProjectsDeveloper path="/myProjects"></MyProjectsDeveloper>
            )}
            {typeUser == "developer" && (
              <MyTicketsDeveloper path="/myTickets"></MyTicketsDeveloper>
            )}
            <ProjectDetail path="/myProjects/details/:projectId"></ProjectDetail>
            <TicketDetail path={`/myTickets/details/:ticketId`}></TicketDetail>
            <TicketEdit path={`/myTickets/edit/:ticketId`}></TicketEdit>
            <NotFound default></NotFound>
          </Router>
        </div>
      </div>
    </Suspense>
  );
}

export default App;
