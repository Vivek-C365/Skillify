import React from "react";
import { Card } from "antd";
const Cards = ({children}) => (
  <Card title="Card title" variant="borderless" style={{ width: 300 }}>
    <p>{children}</p>
  </Card>
);
export default Cards;
