import React, { useState } from "react";
import { Search } from "./Search";
import { Table } from "./Table";
import "./../../styles.css";
import { useTranslation } from "react-i18next";

export function CardPersonnel() {
  const [filteredArray, setFilteredArray] = useState([]);
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-header card-header-info">
        <h4 className="card-title ">{t("Your Personnel")}</h4>
        <p className="card-category">
          {t("All your personnel in your database")}
        </p>
      </div>
      <div className="card-body">
        <Search setFilteredArray={setFilteredArray}></Search>
        <Table filteredArray={filteredArray}></Table>
      </div>
    </div>
  );
}
