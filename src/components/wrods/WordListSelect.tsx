import React from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";

type FieldType = {
  word?: string;
  freq?: string;
  typ?: string;
  lvl?: string;
};

type ViewProps = {
  onSubmit: (values: FieldType) => void;  // 父组件传递的 onSubmit 回调
};

const SelectView: React.FC<ViewProps> = ({ onSubmit }) => {

  const handleSubmit = (values: FieldType) => {
    // 提交时调用 onSubmit，并将表单数据传递给父组件
    onSubmit(values);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      onFinish={handleSubmit}  // 表单提交时触发
    >
      <Form.Item label="word" name="word">
        <Input />
      </Form.Item>

      <Form.Item label="freq" name="freq">
        <Input />
      </Form.Item>

      <Form.Item name="typ" label="Type">
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="1" style={{ lineHeight: "32px" }}>
                生词本
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="2" style={{ lineHeight: "32px" }}>
                单词量
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="3" style={{ lineHeight: "32px" }}>
                无效词
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="4" style={{ lineHeight: "32px" }}>
                生僻词
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item name="lvl" label="Level">
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="1" style={{ lineHeight: "32px" }}>
                1
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="2" style={{ lineHeight: "32px" }}>
                2
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="3" style={{ lineHeight: "32px" }}>
                3
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SelectView;
