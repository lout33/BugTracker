import React, { useContext } from "react";
import { Context } from "./../../../Context";

export function ListOfUsers({ setPickedPersonel, pickedPersonel }) {
  const { myPersonel } = useContext(Context);

  const handleOptionChangePersonel = e => {
    setPickedPersonel(e.target.value);
  };

  return (
    <div>
      <h4> List of users to assign role</h4>
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
              {person.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
