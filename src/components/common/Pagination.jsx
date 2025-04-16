import React from "react";
import { Pagination } from "antd";

const PaginationLaoyut = ({ totalitems, itemPerPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalitems / itemPerPage); i++) {
    pages.push;
  }
  return (<Pagination align="end" defaultCurrent={1} total={50} />)
};

export default PaginationLaoyut;
