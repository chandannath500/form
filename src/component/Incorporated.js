import React from 'react';
import { Form, Radio } from 'antd';
import Upload from './Upload';

const Incorporated = ({ incorporated2022Value, handleIncorporated2022Change, form }) => {
  return (
    <div>
      <Form.Item
        label="Was the S-Corp incorporated in 2022?"
        name="incorporated2022"
      >
        <Radio.Group
          className="vertical-radio-group"
          value={incorporated2022Value}
          onChange={handleIncorporated2022Change} // Removed unnecessary arrow function
        >
          <Radio value="yes">Yes</Radio>
          <Radio value="no">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Please Upload the Incorporation Documents" name="incorporationDocuments">
        <Upload
          main={"Browse Files"}
          sub={"Drag and drop files here"}
          onFileUpload={(fileList) => form.setFieldsValue({ incorporationDocuments: fileList })}
          disabled={incorporated2022Value === 'no'}
        />
      </Form.Item>
    </div>
  );
};

export default Incorporated;
