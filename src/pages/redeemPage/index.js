import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  message,
  Form,
  Input,
  Button,
  Radio,
  Typography,
  Row,
  Col,
  Divider,
} from "antd";
import { getCouponInfo, confirmUserInfo } from "../../service/apiService";

import Logo from "../../assets/snowball-logo.png";
import "./index.css";

const { Title, Paragraph, Link } = Typography;

const RedeemPage = () => {
  const coupon = new URLSearchParams(useLocation().search).get("coupon");
  const history = useHistory();
  const [form] = Form.useForm();
  const [recordId, setRecordId] = useState([]);
  const [participantType, setParticipantType] = useState([]);

  /**
   * get user information
   */
  const fetchUserInfo = useCallback(() => {
    if (!coupon) {
      message.error("Missing coupon parameter.");
      return;
    }

    getCouponInfo({
      coupon,
    }).then((res) => {
      setRecordId(res.data.records["RECORD_ID"]);
      setParticipantType(res.data.records["PTYPE"]);
      form.setFieldsValue({
        ...res.data.records,
        GUIDED: "no",
      });
    });
  }, [coupon, form]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const confirm = () => {
    const FIRST_NAME = form.getFieldValue("FIRST_NAME");
    const LAST_NAME = form.getFieldValue("LAST_NAME");
    const ZIP = form.getFieldValue("ZIP");
    const MOBILE_NUM = form.getFieldValue("MOBILE_NUM");
    const HOME_NUM = form.getFieldValue("HOME_NUM");
    const EMAIL_ADDRESS = form.getFieldValue("EMAIL_ADDRESS");
    const GUIDED = form.getFieldValue("GUIDED");
    const RECORD_ID = recordId;

    confirmUserInfo({
      FIRST_NAME,
      LAST_NAME,
      ZIP,
      MOBILE_NUM,
      HOME_NUM,
      EMAIL_ADDRESS,
      GUIDED,
      RECORD_ID,
    }).then((res) => {
      message.success("User coupon redeemed!");
      history.push(`/consent?record_id=${RECORD_ID}`);
    });
  };

  return (
    <div className="app">
      <Row>
        <Col>
          <img alt="logo" src={Logo}></img>
        </Col>
        <Col>
          <Typography>
            <Title>
              Snowball Study: Respondent-Driven Sampling for Communicable
              Disease Surveillance
            </Title>
          </Typography>
        </Col>
      </Row>

      <Typography>
        <Divider />
        <Title level={2}>Welcome to join Snowball Study!</Title>

        <Paragraph>
          Please check your contact information below, you can update if needed.
          After you redeem the coupon, you will fill the consent and survey.
        </Paragraph>
        <Paragraph>
          <b>For study team</b>: please check "Yes" for "Guided" if you are
          assisting the participant to redeem the coupon.
        </Paragraph>
        <Paragraph>
          For more information about Snowball, please visit:{" "}
          <Link href="https://sites.duke.edu/snowball/">
            {" "}
            https://sites.duke.edu/snowball/
          </Link>
        </Paragraph>
      </Typography>

      <Form
        form={form}
        name="user-info-form"
        onFinish={confirm}
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="horizontal"
      >
        <Form.Item label="First Name" name="FIRST_NAME">
          <Input disabled={participantType === "seed"} />
        </Form.Item>
        <Form.Item label="Last Name" name="LAST_NAME">
          <Input disabled={participantType === "seed"} />
        </Form.Item>
        <Form.Item label="Zipcode" name="ZIP">
          <Input disabled={participantType === "seed"} />
        </Form.Item>
        <Form.Item label="Cell Phone" name="MOBILE_NUM">
          <Input />
        </Form.Item>
        <Form.Item label="Home Phone" name="HOME_NUM">
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="EMAIL_ADDRESS"
          rules={[
            {
              type: "email",
              message: "The input is not valid e-mail",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Guided"
          name="GUIDED"
          tooltip="If you are participating this study yourself, please choose no. "
          rules={[{ required: true, message: "Need to choose Guided or not." }]}
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RedeemPage;
