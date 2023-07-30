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
            <Content className="site-layout" style={{ padding: "0 50px" }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                    {/* Render the Users component */}
                    {renderUsers()}
                </div>
            </Content>

</>
    )
}
export default LayoutApp;