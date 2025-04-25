import React from "react";
import { Carousel } from "antd";

const CarouselLayout = ({ contentList }) => {
  const Data = contentList ?? [];
  console.log(Data);
  const contentStyle = {
    margin: 0,
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div>
      <Carousel className="!h-[170px] !w-[100vw]" infinite arrows>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
      </Carousel>
    </div>
  );
};
export default CarouselLayout;
