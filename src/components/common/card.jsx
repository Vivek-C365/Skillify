import React from "react";

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-[16px] shadow border border-gray-200 p-6 font-poppins ${className}`}>
    {title && (
      <div className="mb-4">
        <h2 className="text-heading text-xl font-bold">{title}</h2>
        <div className="border-b border-solid border-border my-4"></div>
      </div>
    )}
    {children}
  </div>
);

export default Card;