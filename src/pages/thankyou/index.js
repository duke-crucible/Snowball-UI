import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

export default function ThankYou() {
  return (
    <Typography className="app">
      <Title level={2} style={{ marginLeft: "5%" }}>
        Thank you
      </Title>
      <h5 style={{ marginLeft: "5%" }}>
        You have successfully enrolled to this study. Thank you so much for
        participating! If you have any questions, please visit: [website here]
        or contact xxx-xxx-xxxx. Have a nice day!
      </h5>
    </Typography>
  );
}
