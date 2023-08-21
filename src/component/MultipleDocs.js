import React from 'react';
import { Form,Checkbox } from 'antd';
import Upload from './Upload';

const MultipleDocs = ({form}) => {
  return (
    <>
       <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Form.Item
            label="Please upload the following documents"
            name="multiType"
            labelCol={{ span: 24 }}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && value.length > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Please select documents');
                },
              }),
            ]}
          >
            <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
              <Checkbox value="Bank Statements">Bank Statements</Checkbox>
              <Checkbox value="Credit Card">Credit Card Statements</Checkbox>
              <Checkbox value="Form 10991">Form 10991</Checkbox>
              <Checkbox value="Form 940/941">Form 940/941</Checkbox>
              <Checkbox value="EIN">EIN Certificate</Checkbox>
              <Checkbox value="IRS">IRS Acceptance Letter of S-Corp</Checkbox>
              <Checkbox value="Financials">Financials(if prepared).</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Form.Item label="Upload documents for the same" labelCol={{ span: 24 }} name="multiDocs">
          <Upload
    main={"Browse Files"}
    sub={"Drag and drop files here"}
    onFileUpload={(fileList) => {
      form.setFieldsValue({
        multiDocs: fileList.map(file => ({ filename: file.name }))
      });
    }}
  />
          </Form.Item>
          </div>
    </>
  )
}

export default MultipleDocs
