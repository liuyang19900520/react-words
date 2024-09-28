import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

type FieldType = {
  word?: string;
  freq?: string;
  typ?: string;
  lvl?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const View: React.FC = () => (
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="word"
      name="word"
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="freq"
      name="freq"
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="type"
      name="typ"
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="level"
      name="lvl"
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export default View;
