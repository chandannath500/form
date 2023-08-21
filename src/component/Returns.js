import React from 'react'
import { Form,Radio } from 'antd';
import Upload from './Upload';

const Returns = ({fileReturnsLastYearValue,handleFileReturnsLastYearChange,form}) => {
  return (
    <div>    

      <Form.Item
            label="Did you file the returns last year?"
            name="fileReturnsLastYear"
            rules={[
                {
                  required: true,
                  message: 'Please select an option',
                },
              ]}
          >
            <Radio.Group
              className="vertical-radio-group"
              value={fileReturnsLastYearValue}
              onChange={(e) => handleFileReturnsLastYearChange}
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="File Upload" name="returnDocuments">
            <Upload
              main={"Browse Files"}
              sub={"Drag and drop files here"}
              onFileUpload={(fileList) => form.setFieldsValue({ returnDocuments: fileList })}
              disabled={fileReturnsLastYearValue === 'no'}
            />
          </Form.Item>
    </div>
  )
}

export default Returns
