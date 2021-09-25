import React, { useState, useEffect } from "react";
import { message } from "antd";
import PeerCouponTable from "../../components/PeerCouponTable/index.js";
import PeerCouponNoContactsInfoTable from "../../components/PeerCouponNoContactsInfoTable/index.js";
import { peerDistribution } from "../../service/apiService";
import "./index.css";

function PeerCoupon(props) {
  const [dataSource, setDataSource] = useState([]);
  const [noContactsDataSource, setNoContactsDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [paginationProps, setPaginationProps] = useState({
    pageSize: 10,
    current: currentPage,
    onChange: (current) => setCurrentPage(current),
  });

  const fetchData = (params = { contacts: "y" }) => {
    peerDistribution({
      ...params,
      page: 1,
      count: 10,
    }).then((res) => {
      //      console.log(res.data.records);
      if (!res.data.records) {
        message.warning("There is no data for this cohort!");
        setDataSource(null);
      } else {
        setDataSource(
          res.data.records
            .sort((prev, next) => {
              return (
                new Date(next["Qualified Date"]).getTime() -
                new Date(prev["Qualified Date"]).getTime()
              );
            })
            .map((d, index) => {
              return { ...d, key: `${Date.now()}${index}` };
            })
        );
      }
    });
  };

  const fetchDataNoContacts = (params = { contacts: "n" }) => {
    peerDistribution({
      ...params,
      page: 1,
      count: 10,
    }).then((res) => {
      console.log(res.data.records);
      if (!res.data.records) {
        message.warning(
          "There is no data for this peer coupon distribution without contacts information report!"
        );
        setNoContactsDataSource(null);
      } else {
        setNoContactsDataSource(
          res.data.records
            .sort((prev, next) => {
              return (
                new Date(next["Qualified Date"]).getTime() -
                new Date(prev["Qualified Date"]).getTime()
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
    fetchDataNoContacts();
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
      <h1 className="peer-coupon-title">Peer Coupon Distribute</h1>
      <h1>Distribute coupons to seeds who have peer information</h1>
      <h2>
        If you want to send invite to a different email, click
        "ALTERNATIVE_EMAIL" cell and input the email address.
      </h2>
      <PeerCouponTable
        bordered
        dataSource={dataSource}
        fetchData={fetchData}
        paginationProps={paginationProps}
      ></PeerCouponTable>
      <h1>Distribute coupons to seeds who do not have peer information</h1>
      <h2>
        Click "NUM_COUPONS" to input how many number of coupon invites you want
        to send. If you want to send invite(s) to a different email, click
        "ALTERNATIVE_EMAIL" cell and input the email address.{" "}
      </h2>
      <PeerCouponNoContactsInfoTable
        bordered
        dataSource={noContactsDataSource}
        fetchData={fetchDataNoContacts}
        paginationProps={paginationProps}
      ></PeerCouponNoContactsInfoTable>
    </div>
  );
}

export default PeerCoupon;
