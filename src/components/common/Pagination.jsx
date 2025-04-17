import React from "react";
import { Pagination } from "antd";

const PaginationLaoyut = ({ totalitems, pageSize, onChange }) => {
  return (
    <Pagination
      align="end"
      onChange={onChange}
      pageSize={pageSize}
      defaultCurrent={1}
      total={totalitems}
    />
  );
};

export default PaginationLaoyut;
