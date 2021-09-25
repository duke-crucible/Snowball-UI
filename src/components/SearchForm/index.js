import React from "react";
import { Row, Col, Button, Form, Select, Card } from "antd";

import "./index.css";

const { Option } = Select;

const SearchForm = (props) => {
  const [form] = Form.useForm();

  const reset = () => {
    form.resetFields();
  };

  const search = (data) => {
    if (props.onSearch) {
      props.onSearch(data);
    }
  };

  return (
    <Card style={{ width: "100%" }}>
      <div style={{ fontWeight: "bold" }}>
        Fill in below filters to narrow the results:
      </div>
      <Form form={form} className="search-form" onFinish={search}>
        <Form.Item
          label="Days from report date:"
          name="date_range"
          style={{ width: "400px" }}
        >
          <Select>
            <Option value="3">Within 3 days</Option>
            <Option value="5">Within 5 days</Option>
            <Option value="7">Within 7 days</Option>
            <Option value="15">Within 15 days</Option>
            <Option value="30">Within 30 days</Option>
            <Option value="99999">All</Option>
          </Select>
        </Form.Item>
        <Row gutter={8}>
          {(props.config || []).map((component, i) => {
            const CurrentComponent = component.component;
            return (
              <Col span={4} key={i}>
                <Form.Item name={[component.name]}>
                  <CurrentComponent
                    style={{ width: "100%" }}
                    key={i}
                    allowClear={true}
                    {...component.props}
                  ></CurrentComponent>
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <Row>
          <Form.Item>
            <Button onClick={reset}>Reset</Button>
            <Button
              type="primary"
              style={{ background: "#4287f5", borderColor: "black" }}
              htmlType="submit"
            >
              Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
};

export default SearchForm;
