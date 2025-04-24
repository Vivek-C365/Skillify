import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const CardWithImage = ({
  children,
  image,
  imageStyle,
  cardColor,
  className,
}) => (
  <Card
    style={{
      backgroundColor: cardColor || "white",
      border: "1.5px solid black",
      borderRadius: "18px",
      padding: "0px",
    }}
    styles={{
      body: {
        padding: "8px",
      },
    }}
    className={`flex sm:flex-col max-sm:max-w-[100vw] justify-center ${className}`}
    cover={<img className={imageStyle} alt="example" src={image} />}
  >
    {children}
  </Card>
);

export default CardWithImage;
