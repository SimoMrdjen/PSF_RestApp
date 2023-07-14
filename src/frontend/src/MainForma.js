import React, { useState } from "react";
import * as XLSX from "xlsx";
import logo from "./APV.png";
import { saveObrazac5 } from "./client";
import { Breadcrumb, Layout, Menu, theme, Image } from "antd";
import Kvartal from "./components/Kvartal";
import ObrazacIO from "./components/ObrazacIO";
import ZakljucniList from "./components/ZakljucniList";
import LoginForm from "./LoginForm";
import Obrazac5 from "./components/Obrazac5";


const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  {
    key: "ZakljucniList",
    label: "ZakljucniList",
  },
  {
    key: "ObrazacIO",
    label: "ObrazacIO",
  },
  {
    key: "Obrazac5",
    label: "Obrazac5",
  },
];

function MainForma({ access_token }) {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [kvartal, setKvartal] = useState(0);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuClick = (item) => {
    setSelectedItem(item.key);
  };

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            theme: "light",
            background: "#666666", // Set the background color to blue
          }}
        >
          <div className="demo-logo" />
          <div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              onClick={handleMenuClick}
            >
              {menuItems.map((item) => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
              ))}
            </Menu>
          </div>

          <div>
            <Image align="center" width={100} src={logo} />
          </div>
        </Header>

        {selectedItem != null && (
          <Content
            className="site-layout"
            style={{
              padding: "0 50px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>PSF</Breadcrumb.Item>
              <Breadcrumb.Item>Ucitavanje</Breadcrumb.Item>
              <Breadcrumb.Item>{selectedItem}</Breadcrumb.Item>
            </Breadcrumb>

            <div
              style={{
                padding: 24,
                minHeight: 380,
                background: colorBgContainer,
              }}
            >
              <div className="container">
                <div className="form">
                  <div style={{ marginTop: "15px" }}>
                    <Kvartal kvartal={kvartal} setKvartal={setKvartal} />
                    <br />
                    <hr />
                  </div>

                  {kvartal !== 0 && (
                    <>
                      {/* obrazacIO */}
                      {selectedItem === "ObrazacIO" && (
                        <ObrazacIO
                          kvartal={kvartal}
                          setKvartal={setKvartal}
                          access_token={access_token}
                        />
                      )}

                      {/* zakljucniList */}
                      {selectedItem === "ZakljucniList" && (
                        <ZakljucniList
                          kvartal={kvartal}
                          setKvartal={setKvartal}
                          access_token={access_token}
                        />
                      )}

                      {/* Obrazac5 */}
                      {selectedItem === "Obrazac5" && (
                        <Obrazac5
                          kvartal={kvartal}
                          setKvartal={setKvartal}
                          access_token={access_token}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Content>
        )}

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <Image width={600} src={logo} />
        </Footer>
      </Layout>
    </>
  );
}

export default MainForma;



