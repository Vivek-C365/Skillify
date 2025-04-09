import React from "react";
import { Divider, Typography } from "antd";

const { Title } = Typography;

export const FormSectionTitle = ({ title, level = 4 }) => (
  <Title level={level} style={{ marginTop: "1.5rem", marginBottom: "1rem" }}>
    {title}
  </Title>
);

export const FormSectionDivider = ({ title }) => (
  <Divider orientation="left" plain>
    {title}
  </Divider>
);
