import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Checkbox } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import emitter from "../../utils/EventEmitter";
import "./index.css";

const TableColumnSelector = (props) => {
  const { eid, filterColumnList = [] } = props;
  const [selectedColumn, setSelectedColumn] = useState([...filterColumnList]);

  const FilterMenu = (props) => {
    return (
      <Menu multiple={true}>
        {filterColumnList.map((col) => {
          return (
            <Menu.Item key={col}>
              <Checkbox
                defaultChecked={props.selectedColumn.includes(col)}
                name={col}
                onChange={props.checkBoxChanged}
              >
                {col}
              </Checkbox>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };
  //set columns
  const checkBoxChanged = (evt) => {
    const newVal = evt.target.name;
    if (!evt.target.checked) {
      // move from the selected list
      selectedColumn.splice(selectedColumn.indexOf(newVal), 1);
      setSelectedColumn([...selectedColumn]);
    } else {
      setSelectedColumn([...selectedColumn, newVal]);
    }
  };

  useEffect(() => {
    //emit event if selectedColumns changes
    emitter.emit(`columns-filter-${eid}`, selectedColumn);
  }, [selectedColumn, eid]);

  //Try to load checked value from LocalStorage
  useEffect(() => {
    try {
      const localStorageFilters = JSON.parse(
        window.localStorage.getItem("react-table-filters")
      );
      if (localStorageFilters)
        setSelectedColumn(() => [...localStorageFilters]);
    } catch {}
  }, []);

  // to avoid dropdown won't be closed at click
  const [visible, setVisible] = useState(false);
  const onVisibleChang = (flag) => [setVisible(flag)];

  return (
    <div className="table-column-filter">
      <Dropdown
        placement="bottomRight"
        visible={visible}
        onVisibleChange={onVisibleChang}
        overlay={FilterMenu({ checkBoxChanged, selectedColumn })}
      >
        <div style={{ color: "blue" }}>
          <MenuOutlined /> Select Columns To Display
        </div>
      </Dropdown>
    </div>
  );
};

export default TableColumnSelector;
