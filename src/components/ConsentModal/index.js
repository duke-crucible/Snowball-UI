import React, { useState } from "react";
import { Button, Modal, Upload, Input, Form, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { uploadConsent } from "../../service/apiService.js";

import "./index.css";
const { Dragger } = Upload;

const ConsentDialog = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  // upload file
  const onFormFinish = (upload) => {
    if (confirmLoading) return;
    setConfirmLoading(true);

    uploadConsent({
      cf: upload.cf.fileList[0].originFileObj,
      comments: upload.comments,
    })
      .then(() => {
        // Reset form fields
        form.resetFields();
        setFileList([]);
        // Close Modal
        setVisible(false);
        // Alert Success Message
        message.success("Uploaded Successfully!");
      })
      .catch((error) => {
        message.error(error.reason);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  //open upload dialog
  const openDialog = () => {
    setVisible(true);
  };

  // Before Upload Handler to set upload file
  const onChangeHandler = ({ file, fileList }) => {
    setFileList(() => [...fileList]);
  };

  return (
    <>
      {/*Upload Button*/}
      <button
        style={{
          color: "white",
          fontSize: "13px",
          background: "#4287f5",
          borderColor: "black",
          height: "25%",
          width: "110%",
        }}
        onClick={openDialog}
      >
        <CloudUploadOutlined />
        Upload Consent Form
      </button>
      {/* Upload Dialog*/}
      <Modal
        title="Consent File Upload"
        centered={true}
        visible={visible}
        footer={null}
        width="750px"
        onCancel={() => setVisible(false)}
      >
        <p className="dialog-tips">
          Drag and drop a PDF file into the area below to begin
        </p>

        {/*Form*/}
        <Form form={form} {...layout} name="pdf-form" onFinish={onFormFinish}>
          <Form.Item
            label="File"
            name={["cf"]}
            rules={[
              {
                required: true,
                message: "Please select your PDF file!",
              },
            ]}
          >
            <Dragger
              name="file"
              accept=".pdf"
              fileList={fileList}
              maxCount={1}
              onChange={onChangeHandler}
              beforeUpload={() => false}
            >
              <Button className="choose-btn" type="primary">
                CHOOSE FILE
              </Button>
              <p className="ant-upload-hint">or</p>
              <p className="ant-upload-hint">Drop Files Here</p>
            </Dragger>
          </Form.Item>
          <Form.Item
            label="Comments"
            name={["comments"]}
            rules={[
              {
                required: true,
                message: "Please input your comments.",
              },
            ]}
          >
            <Input.TextArea
              maxLength={200}
              style={{ width: "100%", resize: "none" }}
              placeholder="Please describe what has been changed in this version of the consent file."
              rows={5}
            />
          </Form.Item>
          <Form.Item labelCol={0} wrapperCol={24}>
            <div className="dialog-footer">
              <button
                style={{
                  color: "white",
                  fontSize: "13px",
                  background: "#4287f5",
                  borderColor: "black",
                  height: "50%",
                  width: "12%",
                }}
                disabled={fileList.length === 0}
                loading={confirmLoading}
                className="choose-btn"
                type="primary"
                htmlType="submit"
              >
                Submit
              </button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ConsentDialog;
