import React, { useState, useEffect, useCallback } from "react";
import { cloneDeep } from "lodash";
import {
  Table,
  Input,
  message,
  Space,
  Tooltip,
  Tag,
  Modal,
  Row,
  Col,
  Form,
  Card,
  Divider,
  Button,
} from "antd";

import SearchForm from "../../components/SearchForm/index.js";
import TableColumnSelector from "../../components/TableColumnSelector/index.js";
import {
  CohortTableColumnsConfig,
  CohortSearchFormConfig,
  CohortTableFilterColumnList,
} from "../../config";
import { getComment, submitComment } from "../../service/apiService";
import emitter from "../../utils/EventEmitter";
import "./index.css";

const { TextArea } = Input;

/**
 * initialize
 */
const CohortTable = (props) => {
  //event id
  const [eid] = useState(Math.ceil(Math.random() * 10e5));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [commentForm] = Form.useForm();

  const [tableColumnsConfigFiltered, setTableColumnsConfigFiltered] = useState(
    cloneDeep(CohortTableColumnsConfig)
  );

  const addLocalEventListener = useCallback(
    (props) => {
      emitter.addListener("refresh-table", () => {
        if (props && props.fetchData) {
          props.fetchData();
        }
      });

      //filter listener result
      emitter.addListener(`columns-filter-${eid}`, (cols) => {
        setAvailableColumn(cols);
      });

      //default to display all
      setAvailableColumn(CohortTableFilterColumnList);
    },
    [eid]
  );

  useEffect(() => {
    addLocalEventListener();
  }, [addLocalEventListener]);

  /**
   * process the columns to be displayed
   */
  const setAvailableColumn = (stayCols = []) => {
    window.localStorage.setItem(
      "react-table-filters",
      JSON.stringify(stayCols)
    );
    const dismissedColumns = [];
    // columns to be hid
    CohortTableFilterColumnList.forEach((fcl) => {
      const indexOfStayCols = stayCols.indexOf(fcl);
      if (indexOfStayCols === -1) dismissedColumns.push(fcl);
    });

    //set columns to be displayed
    setTableColumnsConfigFiltered((prevTCCF) =>
      prevTCCF.map((tcc) => {
        tcc.className =
          dismissedColumns.indexOf(tcc.dataIndex) > -1 ? "columns-hidden" : "";
        return tcc;
      })
    );
  };

  /**
   * search by conditions
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
    props.fetchData(params);
  };

  /**
   * table filter change event handler
   */
  const tableChange = (pagination, filters, sorter) => {
    // the previous value of the array should be used when update an array with useState hook

    //update tableColumnsConfigFiltered title
    setTableColumnsConfigFiltered((prevTCCF) =>
      prevTCCF.map((tcc) => {
        if (filters[tcc.dataIndex]) {
          const newTitle = `${tcc.dataIndex}: ${filters[tcc.dataIndex].join(
            "/"
          )}`;
          tcc.title = (
            <Tooltip title={`tootip: ${newTitle} TBD tooltip`}>
              <span>{tcc.dataIndex}:</span>
              <Tag color="green">{filters[tcc.dataIndex].join("/")}</Tag>
            </Tooltip>
          );
        }
        return {
          ...tcc,
        };
      })
    );
  };

  // cell click
  const cellClick = (event) => {
    if (event.target.getAttribute("data-name") === "CRM") {
      const id = event.target.getAttribute("id");
      const targetData =
        props.dataSource.filter((ds) => ds["MRN"] === id)[0] || {};

      setIsModalVisible(true);

      if (targetData["MRN"]) {
        setModalData(targetData);
        console.log(targetData);
        fetchComment(targetData["RECORD_ID"]);
      }
    }
  };

  //close modal
  const closeModal = () => {
    setModalData({});
    setIsModalVisible(false);
  };

  const fetchComment = (id) => {
    getComment({ record_id: id }).then((res) => {
      setCommentList(res.data.records.comments);
    });
  };

  // TODO: refine and finish with backend code; get netID
  const addComment = (value) => {
    if (value.comment && value.RECORD_ID) {
      submitComment({ ...value }).then((res) => {
        message.success("Comment Added Success!");
        commentForm.resetFields();
        fetchComment(value.RECORD_ID);
      });
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <SearchForm
        config={CohortSearchFormConfig}
        onSearch={onSearch}
      ></SearchForm>
      <br />
      <p>
        Click CRM button in the table to see communication logs with the
        participant.
      </p>
      <TableColumnSelector
        eid={eid}
        filterColumnList={CohortTableFilterColumnList}
      ></TableColumnSelector>
      <Table
        className="editable-table"
        bordered
        rowClassName={() => "editable-row"}
        dataSource={props.dataSource}
        columns={tableColumnsConfigFiltered}
        pagination={props.paginationProps}
        onRow={(record, index) => {
          return {
            onClick: cellClick,
          };
        }}
        onChange={tableChange}
      />
      <Modal
        title="CRM"
        width={"940px"}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={[]}
      >
        <div className="record-infor">
          <h2>Record Information</h2>
          <Card>
            <Row gutter={10} className="record-row">
              <Col span={12}>
                <b>Coupon: </b> {modalData["COUPON"]}
              </Col>
              <Col span={12}>
                <b>Peers Coupon: </b> {modalData["peersCoupon"]}
              </Col>

              <Col span={12}>
                <b>Name: </b> {modalData["PAT_NAME"]}
              </Col>

              <Col span={12}>
                <b>Email: </b> {modalData["EMAIL_ADDRESS"]}
              </Col>
              <Col span={12}>
                <b>Record ID: </b> {modalData["RECORD_ID"]}
              </Col>

              <Col span={12}>
                <b>Cell Phone: </b> {modalData["MOBILE_NUM"]}
              </Col>
              <Col span={12}>
                <b>Home No.: </b> {modalData["HOME_NUM"]}
              </Col>

              <Col span={12}>
                <b>Language: </b> {modalData["LANGUAGE"]}
              </Col>
              <Col span={12}>
                <b>Age: </b> {modalData["PAT_AGE"]}
              </Col>

              <Col span={12}>
                <b>Sex: </b> {modalData["PAT_SEX"]}
              </Col>
              <Col span={12}>
                <b>Ethnicity: </b> {modalData["ETHNIC_GROUP"]}
              </Col>

              <Col span={12}>
                <b>Coupon Distributed Date: </b>{" "}
                {modalData["COUPON_ISSUE_DATE"]}
              </Col>
              <Col span={12}>
                <b>Coupon Validated Date: </b> {modalData["COUPON_REDEEM_DATE"]}
              </Col>

              <Col span={12}>
                <b>Consented Date: </b> {modalData["CONSENT_DATE"]}
              </Col>

              <Col span={12}>
                <b>Survey Completed Date: </b>{" "}
                {modalData["SURVEY_COMPLETION_DATE"]}
              </Col>
            </Row>
          </Card>
          <Divider />
        </div>
        <div className="comment-list">
          <h2>History Comments</h2>
          <Card>
            {commentList.map((c, i) => {
              return (
                <div className="comment" key={i}>
                  <p>{c.time}</p>
                  <div>{c.comment}</div>
                </div>
              );
            })}
          </Card>
          <h2>Add New Comments</h2>
          <Form
            form={commentForm}
            onFinish={(value) =>
              addComment({ ...value, RECORD_ID: modalData["RECORD_ID"] })
            }
          >
            <Form.Item name="comment">
              <TextArea rows={4} style={{ resize: "none" }}></TextArea>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </Space>
  );
};

export default CohortTable;
