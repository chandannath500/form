import React, { useState } from 'react';
import { Modal, Form, Input, Radio, Button, List } from 'antd';
import Upload from './Upload';
import VerticalRadioGroup from './Radio';


const FormPage = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [form] = Form.useForm();
  const [submittedForms, setSubmittedForms] = useState([]);

  const showModal = () => {
    setFormVisible(true);
  };

  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      setSubmittedForms([...submittedForms, values]);
      form.resetFields();
      setFormVisible(false);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Submitted Forms</h1>
      <List
        dataSource={submittedForms}
        renderItem={(item, index) => (
          <List.Item key={index}>{JSON.stringify(item)}</List.Item>
        )}
      />

      <Button type="primary" onClick={showModal}>
        Create Form
      </Button>

      <Modal
        visible={formVisible}
        onCancel={() => setFormVisible(false)}
        onOk={handleFormSubmit}
        title="Create Form"
        width={800}
        bodyStyle={{ padding: '20px' }}
      >
       <Form.Item label="Email" name="email" rules={[{ required: true }]}>
  <Input className="generic-input-style" />
</Form.Item>

<Form.Item
  label="Did you file the returns last year?"
  name="fileReturnsLastYear"
  rules={[{ required: true }]}
><br/><br/>
  <VerticalRadioGroup/>
</Form.Item>
<Form.Item
  label="File Upload"
  name="fileReturnsLastYear"
  rules={[{ required: true }]}
><br/><br/>
<Upload/>
</Form.Item>

      </Modal>
    </div>
  );
};

export default FormPage;
