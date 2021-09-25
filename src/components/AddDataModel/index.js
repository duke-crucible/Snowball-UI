import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import { cellPhoneReg, ageReg } from "../../utils/reg";
import { handleAdd } from "../../service/apiService";

const { Option } = Select;

const AddDataModel = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setVisible(props.modelShow);
  }, [props.modelShow]);

  /**
   * Cancel
   */
  const modelHandleCancel = () => {
    // clear the table
    form.resetFields();
    setConfirmLoading(false);
    setVisible(false);
    if (props.onCancel) {
      props.onCancel();
    }
  };

  /**
   * Add new seed
   */
  const modelHandleOK = () => {
    form.validateFields().then((res) => {
      setConfirmLoading(true);
      const result = {};

      // make sure undefined won't be filtered
      Object.keys(res).forEach((key) => {
        if (key === "RESULT_DATE" || key === "RESULT_TIME") return;

        let afterKey = key.split(" ");
        // afterKey[0] = afterKey[0].toLowerCase();
        afterKey = afterKey.join("");
        if (typeof res[key] === "undefined") {
          result[afterKey] = "";
        } else {
          result[afterKey] = res[key];
        }
      });
      let result_date = "01-01-1900";
      if (form.getFieldValue("RESULT_DATE")) {
        result_date = form.getFieldValue("RESULT_DATE").format("MM-DD-YYYY");
      }

      let result_time = "00:00";
      if (form.getFieldValue("RESULT_TIME")) {
        result_time = form.getFieldValue("RESULT_TIME").format("HH:mm");
      }

      let result_date_time = result_date + result_time;

      handleAdd({
        ...result,
        // process data
        RESULT_DATE: result_date_time,
      })
        .then((res) => {
          if (props.onOk) {
            props.onOk();
          }
          form.resetFields();
          setConfirmLoading(false);
          setVisible(false);
        })
        .then(() => {
          message.success("New record has been added successfully!");
        })
        .catch((error) => {
          message.error(error.reason);
          setConfirmLoading(false);
        });
    });
  };

  return (
    <Modal
      title="Add New Seed"
      visible={visible}
      onOk={modelHandleOK}
      confirmLoading={confirmLoading}
      onCancel={modelHandleCancel}
      okText="Add"
      width="750px"
    >
      <Form
        form={form}
        name="info-form"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 19,
        }}
        layout="horizontal"
      >
        <Form.Item
          label="MRN"
          name="MRN"
          rules={[
            {
              required: true,
              message: "MRN is Required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="STATUS"
          name="STATUS"
          rules={[
            {
              required: true,
              message: "Status is Required",
            },
          ]}
        >
          <Select>
            <Option value="ELIGIBLE">ELIGIBLE</Option>
            <Option value="DEFER">DEFER</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="FIRST NAME"
          name="FIRST_NAME"
          rules={[
            {
              required: true,
              message: "First Name is Required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="LAST NAME"
          name="LAST_NAME"
          rules={[
            {
              required: true,
              message: "Last Name is Required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="TEST_RESULT"
          name="TEST_RESULT"
          rules={[
            {
              required: true,
              message: "Test result is Required",
            },
          ]}
        >
          <Select>
            <Option value="NEGATIVE">NEGATIVE</Option>
            <Option value="POSITIVE">POSITIVE</Option>
            <Option value="N/A">N/A</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="EMAIL"
          name="EMAIL_ADDRESS"
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-mail.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="HOME_NUM"
          name="HOME_NUM"
          rules={[
            () => ({
              validator(_, value) {
                if (value && !value.match(cellPhoneReg)) {
                  return Promise.reject(
                    new Error("Home phone format is XXX-XXX-XXXX")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="MOBILE_NUM"
          name="MOBILE_NUM"
          rules={[
            () => ({
              validator(_, value) {
                if (value && !value.match(cellPhoneReg)) {
                  return Promise.reject(
                    new Error("Mobile phone format is XXX-XXX-XXXX")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="RACE" name="RACE">
          <Select>
            <Option value="2 or more races">2 or more races</Option>
            <Option value="Asian">Asian</Option>
            <Option value="Black or African American">
              Black or African American
            </Option>
            <Option value="Caucasian/White">Caucasian/White</Option>
            <Option value="Not Reported/Declined">Not Reported/Declined</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item label="ETHNIC_GROUP" name="ETHNIC_GROUP">
          <Select>
            <Option value="Hispanic Mexican">Hispanic Mexican</Option>
            <Option value="Hispanic Other">Hispanic Other</Option>
            <Option value="Not Hispanic/Latino">Not Hispanic/Latino</Option>
            <Option value="Not Reported/Declined">Not Reported/Declined</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="AGE"
          name="PAT_AGE"
          rules={[
            () => ({
              validator(_, value) {
                if (value && !value.match(ageReg)) {
                  return Promise.reject(
                    new Error("Should be a valid age number.")
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="SEX" name="PAT_SEX">
          <Select>
            <Option value="Female">Female</Option>
            <Option value="Male">Male</Option>
            <Option value="Non-binary">Non-binary</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item label="RESULT_DATE" name="RESULT_DATE">
          <DatePicker format="MM-DD-YYYY"></DatePicker>
        </Form.Item>

        <Form.Item label="RESULT_TIME" name="RESULT_TIME">
          <TimePicker format="HH:mm"></TimePicker>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDataModel;
