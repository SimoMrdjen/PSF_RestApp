import React,{ useState } from 'react'
import { IndividualData } from './IndividualData'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';

const items = [
  {
    label: '1. kvartal',
    key: '1',
   // icon: <UserOutlined />,
  },
  {
    label: '2. kvartal',
    key: '2',
    //icon: <UserOutlined />,
  },
  {
    label: '3. kvartal',
    key: '3',
   // icon: <UserOutlined />,
//    danger: true,
  },
  {
    label: '4. kvartal',
    key: '4',
   // icon: <UserOutlined />,
//    danger: true,
//    disabled: true,
  },
    {
      label: '5. kvartal',
      key: 5,
     // icon: <UserOutlined />,
//      danger: true,
//      disabled: true,
    },
];
function Data({ setKvartal, kvartal}) {

const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  setKvartal(e.key);
  //message.info(`Izabrali ste ${kvartal} kvartal!`);
  console.log( kvartal, e);
};
const menuProps = {
  items,
  onClick: handleMenuClick,
};
return(
<Space wrap>
    <Dropdown menu={menuProps}>
      <Button size ="large" type="primary">
        <Space>
         {kvartal === 0 ? 'Izaberite kvartal!' : `Izabrali ste kvartal ${kvartal}` }
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </Space>);
}
export default Data;