import React from "react";

import { Card } from "antd";
const Cards = ({ title, children, className }) => (
  <Card
    title={title}
    variant="borderless"
    style={{ width: 300 }}
    className={className}
  >
    <div>{children}</div>
  </Card>
);
export default Cards;
