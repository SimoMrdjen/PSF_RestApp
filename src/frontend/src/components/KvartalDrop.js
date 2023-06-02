import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';

const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};
const handleMenuClick = (e) => {
  //setKvartal(e);
  message.info('Odaberite kvartal!');
  console.log('click', e);
};
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
      key: '5',
     // icon: <UserOutlined />,
//      danger: true,
//      disabled: true,
    },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const KvartalDrop = ({kvartal, setKvartal}) => (
  <Space wrap>
    <Dropdown menu={menuProps}>
      <Button size ="large" type="primary">
        <Space>
         Izaberite kvartal
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  </Space>
);
export default KvartalDrop;