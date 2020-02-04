import React, { useState } from "react";
import { Search } from "./Search";
import { Table } from "./Table";
import "./../../styles.css";
import { useTranslation } from "react-i18next";
export function CardPersonnel() {
  const [filteredArray, setFilteredArray] = useState([]);
  const { t } = useTranslation();

  return (
    <CardPersonnel
      title="Your Personnel"
      description="All your personnel in your database"
    >
      <Search setFilteredArray={setFilteredArray}></Search>
      <Table filteredArray={filteredArray}></Table>
    </CardPersonnel>
  );
}
