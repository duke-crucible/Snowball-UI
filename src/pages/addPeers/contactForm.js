import React from "react";
import { MinusCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";
import { ageReg } from "../../utils/reg";
import { MAX_PEERS } from "../../config";
import "./index.css";

const { Option } = Select;

function ContactForm() {
  return (
    <Form.List className="contactForm" name="contacts">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Contact {index + 1}</Divider>
                <Form.Item
                  name={[index, "FIRST_NAME"]}
                  label="First Name Or Initial"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[index, "LAST_NAME"]}
                  label="Last Name Or Initial"
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Sex" name={[index, "PAT_SEX"]}>
                  <Select>
                    <Option value="Female">Female</Option>
                    <Option value="Male">Male</Option>
                    <Option value="Non-binary">Non-binary</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Age"
                  name={[index, "PAT_AGE"]}
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
                {fields.length >= 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Above Contact
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                className="addContactButton"
                type="default"
                shape="round"
                onClick={() => add()}
                disabled={fields.length === MAX_PEERS}
                style={{ width: "60%", fontWeight: "bold" }}
              >
                <UserAddOutlined /> Add Contact
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default ContactForm;
