import React from "react";
import { Space, Card, Row, Col } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import ConsentModal from "../../components/ConsentModal/index.js";
import { downloadReport } from "../../service/apiService";
import { save_report } from "../../utils/downloadReport";
import "./index.css";

function AdminTools(props) {
  const downloadFile = () => {
    downloadReport({ type: "participants" }).then((res) => {
      save_report(res.data, "participants_report", ".csv");
    });
  };

  return (
    <div className="app">
      <Space direction="vertical" style={{ width: "100%" }}></Space>
      <h1 className="admin-tool-title">Admin Tools</h1>
      <Row>
        <Col>
          <Card style={{ width: "200px", height: "200px", marginLeft: "20px" }}>
            <h1>Consent Upload</h1>
            <ConsentModal title="Upload Consent File"></ConsentModal>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "400px", height: "200px", marginLeft: "20px" }}>
            <h1>Download Participants Reports</h1>
            <button
              style={{
                color: "white",
                fontSize: "13px",
                background: "#4287f5",
                height: "25%",
              }}
              onClick={downloadFile}
            >
              <FileAddOutlined />
              Download Participants Report
            </button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminTools;
