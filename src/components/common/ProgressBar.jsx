import React from 'react';
import { Flex, Progress } from 'antd';
const ProgressBar = () => (
  <Flex gap="small" vertical>
    <Progress strokeColor="#BAB2E7" size="small" percentPosition={{ align: 'end', type: 'outer' }} percent={50} status="active" />
  </Flex>
);
export default ProgressBar;