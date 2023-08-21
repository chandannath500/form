import React from 'react';
import { Form, Input } from 'antd';

const Email = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item
        label="Email"
        name="email"
        labelCol={{ span: 24 }}
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <Input className="generic-input-style" />
      </Form.Item>
    </div>
  );
};

export default Email;
