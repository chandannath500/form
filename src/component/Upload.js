import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

const App = ({ main, sub, onFileUpload }) => {
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      message.success(`${file.name} file uploaded successfully.`);
    } else if (file.status === 'error') {
      message.error(`${file.name} file upload failed.`);
    }

    const updatedFileList = fileList.map((f) => {
      if (f.status === 'done') {
        return {
          ...f,
          filename: f.name, // Add filename property
        };
      }
      return f;
    });

    setFileList(updatedFileList);
    onFileUpload(updatedFileList);
  };

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    fileList,
    onChange: handleFileChange,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{main}</p>
      <p className="ant-upload-hint">{sub}</p>
    </Dragger>
  );
};

export default App;
