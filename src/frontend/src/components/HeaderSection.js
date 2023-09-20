import React from "react";
import { Menu, Image, Layout } from "antd";
import DownloadExcelButton from "./DownloadObrazaca";
const { Header, Content, Footer, Sider } = Layout;
function HeaderSection({ handleMenuClick, handleMenuClickCancel,
                           handleMenuClickOveravanje,handleMenuClickOdobravanje,
                           menuItems, logo, handleDownload,
                           loggedIn, setLoggedIn }) {

    const smallMenuStyle = {
        background: "#6f6f76",
        marginRight: "10px",
        fontSize: "10px", // Adjust the font size to make it smaller
        padding: "4px 8px", // Adjust the padding to make it smaller
    };

    const logout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);


    }
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

                style={{ flexGrow: 1, background: "#6f6f76" , marginRight: "10px", smallMenuStyle}} // Set the menu background to blue
            >
                <Menu.SubMenu title="Učitavanja obr." style={{ background: "#6f6f76" }}>
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
            <Menu
                theme="dark" // Use dark theme to match the Windows style
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                onClick={handleMenuClickOveravanje}
                style={{ flexGrow: 1, background: "#6f6f76" , marginRight: "10px", smallMenuStyle}} // Set the menu background to blue
            >
                <Menu.SubMenu title="Overavanje" style={{ background: "#6f6f76" }}>
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
            <Menu
                theme="dark" // Use dark theme to match the Windows style
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                onClick={handleMenuClickOdobravanje}
                style={{ flexGrow: 1, background: "#6f6f76" , marginRight: "10px", smallMenuStyle}} // Set the menu background to blue
            >
                <Menu.SubMenu title="Odobravanje" style={{ background: "#6f6f76" }}>
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
                style={{ flexGrow: 1, background: "#6f6f76" , marginRight: "10px", smallMenuStyle}} // Set the menu background to blue
            >
                <Menu.SubMenu title="Storniranje obr." style={{ background: "#6f6f76" }}>
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
                style={{ flexGrow: 1, background: "#6f6f76" , marginRight: "10px", smallMenuStyle}} // Set the menu background to blue
            >
                <Menu.SubMenu title="Preuzimanje" style={{ background: "#6f6f76" }}>
                    {menuItems.map((item) => (
                        <Menu.Item key={item.key}>{item.label}</Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>

            {/* <div align="left">
                <DownloadExcelButton />
            </div>*/}
            <div>
                <Image align="center" width={100} src={logo}
                       style={{ marginRight: "50px" }} // Adding right margin
                />
            </div>
            <button
                type="button"
                className="btn btn-dark"
                style={{
                    marginLeft: "50px",
                    backgroundColor: "#a3a3a8",
                    fontSize: "12px", // Adjust the font size as needed
                    padding: "8px 8px", // Adjust the padding as needed
                }}
                onClick ={logout}
            >
                Odjavi se
            </button>
        </Header>
    );
}

export default HeaderSection;
