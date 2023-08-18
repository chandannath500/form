import React from 'react';
import { Radio } from 'antd';

const VerticalRadioGroup = () => {
  return (
    <Radio.Group className="vertical-radio-group">
      <Radio value="yes">Yes</Radio>
      <Radio value="no">No</Radio>
    </Radio.Group>
  );
};

export default VerticalRadioGroup;
