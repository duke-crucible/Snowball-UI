import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function ThankYouNotConsented() {
  return (
    <Typography className="app">
      <Title level={2} style={{ marginLeft: "5%" }}>
        Thank you
      </Title>
      <h5 style={{ marginLeft: "5%" }}>
        Thank you for your interest to this study. If you have changed your mind
        or have any questions, please visit: [website here] or contact
        xxx-xxx-xxxx. Have a nice day!
      </h5>
    </Typography>
  );
}
