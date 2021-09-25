import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { Table, message, Space, Tooltip, Tag } from "antd";
import TableColumnSelector from "../../components/TableColumnSelector/index.js";
import {
  SeedTableColumnsConfig,
  SeedTableFilterColumnList,
} from "../../config";
import { updateSeed, saveStatus } from "../../service/apiService";
import { validator } from "../../utils/reg";
import emitter from "../../utils/EventEmitter";

import "./index.css";

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  ...restProps
}) => {
  const save = async (dataIndex, record, evt) => {
    try {
      const oldValue = record[dataIndex];
      const newValue = typeof evt === "string" ? evt : evt.target.innerText;

      // don't change if new value is the same as old one
      if (oldValue === newValue) return;

      const validateObj = {};
      validateObj[dataIndex] = newValue;

      validator[dataIndex]
        .validate(validateObj)
        .then(() => {
          const requestObj = {
            create: 0,
            MRN: record.MRN,
          };
          //change key
          const key = dataIndex.split(" ");
          requestObj[key.join("")] = newValue;
          return updateSeed(requestObj);
        })
        .then(() => {
          message.success(
            `The ${dataIndex} of ${record.MRN} has been modified successfully!`
          );
          emitter.emit("refresh-table");
        })
        .catch(({ errors }) => {
          evt.target.innerText = oldValue;
          if (errors) {
            message.error(`Failed: ${errors[0]?.message}`);
          }
        });
    } catch (errInfo) {
      //TODO: error handling
      console.log("Save failed: ", errInfo);
    }
  };

  /**
   * Wrap of saveStatus
   */
  const modifyStatus = (record, evt) => {
    saveStatus(record, evt).then(() => {
      emitter.emit("refresh-table");
    });
  };

  const onKeyEnter = (evt) => {
    if (evt.key === "Enter") {
      evt.target.blur();
    }
  };

  return (
    <td
      contentEditable={editable}
      onKeyDown={onKeyEnter}
      onBlur={(evt) => editable && save(dataIndex, record, evt)}
      onClick={(evt) => dataIndex === "ACTION" && modifyStatus(record, evt)}
      suppressContentEditableWarning={true}
      {...restProps}
    >
      {children}
    </td>
  );
};

/**
  table initialize
*/
const SeedsTable = (props) => {
  //event id
  const [eid] = useState(Math.ceil(Math.random() * 10e5));

  //the final display columns
  const [tableColumnsConfigFiltered, setTableColumnsConfigFiltered] = useState(
    cloneDeep(SeedTableColumnsConfig)
  );

  useEffect(() => {
    //emitter.removeAllListeners();
    const addLocalEventListener = () => {
      emitter.addListener("refresh-table", () => {
        if (props && props.fetchData) {
          props.fetchData();
        }
      });
      // filter listener result
      emitter.addListener(`columns-filter-${eid}`, (cols) => {
        setAvailableColumn(cols);
      });

      //default to display all
      setAvailableColumn(SeedTableFilterColumnList);
    };
    addLocalEventListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
    process columns to be displayed
  */
  const setAvailableColumn = (stayCols = []) => {
    window.localStorage.setItem(
      "react-table-filters",
      JSON.stringify(stayCols)
    );
    const dismissedColumns = [];
    //collect the columns to be hid
    SeedTableFilterColumnList.forEach((fcl) => {
      const indexOfStayCols = stayCols.indexOf(fcl);
      if (indexOfStayCols === -1) dismissedColumns.push(fcl);
    });

    //the columns to be displayed
    setTableColumnsConfigFiltered((prevTCCF) =>
      prevTCCF.map((tcc) => {
        tcc.className =
          dismissedColumns.indexOf(tcc.dataIndex) > -1 ? "columns-hidden" : "";
        return tcc;
      })
    );
  };

  /**
   Table Filter Change Event Handler
  */
  const tableChange = (pagination, filters, sorter) => {
    //The previous value of the array should be used when update an array with useState hook
    //Update tableColumnsConfigFiltered's title
    setTableColumnsConfigFiltered((prevTCCF) =>
      prevTCCF.map((tcc) => {
        if (filters[tcc.dataIndex]) {
          const newTitle = `${tcc.dataIndex}: ${filters[tcc.dataIndex].join(
            "/"
          )}`;
          tcc.title = (
            <Tooltip title={`tooltip: ${newTitle} TBD`}>
              <span>{tcc.dataIndex}:</span>
              <Tag color="green">{filters[tcc.dataIndex].join("/")}</Tag>
            </Tooltip>
          );
        } else {
          tcc.title = (
            <Tooltip
              title={`tooltip: ${tcc.dataIndex} Fill in the tooltip message`}
            >
              {tcc.dataIndex}
            </Tooltip>
          );
        }
        return {
          ...tcc,
        };
      })
    );
  };

  return (
    <Space direction="vertical">
      <TableColumnSelector
        eid={eid}
        filterColumnList={SeedTableFilterColumnList}
      ></TableColumnSelector>
      <Table
        scroll={{ x: 500, y: 500 }}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        className="editable-table"
        bordered
        rowClassName={() => "editable-row"}
        dataSource={props.dataSource}
        columns={tableColumnsConfigFiltered}
        pagination={props.paginationProps}
        onChange={tableChange}
      />
    </Space>
  );
};

export default SeedsTable;
