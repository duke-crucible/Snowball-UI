import React, { useState, useEffect } from "react";
import { Space, message } from "antd";
import TestScheduleTable from "../../components/TestSchedule/index.js";
import { getPeersForTest } from "../../service/apiService";
import SearchForm from "../../components/SearchForm/index.js";
import { PeerTestReportSearchFormConfig } from "../../config";
import "./index.css";

function TestScheduleReport(props) {
  const [dataSource, setDataSource] = useState([]);
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
      }
    });
    fetchData(params);
  };

  const fetchData = (params = {}) => {
    getPeersForTest({
      ...params,
      page: 1,
      count: 10,
    }).then((res) => {
      console.log(res.data);
      if (!res.data.records) {
        message.warning("There is no data for test schedule report!");
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
      <h1 className="table-title">Schedule Test Report</h1>
      <div>
        <SearchForm
          config={PeerTestReportSearchFormConfig}
          onSearch={onSearch}
        ></SearchForm>
      </div>
      <Space direction="vertical" style={{ width: "100%" }}>
        <TestScheduleTable
          bordered
          dataSource={dataSource}
          fetchData={fetchData}
          paginationProps={paginationProps}
        />
      </Space>
    </div>
  );
}

export default TestScheduleReport;
