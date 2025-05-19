import React from "react";

export const FormSectionTitle = ({ title, level = 4 }) => (
  <h2 className={`font-poppins text-heading font-bold text-${level === 4 ? 'xl' : '2xl'} mb-2`}>{title}</h2>
);

export const FormSectionDivider = ({ title }) => (
  <div className="mb-6">
    {title && <div className="font-poppins text-heading font-semibold text-lg mb-2">{title}</div>}
    <div className="border-b border-solid border-border"></div>
  </div>
);

export const SectionHeader = ({ title }) => (
  <div className="mb-4">
    <h2 className="font-poppins text-heading text-xl font-bold">{title}</h2>
    <div className="border-b border-solid border-border my-4"></div>
  </div>
);
