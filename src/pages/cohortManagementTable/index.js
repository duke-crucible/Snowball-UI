import React, { useState, useEffect } from "react";
import { message } from "antd";
import CohortTable from "../../components/CohortTable/index.js";
import { fetchCohortTableData } from "../../service/apiService";
import "./index.css";

function CohortTablePage(props) {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [paginationProps, setPaginationProps] = useState({
    pageSize: 10,
    current: currentPage,
    onChange: (current) => setCurrentPage(current),
  });

  const fetchData = (params = {}) => {
    fetchCohortTableData({
      ...params,
      page: 1,
      count: 10,
    }).then((res) => {
      if (!res.data.records) {
        message.warning("There is no data for this cohort!");
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

  useEffect(() => {
    setPaginationProps((p) => {
      return {
        ...p,
        current: currentPage,
      };
    });
  }, [currentPage]);

  return (
    <div className="app">
      <h1 className="cohort-title">Cohort Management</h1>
      <CohortTable
        bordered
        dataSource={dataSource}
        fetchData={fetchData}
        paginationProps={paginationProps}
      />
    </div>
  );
}

export default CohortTablePage;
