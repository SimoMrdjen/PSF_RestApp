import React,{ useState } from 'react'
import { IndividualData } from './IndividualData'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';

function ObrazacIOButton(props) {
    return (

        <button type="submit" className="btn btn-primary"
                style={{ marginTop: 15 + 'px' }}>
            Učitaj ObrazacIO
        </button>
    );
}
export default ObrazacIOButton;