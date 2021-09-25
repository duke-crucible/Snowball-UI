import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, Space, Form, Button, Divider, message } from "antd";

import { handleAddPeers } from "../../service/apiService";
import ContactForm from "./contactForm";
import "./index.css";

const { Title } = Typography;

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 6 },
  },
};

export default function AddPeers() {
  const [form] = Form.useForm();
  const history = useHistory();
  const id = new URLSearchParams(useLocation().search).get("record_id");

  function handleFinish(values) {
    console.log(values);
    const result = {};
    Object.keys(values).forEach((key) => {
      if (key === "contacts") {
        result["contacts"] = values[key];
      }
    });
    result["RECORD_ID"] = id;
    result["ENROLLMENT_COMPLETED"] = "Y";
    handleAddPeers({
      ...result,
    })
      .then((res) => {
        message.success("You have successfully added contacts! ");
        form.resetFields();
        history.push(`/thankyou?record_id=${id}`);
      })
      .catch((error) => {
        message.error(error);
      });
  }

  return (
    <div className="app">
      <Title level={2} style={{ marginLeft: "5%" }}>
        Contacts Information
      </Title>
      <Title level={5} style={{ marginLeft: "5%" }}>
        Please list up to 10 people you have either lived together or you have
        regular face to face contact with.
      </Title>

      <Space direction="vertical" style={{ width: "60%" }}>
        <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
          <Divider dashed>Contact Information</Divider>
          <ContactForm />
          <Divider dashed></Divider>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "50%" }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
}
