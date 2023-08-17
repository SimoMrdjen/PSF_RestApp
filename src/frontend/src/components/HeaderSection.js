import React from "react";
import { Menu, Image, Layout } from "antd";
import DownloadExcelButton from "./DownloadObrazaca";
const { Header, Content, Footer, Sider } = Layout;
function HeaderSection({ handleMenuClick, handleMenuClickCancel,
                    handleMenuClickStatus, menuItems, logo, handleDownload }) {
    return (
        <Header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#6f6f76", // Set the background color to blue (#0078D4 is the Windows blue color)
            }}
        >
            <div className="demo-logo" />

            <Menu
                theme="dark" // Use dark theme to match the Windows style
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                onClick={handleMenuClick}
                style={{ flexGrow: 1, background: "#6f6f76" }} // Set the menu background to blue
            >
                <Menu.SubMenu title="Učitavanja obrazaca" style={{ background: "#6f6f76" }}>
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
            <Menu
                theme="dark" // Use dark theme to match the Windows style
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                onClick={handleMenuClickStatus}
                style={{ flexGrow: 1, background: "#6f6f76" }} // Set the menu background to blue
            >
                <Menu.SubMenu title="Podizanje statusa" style={{ background: "#6f6f76" }}>
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
                        <Menu
                            theme="dark" // Use dark theme to match the Windows style
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                            onClick={handleMenuClickCancel}
                            style={{ flexGrow: 1, background: "#6f6f76" }} // Set the menu background to blue
                        >
                            <Menu.SubMenu title="Storniranje obrazaca" style={{ background: "#6f6f76" }}>
                                {menuItems.map((item) => (
                                    <Menu.Item key={item.key}>{item.label}</Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        </Menu>

                        <Menu
                            theme="dark" // Use dark theme to match the Windows style
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                            onClick={handleDownload}
                            style={{ flexGrow: 1, background: "#6f6f76" }} // Set the menu background to blue
                        >
                            <Menu.SubMenu title="Preuzimanje obrazaca" style={{ background: "#6f6f76" }}>
                                {menuItems.map((item) => (
                                    <Menu.Item key={item.key}>{item.label}</Menu.Item>
                                ))}
                            </Menu.SubMenu>
                        </Menu>

            <div align="left">
                <DownloadExcelButton />
            </div>

            <div>
                <Image align="center" width={100} src={logo} />
            </div>
        </Header>
    );
}

export default HeaderSection;
