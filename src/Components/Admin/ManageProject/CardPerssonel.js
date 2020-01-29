import React, { useState } from "react";
import { Search } from "./Search";
import { Table } from "./Table";
import "./../../styles.css";

export function CardPersonnel() {
  const [filteredArray, setFilteredArray] = useState([]);

  return (
    <div className="card">
      <div className="card-header card-header-info">
        <h4 className="card-title ">Your Personnel</h4>
        <p className="card-category">All your personnel in your database</p>
      </div>
      <div className="card-body">
        <Search setFilteredArray={setFilteredArray}></Search>
        <Table filteredArray={filteredArray}></Table>
      </div>
    </div>
  );
}
