import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Radio, Table } from 'antd';
import Upload from './Upload';
import { Checkbox } from 'antd';
import logo from './logo.jpg'; 

const FormPage = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [form] = Form.useForm();
  const [submittedForms, setSubmittedForms] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [showCombinedData, setShowCombinedData] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [applyEasyTax, setApplyEasyTax] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fileReturnsLastYearValue, setFileReturnsLastYearValue] = useState('');
  const [incorporated2022Value, setIncorporated2022Value] = useState('');
  const [ownershipChange2022Value, setOwnershipChange2022Value] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('submittedForms');
    if (savedData) {
      setSubmittedForms(JSON.parse(savedData));
    }
  }, []);

  const showModal = () => {
    setFormVisible(true);
  };

  const handleFormSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      const formattedFormValues = {
        email: formValues.email,
        fileReturnsLastYear: formValues.fileReturnsLastYear,
        incorporated2022: formValues.incorporated2022,
        ownershipChange2022: formValues.ownershipChange2022,
        transaction: formValues.transaction || [],
        transactionDocs: form.getFieldValue('transactionDocs') || [],
        multiType: formValues.multiType || [],
        multiDocs: form.getFieldValue('multiDocs') || [],
        returnDocuments: form.getFieldValue('returnDocuments') || [],
        incorporationDocuments: form.getFieldValue('incorporationDocuments') || [],
        shareholdingPattern: form.getFieldValue('shareholdingPattern') || [],
      };

      const updatedCombinedData = [...combinedData, formattedFormValues];
      setCombinedData(updatedCombinedData);
      setSubmittedForms([...submittedForms, formattedFormValues]);

      localStorage.setItem('submittedForms', JSON.stringify([...submittedForms, formattedFormValues]));

      form.resetFields();
      setFormVisible(false);
      setShowCombinedData(true);
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
    }
  };

  const handleEasyTaxCheckbox = (e) => {
    setApplyEasyTax(e.target.checked);
    setTotalAmount(e.target.checked ? 349 : 0);
  };

  const handleCouponApply = () => {
    setTotalAmount(0);
  };

  const handleCancel = () => {
    form.resetFields();
    setFormVisible(false);
    setShowCombinedData(false);
  };

  const handleFileReturnsLastYearChange = (value) => {
    setFileReturnsLastYearValue(value);
  };

  const handleIncorporated2022Change = (value) => {
    setIncorporated2022Value(value);
  };

  const handleOwnershipChange2022Change = (value) => {
    setOwnershipChange2022Value(value);
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'File Returns Last Year',
      dataIndex: 'fileReturnsLastYear',
      key: 'fileReturnsLastYear',
      render: (value) => <span>{value ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Return Documents',
      dataIndex: 'returnDocuments',
      key: 'returnDocuments',
      render: (docs) => (
        <ul>
          {docs.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Was the S-Corp incorporated in 2022?',
      dataIndex: 'incorporated2022',
      key: 'incorporated2022',
      render: (value) => <span>{value ? 'Yes' : 'No'}</span>,
    },
    
    {
      title: 'Incorporation Documents',
      dataIndex: 'incorporationDocuments',
      key: 'incorporationDocuments',
      render: (docs) => (
        <ul>
          {docs.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Change in Ownership Structure in 2022',
      dataIndex: 'ownershipChange2022',
      key: 'ownershipChange2022',
      render: (value) => <span>{value ? 'Yes' : 'No'}</span>,
    },    
    {
      title: 'Shareholding Pattern',
      dataIndex: 'shareholdingPattern',
      key: 'shareholdingPattern',
      render: (docs) => (
        <ul>
          {docs.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transaction',
      key: 'transaction',
      render: (transaction) => (
        <span>{transaction.join(', ')}</span>
      ), // Join the array of transactions into a string
    },
    {
      title: 'Transaction Docs',
      dataIndex: 'transactionDocs',
      key: 'transactionDocs',
      render: (docs) => (
        <ul>
          {docs.map((doc, index) => (
            <li key={index}>{doc.name}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Multi Type',
      dataIndex: 'multiType',
      key: 'multiType',
      render: (multiType) => (
        <span>{multiType.join(', ')}</span>
      ),
    },
    {
      title: 'Multi Docs',
      dataIndex: 'multiDocs',
      key: 'multiDocs',
      render: (docs) => (
        <ul>
          {docs.map((doc, index) => (
            <li key={index}>{doc.filename}</li>
          ))}
        </ul>
      ),
    },    
  ];
  

  return (
    <div style={{ padding: '20px' }}>
      <h1>Submitted Forms</h1>
      {showCombinedData ? (
      <div>
        <Button type="primary" onClick={showModal}>
          Create Another Form
        </Button>
        <Table columns={columns} dataSource={combinedData} />
      </div>
    ) : (
      <Button type="primary" onClick={showModal}>
        Create Form
      </Button>
    )}

      <Modal
        visible={formVisible}
        onCancel={handleCancel}
        title="Create Form"
        width={800}
        bodyStyle={{ padding: '20px' }}
        footer={[
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} initialValues={{ transactionDocs: [],
    fileReturnsLastYear: fileReturnsLastYearValue,
    incorporated2022: incorporated2022Value,
    ownershipChange2022: ownershipChange2022Value,
    shareholdingPattern: [], }}>          
          <Form.Item label="Email" name="email" rules={[
            {   message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ]}>
            <Input className="generic-input-style" />
          </Form.Item>
          <Form.Item
            label="Did you file the returns last year?"
            name="fileReturnsLastYear"
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

          <Form.Item
            label="Was the S-Corp incorporated in 2022?"
            name="incorporated2022"
          >
            <Radio.Group
              className="vertical-radio-group"
              value={incorporated2022Value}
              onChange={(e) => handleIncorporated2022Change}
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
    disabled={fileReturnsLastYearValue === 'no'}
  />
</Form.Item>

          <Form.Item
            label="Was there any change in Ownership Structure in 2022?"
            name="ownershipChange2022"
          >
            <Radio.Group className="vertical-radio-group"  value={ownershipChange2022Value}
            onChange={(e) => handleOwnershipChange2022Change}
            >
      <Radio value="yes">Yes</Radio>
      <Radio value="no">No</Radio>
    </Radio.Group>
          </Form.Item>

          <Form.Item label="Upload latest Shareholding pattern" name="shareholdingPattern">
  <Upload
    main={"Browse Files"}
    sub={"Drag and drop files here"}
    onFileUpload={(fileList) => form.setFieldsValue({ shareholdingPattern: fileList })}
    disabled={fileReturnsLastYearValue === 'no'}
  />
</Form.Item>

          <Form.Item
  label="Was there any following transaction in 2022?"
  name="transaction"
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
<Form.Item label="Upload documents for the same" name="transactionDocs">
  <Upload
    main={"Browse Files"}
    sub={"Drag and drop files here"}
    onFileUpload={(fileList) => form.setFieldsValue({ transactionDocs: fileList })}
  />
</Form.Item>



<Form.Item
  label="Please upload the following documents"
  name="multiType"
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
<Form.Item label="Upload documents for the same" name="multiDocs">
  <Upload
    main={"Browse Files"}
    sub={"Drag and drop files here"}
    onFileUpload={(fileList) => form.setFieldsValue({ multiDocs: fileList })}
  />
</Form.Item>

            <span>Please complete the payment. We will prepare the draft tax return within 48 hours!</span>
            <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '20px' }}>
            <Checkbox onChange={handleEasyTaxCheckbox} style={{ border: '1px solid black', borderRadius:0 }}></Checkbox>
              <img src={logo} alt="EasyTax Logo" style={{ width: '40px', height: '50px', marginRight: '10px', marginTop: '-10px',marginLeft: '10px' }} />
              <h2 style={{ margin: 0 }}>EasyTaxes</h2>
              <span style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 'auto' }}>
                ${applyEasyTax ? '349.00' : '0.00'}
              </span>
            </div>
          </div>
          <hr/>
          <br/>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <div>
            <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon Code"
                style={{ marginRight: '5px', marginBottom: 0, height: '30px' }}
              />
              <Button type="primary" onClick={handleCouponApply} style={{ height: '32px' }}>
                Apply
              </Button>
            </div>
            <span style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 'auto' }}> Total ${totalAmount.toFixed(2)} </span>
            <div>
              <hr />
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FormPage;
