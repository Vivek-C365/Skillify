import React from "react";
import { Avatar, Card } from "antd";
const { Meta } = Card;
const CardWithImage = ({ children, image, imageStyle }) => (
  <Card
    style={{
      width: "22rem",
      backgroundColor: "#ECF5E9",
      border: "1.5px solid black",
      borderRadius: "18px",
    }}
   
    cover={<img className={imageStyle} alt="example" src={image} />}
  >
    {children}
  </Card>
);
export default CardWithImage;
