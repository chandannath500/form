import React from 'react';
import { Form, Radio } from 'antd';
import Upload from './Upload';

const Ownership = ({ownershipChange2022Value,handleOwnershipChange2022Change,form }) => {
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item
            label="Was there any change in Ownership Structure in 2022?"
            name="ownershipChange2022"
            labelCol={{ span: 24 }}
               rules={[
            {
              required: true,
              message: 'Please select an option',
            },
          ]}
          >
            <Radio.Group className="vertical-radio-group" value={ownershipChange2022Value}
              onChange={(e) => handleOwnershipChange2022Change}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>
</div>
<div style={{ display: 'flex', flexDirection: 'column' }}>
          <Form.Item label="Upload latest Shareholding pattern" labelCol={{ span: 24 }} name="shareholdingPattern">
            <Upload
              main={"Browse Files"}
              sub={"Drag and drop files here"}
              onFileUpload={(fileList) => form.setFieldsValue({ shareholdingPattern: fileList })}
              disabled={ownershipChange2022Value === 'no'}
            />
          </Form.Item>
    </div>
    </>
  )
}

export default Ownership
