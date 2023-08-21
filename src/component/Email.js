import React from 'react'
import { Form, Input} from 'antd';
const Email = () => {
  return (
    <div>
       <Form.Item label="Email" name="email" rules={[
            { message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ]}>
            <Input className="generic-input-style" />
          </Form.Item>
    </div>
  )
}

export default Email
