import React from 'react';
import { Form, Radio } from 'antd';
import Upload from './Upload';

const Incorporated = ({ incorporated2022Value, handleIncorporated2022Change, form }) => {
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item
        label="Was the S-Corp incorporated in 2022?"
        name="incorporated2022"
        labelCol={{ span: 24 }}
        rules={[
            {
              required: true,
              message: 'Please select an option',
            },
          ]}
      >
        <Radio.Group
          className="vertical-radio-group"
          value={incorporated2022Value}
          onChange={handleIncorporated2022Change} 
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </Form.Item>
</div>
<div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item label="Please Upload the Incorporation Documents"  labelCol={{ span: 24 }} name="incorporationDocuments">
        <Upload
          main={"Browse Files"}
          sub={"Drag and drop files here"}
          onFileUpload={(fileList) => form.setFieldsValue({ incorporationDocuments: fileList })}
          disabled={incorporated2022Value === 'no'}
        />
      </Form.Item>
    </div>
    </>
  );
};

export default Incorporated;
