import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../../Context";

export function Search({ setFilteredArray }) {
  const { listTickets } = useContext(Context);
  const [searchedWord, setSearchedWord] = useState("");

  useEffect(() => {
    setFilteredArray(listTickets);
  }, [listTickets]);

  const itemsFiltered = (searchedItem, arrayOfObject) => {
    let arrayFiltered = arrayOfObject.filter(function(obj) {
      let objectClean = {};
      objectClean["name"] = obj["name"];
      objectClean["byProjectName"] = obj["byProjectName"];
      if (obj["assignedDeveloper"]) {
        objectClean["assignedDeveloper"] = obj["assignedDeveloper"]["devName"];
      } else {
        objectClean["assignedDeveloper"] = "";
      }
      objectClean["priority"] = obj["priority"];
      objectClean["status"] = obj["status"];
      objectClean["type"] = obj["type"];
      objectClean["createdAt"] = obj["createdAt"];

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
    setFilteredArray(itemsFiltered(searchedWord, listTickets));
    console.log(searchedWord);
  }, [searchedWord]);

  return (
    <div className="input-group no-border w-100  d-flex flex-row-reverse">
      <div className="input-group no-border w-50  ">
        <input
          className="form-control"
          type="text"
          value={searchedWord}
          onChange={handleSearchedWord}
          placeholder="Search"
        />
        <button type="submit" class="btn btn-white btn-round btn-just-icon">
          <i class="material-icons">search</i>
          <div class="ripple-container"></div>
        </button>
      </div>
    </div>
  );
}
