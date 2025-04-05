import React from "react";
const Cards = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};
export default Cards;
