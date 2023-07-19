import {Breadcrumb, Image, Input, Layout, Menu, Space} from "antd";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";

const { Search } = Input;
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const LayoutApp = ({fetchUsersLike,renderUsers}) => {
    //const [collapsed, setCollapsed] = useState(true);
    return (
        <>

                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>
                                <Space direction="vertical">
                                    <Search
                                        placeholder="find customer by last name"
                                        allowClear
                                        enterButton="Search"
                                        size="large"
                                        onSearch={fetchUsersLike}
                                    />
                                </Space>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            {renderUsers}
                        </div>

</>
    )
}
export default LayoutApp;