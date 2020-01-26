import React, { useState, useEffect, useContext } from "react";
import { Context } from "./../Context";
import { navigate } from "@reach/router";
import Login from "./../Components/GetIn/Login";
import Register from "./../Components/GetIn/Register";
import axios from "axios";
import DemoUser from "../Components/GetIn/DemoUser";
import { backend_route } from "./../GlobalVariables";
import styled from "styled-components";
// import "./../index.css";
export default () => {
  const { isAuth } = useContext(Context);
  const [isLogginActive, setIsLogginActive] = useState("login");
  // const onToggleLoggin = place => {
  //   if (place == "login") {
  //     setIsLogginActive({
  //       name: "login"
  //     });
  //   } else if (place == "register") {
  //     setIsLogginActive({
  //       name: "register"
  //     });
  //   } else if (place == "demouser") {
  //     setIsLogginActive({
  //       name: "demouser"
  //     });
  //   }
  // };

  return (
    <div className="getinBackground">
      {isLogginActive == "login" && (
        <Login
          isLogginActive={isLogginActive}
          setIsLogginActive={setIsLogginActive}
        />
      )}
      {isLogginActive == "register" && (
        <Register
          isLogginActive={isLogginActive}
          setIsLogginActive={setIsLogginActive}
        ></Register>
      )}
      {isLogginActive == "demouser" && (
        <DemoUser
          isLogginActive={isLogginActive}
          setIsLogginActive={setIsLogginActive}
        ></DemoUser>
      )}
    </div>
  );
};

// const BackgroundStyle = styled.li`
//   color: tomato;
//   border-color: tomato;
//   background: papayawhip;
//   width: 1500px;
//   position: absolute important!;
//   left: 0px;
//   top: 0px;
//   zindex: 2;
// `;
