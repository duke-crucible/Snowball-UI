import React, { useEffect, useState } from "react";
import { Button, Space, message, Row, Col, Card } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import AddDataModel from "../../components/AddDataModel/index.js";
import CSVDialog from "../../components/CSVDialog/index.js";
import SeedsTable from "../../components/SeedsTable/index.js";
import { fetchTableData } from "../../service/apiService";
import SearchForm from "../../components/SearchForm/index.js";
import { SeedReportSearchFormConfig } from "../../config";
import "./index.css";

function SeedReport(props) {
  const [dataSource, setDataSource] = useState([]);
  const [modelShow, setModelShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationProps, setPaginationProps] = useState({
    pageSize: 10,
    current: currentPage,
    onChange: (current) => setCurrentPage(current),
  });

  useEffect(() => {
    setPaginationProps((p) => {
      return {
        ...p,
        current: currentPage,
      };
    });
  }, [currentPage]);

  /**
     search by conditions
    */
  const onSearch = (data) => {
    const params = {};
    Object.keys(data).forEach((key) => {
      if (data[key] || data[key] === 0) {
        params[key] = data[key];
        if (key === "age") {
          if (data[key] === "under 20") params[key] = "0-20";
          if (data[key] === "older than 81") params[key] = "81-130";
        }
      }
    });
    console.log(params);
    fetchData(params);
  };

  const AddDataOK = (data) => {
    setModelShow(false);
    setCurrentPage(1);
    fetchData();
  };

  const fetchData = (params = {}) => {
    fetchTableData({
      ...params,
      page: 1,
      count: 10,
    }).then((res) => {
      console.log(res.data);
      if (!res.data.records) {
        message.warning("There is no data from the seed report!");
        setDataSource(null);
      } else {
        setDataSource(
          res.data.records
            .sort((prev, next) => {
              return (
                new Date(next["Result Date"]).getTime() -
                new Date(prev["Result Date"]).getTime()
              );
            })
            .map((d, index) => {
              return { ...d, key: `${Date.now()}${index}` };
            })
        );
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <Space className="table-top" style={{ marginBottom: "3%" }}>
        <Card style={{ width: "110%" }}>
          <p style={{ fontWeight: "bold" }}>
            Click below buttons to add more seeds or download seed report.
          </p>
          <Row>
            <Col>
              <CSVDialog></CSVDialog>
              <Button
                style={{
                  color: "white",
                  background: "#4287f5",
                  height: "120%",
                  width: "47%",
                  margin: "1%",
                }}
                onClick={() => setModelShow(true)}
              >
                <FileAddOutlined />
                Add New Seed
              </Button>
            </Col>
          </Row>
        </Card>
      </Space>
      <h1 className="table-title">Seeds Report</h1>
      <div>
        <SearchForm
          config={SeedReportSearchFormConfig}
          onSearch={onSearch}
        ></SearchForm>
      </div>
      <br />
      <p>
        Click EMAIL_ADDRESS, MOBILE_NUM, TEST_RESULT cells to edit email, mobile
        phone number or test result.
      </p>
      <p>
        Click INCLUDE button in ACTION cell to send email or SMS invite (if
        email address is not available) to a seed to join the study.
      </p>
      <Space direction="vertical" style={{ width: "100%" }}>
        <SeedsTable
          bordered
          dataSource={dataSource}
          fetchData={fetchData}
          paginationProps={paginationProps}
        />
      </Space>
      <AddDataModel
        title="Add New Seed"
        modelShow={modelShow}
        onOk={(res) => AddDataOK(res)}
        onCancel={() => setModelShow(false)}
      ></AddDataModel>
    </div>
  );
}

export default SeedReport;
