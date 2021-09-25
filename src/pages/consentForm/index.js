import React from "react";
import { Typography, Divider } from "antd";
import ConsentForm from "../../components/ConsentForm/index.js";
import "./index.css";

const { Title } = Typography;

function FillConsentForm(props) {
  return (
    <Typography className="app" style={{ marginLeft: "5%" }}>
      <Title level={2}>Consent Form</Title>
      <Title level={5}>
        Please read below consent form and fill in below information to start.
      </Title>
      <Divider />
      <ConsentForm
        title="Upload Consent File"
        style={{ marginLeft: "5%" }}
      ></ConsentForm>
    </Typography>
  );
}

export default FillConsentForm;
