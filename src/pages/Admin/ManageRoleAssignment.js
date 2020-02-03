import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import axios from "axios";
import { Toast } from "../../animations/Alerts";

import { backend_route } from "../../GlobalVariables";

import { CardPersonnel } from "../../Components/Admin/ManageRole/CardPerssonel";
import { Modal } from "../../Components/Admin/ManageRole/Modal";
import { ListOfUsers } from "../../Components/Admin/ManageRole/ListOfUsers";
import { useTranslation } from "react-i18next";

export default function ManageRoleAssignment() {
  // const { register, handleSubmit, watch, errors } = useForm();

  const { myPersonel, setMyPersonel, user, isAuth } = useContext(Context);
  const { t } = useTranslation();

  /////////////////////////////////////////////////////
  const [pickedPersonel, setPickedPersonel] = useState(undefined);
  /////////////////////////////////////////////////////
  const [role, setRole] = useState("developer");
  const handleOptionChange = e => {
    setRole(e.target.value);
    console.log(e.target.value);
  };

  const handleRoleAssign = () => {
    axios
      .post(
        `${backend_route}/api/admin/personnel/assignUserRole`,
        {
          role: role,
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

        Toast.fire({
          icon: "success",
          title: "Assigned user with success"
        });
      })
      .catch(function(error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Erro! to assign user"
        });
      });
  };

  return (
    <div className="mt-3">
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div>
                <h4> {t("Create New User or Personnel")}</h4>
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  {t("Add Personnel")}
                </button>
                <Modal></Modal>
              </div>
              <hr />
              <ListOfUsers
                setPickedPersonel={setPickedPersonel}
                pickedPersonel={pickedPersonel}
              ></ListOfUsers>
              <br />
              <div>
                <h4> {t("Select role to assign")}</h4>
                <select
                  value={role}
                  onChange={handleOptionChange}
                  className="w-100 custom-select"
                >
                  <option value="developer"> {t("developer")}</option>
                  <option value="submitter">{t("submitter")}</option>
                  <option value="manager">{t("manager")}</option>
                </select>
                <div>
                  <br />
                  <button
                    onClick={handleRoleAssign}
                    className="w-100  btn btn-warning"
                    type="button"
                  >
                    {t("Assign Role")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <CardPersonnel></CardPersonnel>
            </div>
            <div className="col-md-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
