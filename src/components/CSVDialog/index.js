import React, { useState } from "react";
import { Button, Modal, Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { uploadCSV } from "../../service/apiService";
import emitter from "../../utils/EventEmitter";

import "./index.css";
const { Dragger } = Upload;

const CSVDialog = () => {
  const [visible, setVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [summary, setSummary] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  // Close Summary Dialog
  const modelHandleOK = () => {
    setSummary({});
    setSummaryVisible(false);
    emitter.emit("refresh-table");
  };

  // Open Upload Dialog
  const openDialog = () => {
    setVisible(true);
  };

  //before upload handle, set upload file
  const onChangeHandler = ({ file, fileList }) => {
    setFileList(() => [...fileList]);
  };

  // submit file
  const uploadSubmit = () => {
    if (confirmLoading) return;
    setConfirmLoading(true);
    //single file upload
    uploadCSV(fileList[0].originFileObj)
      .then((res) => {
        setFileList([]);
        setVisible(false);
        setSummaryVisible(true);
        setSummary(res.data.records);
        message.success("File Uploaded Successfully!");
      })
      .catch((error) => {
        message.error(error.reason);
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <>
      {/* Upload Button */}
      <Button
        style={{
          background: "#4287f5",
          color: "white",
          height: "120%",
          width: "47%",
          margin: "1%",
        }}
        onClick={openDialog}
      >
        <CloudUploadOutlined />
        Upload CSV File
      </Button>
      {/* Upload Dialog */}
      <Modal
        title="CSV Import"
        centered={true}
        style={{ height: "40%" }}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <p className="dialog-tips">
          Drag and drop a CSV file into the area below to begin. CSV file must
          begin with the header row.
        </p>
        <Dragger
          name="file"
          accept=".csv"
          fileList={fileList}
          maxCount={1}
          onChange={onChangeHandler}
          beforeUpload={() => false}
        >
          <button
            style={{ background: "#4287f5", color: "white" }}
            className="choose-btn"
            type="primary"
          >
            CHOOSE FIlE
          </button>
          <p className="ant-upload-hint">or</p>
          <p className="ant-upload-hint" style={{ height: "15%" }}>
            Drop Files Here
          </p>
        </Dragger>

        <div className="dialog-footer">
          <Button
            disabled={fileList.length === 0}
            loading={confirmLoading}
            className="choose-btn"
            type="primary"
            onClick={uploadSubmit}
          >
            Submit
          </Button>
        </div>
      </Modal>
      {/* Summary Dialog */}
      <Modal
        title="CSV Summary"
        centered={true}
        visible={summaryVisible}
        footer={null}
        width="450px"
        onCancel={() => setSummaryVisible(false)}
      >
        <div className="summary">
          <h2> CSV Upload Summary</h2>
          <p>
            <span className="line-title">TOTAL LINES INCLUDING HEADER: </span>{" "}
            <span className="line-data">{summary.totalLines}</span>
          </p>
          <p>
            <span className="line-title">COLUMNS FOUND:</span>{" "}
            <span className="line-data">{summary.columnsFound}</span>
          </p>
          <p>
            <span className="line-title">TOTAL LINES OF RECORDS INSERTED:</span>{" "}
            <span className="line-data">{summary.totalDataLinesInserted}</span>
          </p>
          <p>
            <span className="line-title">REJECTED LINE:</span>{" "}
            <span className="line-data">{summary.rejectedLines}</span>
          </p>
          <Button
            type="primary"
            className="summary-btn"
            onClick={modelHandleOK}
          >
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CSVDialog;
