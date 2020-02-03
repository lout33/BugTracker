import React, { useContext } from "react";
import { Context } from "./../../../Context";
import { useTranslation } from "react-i18next";

export function ListOfUsers({ setPickedPersonel, pickedPersonel }) {
  const { myPersonel } = useContext(Context);

  const handleOptionChangePersonel = e => {
    setPickedPersonel(e.target.value);
  };
  const { t } = useTranslation();

  return (
    <div>
      <h4>{t("List of users to assign role")} </h4>
      <small>{t("Select")}</small>
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
