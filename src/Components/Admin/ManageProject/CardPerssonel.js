import React, { useState } from "react";
import { Search } from "./Search";
import { Table } from "./Table";
import "./../../styles.css";
import CardLayout from "../../Layout/CardLayout";

export function CardPersonnel() {
  const [filteredArray, setFilteredArray] = useState([]);
  return (
    <CardLayout
      title="Your Personnel"
      description="All your personnel in your database"
    >
      <Search setFilteredArray={setFilteredArray} />
      <Table filteredArray={filteredArray} />
    </CardLayout>
  );
}
