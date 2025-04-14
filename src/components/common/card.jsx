import React from "react";

import { Card } from "antd";
const Cards = ({ children, className }) => (
  <Card className={className}>
    <div>{children}</div>
  </Card>
);
export default Cards;
