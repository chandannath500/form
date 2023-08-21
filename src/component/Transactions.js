import React from 'react';
import { Form,Checkbox } from 'antd';
import Upload from './Upload';

const Transactions = ({form}) => {
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column' }}>      
      <Form.Item
            label="Was there any following transaction in 2022?"
            name="transaction"
            labelCol={{ span: 24 }}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && value.length > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Please select a transaction type');
                },
              }),
            ]}
          >
            <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}>
              <Checkbox value="Infusion">Capital Infusion</Checkbox>
              <Checkbox value="Withdrawal">Capital Withdrawal</Checkbox>
              <Checkbox value="Transaction">Related Party Transaction</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Form.Item label="Upload documents for the same" labelCol={{ span: 24 }} name="transactionDocs">
            <Upload
              main={"Browse Files"}
              sub={"Drag and drop files here"}
              onFileUpload={(fileList) => form.setFieldsValue({ transactionDocs: fileList })}
            />
          </Form.Item>
    </div>
    </>
  )
}

export default Transactions
