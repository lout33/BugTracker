import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context";
import { Toast } from "../../animations/Alerts";
import { Link } from "@reach/router";

import axios from "axios";
import { backend_route } from "../../GlobalVariables";
import { useTranslation } from "react-i18next";

export function Attachments({ props, imagesDetail, setImagesDetail }) {
  const { t } = useTranslation();

  const { user } = useContext(Context);

  ////////////////////////Card-General////////////////////////
  const [filteredArray, setFilteredArray] = useState([]);
  ////////////////////////Card-General////////////////////////

  ////////////////////////Search////////////////////////

  const [searchedWord, setSearchedWord] = useState("");
  useEffect(() => {
    setFilteredArray(imagesDetail);
  }, [imagesDetail]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};

      objectClean["uploaderName"] = obj["uploaderName"];
      objectClean["imageDescription"] = obj["imageDescription"];
      objectClean["updatedAt"] = obj["updatedAt"];

      for (let key in objectClean) {
        if (
          JSON.stringify(objectClean[key])
            .toLowerCase()
            .includes(searchedItem.toLowerCase())
        ) {
          return objectClean;
        }
      }
    });
    return arrayFiltered;
  };

  const handleSearchedWord = e => {
    setSearchedWord(e.target.value);
  };

  useEffect(() => {
    // filtro por cada input del usuario
    setFilteredArray(itemsFiltered(searchedWord, imagesDetail));
    // console.log(searchedWord);
  }, [searchedWord]);
  ////////////////////////Search////////////////////////

  // LOGIG PAGINATION ///////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentImagesForThisTicket = filteredArray.slice(
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
  //////////////////////////////////////////////////////

  const URL_CLOUDARY = "https://api.cloudinary.com/v1_1/dv2q4mh6c/image/upload";
  const PRESET_CLOUDINARY = "eo7isizh";
  const onSendImage = e => {
    e.preventDefault();
    const bodyFormData = new FormData();
    bodyFormData.append("file", imageFile);
    bodyFormData.append("upload_preset", PRESET_CLOUDINARY);
    // bodyFormData.append("imageDescription", imageDescription);
    console.log("data enviada");
    Toast.fire({
      icon: "info",
      title: "Uploading images... one second please "
    });
    setImageDescription("");

    axios
      .post(URL_CLOUDARY, bodyFormData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(function(res) {
        console.log(res.data);

        axios
          .post(
            `${backend_route}/api/global/ticket/addImageToTicket`,
            {
              url: res.data.url,
              filename: res.data.original_filename,
              imageDescription: imageDescription,
              id: res.data.public_id,
              ticketId: props.ticketId,
              uploaderName: user.name,
              uploaderId: user._id
            },
            {
              params: {},
              headers: { "auth-token": window.sessionStorage.getItem("token") }
            }
          )
          .then(function(res) {
            // me llega los detalles de ONE Proyecto
            console.log(res.data);
            // setTicketDetail(res.data);
            setImagesDetail(res.data.image);
            Toast.fire({
              icon: "success",
              title: "Added image with success"
            });
          })
          .catch(function(error) {
            console.log(error);
            Toast.fire({
              icon: "error",
              title: "Error! to add image "
            });
          });

        // setTicketDetail(res.data);
      })
      .catch(function(error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Error! upload image please"
        });
      });
  };

  const [imageDescription, setImageDescription] = useState("");
  const [imageFile, setImageFile] = useState("");

  const onHandleFile = e => {
    e.preventDefault();
    setImageFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };
  const onHandleImageDescription = e => {
    setImageDescription(e.target.value);
    // console.log(e.target.value);
  };
  return (
    <div>
      <div>
        <h4> {t("Add a Attachment")}?</h4>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">
              <i className="material-icons">move_to_inbox</i>
              {t("Click Here")} |{t("To add your images")}
            </label>
            <input
              id="exampleFormControlFile1"
              type="file"
              className="w-100  btn btn-warning form-control-file"
              onChange={onHandleFile}
            />
          </div>
        </form>
        <textarea
          type="text"
          value={imageDescription}
          onChange={onHandleImageDescription}
          className="form-control mb-4"
          placeholder="Description"
          rows="4"
          cols="50"
        />
        <button className="btn btn-warning" onClick={onSendImage}>
          {t("Add")}
        </button>
      </div>

      <div className="card">
        <div className="card-header card-header-info">
          <h6 className="card-title ">{t("Tickets Attachtment")} </h6>
          <p className="card-category">
            {t("All files attached to this ticket")}
          </p>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {/* ///////////////////Search/////////////////////////// */}
            <div className="input-group no-border w-100  d-flex flex-row-reverse">
              <div className="input-group no-border w-50  ">
                <input
                  className="form-control"
                  type="text"
                  value={searchedWord}
                  onChange={handleSearchedWord}
                  placeholder="Search"
                />
                <button
                  type="submit"
                  class="btn btn-white btn-round btn-just-icon"
                >
                  <i class="material-icons">search</i>
                  <div class="ripple-container"></div>
                </button>
              </div>
            </div>
            {/* ///////////////////Search/////////////////////////// */}
            <table className="table ">
              <thead className="font-weight-bold">
                <tr>
                  <th className="font-weight-bold">{t("File")} </th>
                  <th className="font-weight-bold">{t("Uploader")} </th>
                  <th className="font-weight-bold">{t("Description")} </th>
                  <th className="font-weight-bold">{t("Created")} </th>
                </tr>
              </thead>
              <tbody>
                {currentImagesForThisTicket.map((image, index) => {
                  return (
                    <tr key={index} className="">
                      <td className="">
                        {/* <!-- Button trigger modal --> */}
                        <button
                          type="button"
                          className=" btn btn-info "
                          data-toggle="modal"
                          data-target={"#" + index}
                        >
                          {t("View Image")}
                        </button>
                        {/* <!-- Modal --> */}
                        <div
                          className="modal fade"
                          id={index}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  {t("Image")}
                                </h5>
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
                                <a href={image.url} download>
                                  <img width="300px" src={image.url} alt="" />
                                </a>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  {t("Close")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{image.uploaderName}</td>
                      <td>{image.imageDescription}</td>
                      <td>{image.updatedAt}</td>
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
                            <a
                              onClick={() => paginate(number)}
                              className="page-link"
                            >
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
        </div>
      </div>
    </div>
  );
}
