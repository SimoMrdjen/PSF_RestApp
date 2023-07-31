import React, {useState} from "react";
import * as XLSX from "xlsx";
import logo from "./APV.png";
import {saveObrazac5} from "./client";
import {Breadcrumb, Layout, Menu, theme, Image} from "antd";
import Data from "./components/Data";
import ObrazacIOButton from "./components/ObrazacIOButton";
import ZakljucniList from "./components/ZakljucniList";
import LoginForm from "./LoginForm";

const {Header, Content, Footer, Sider} = Layout;

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

function App1({access_token}) {
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [kvartal, setKvartal] = useState(0);
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleMenuClick = (item) => {
        setSelectedItem(item.key);
    };

    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (
                selectedFile.type ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                selectedFile.name.endsWith(".xls")
            ) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                };
            } else {
                console.log(selectedFile.type);
                setExcelFileError("Izabrani dokument nije XLSX ili XLS!");
                setExcelFile(null);
            }
        } else {
            console.log("Plz select your file");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, {type: "buffer"});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                range: 24,
            });

            const filteredData = jsonData.filter((row) => {
                const firstProperty = row[0];
                const secondProperty = row[1];
                const fourthProperty = row[3];
                const fifthProperty = row[4];
                const tenthProperty = row[9];

                return (
                    typeof firstProperty !== "string" &&
                    typeof firstProperty !== "undefined" &&
                    typeof secondProperty !== "string" &&
                    typeof secondProperty !== "undefined" &&
                    typeof fourthProperty !== "string" &&
                    typeof tenthProperty !== "string" &&
                    fifthProperty !== 0.0
                );
            });

            const headers = filteredData[0];
            const data = filteredData.slice(1).map((row) => {
                let obj = {};
                headers.forEach((header, index) => {
                    obj["prop" + header] = row[index];
                });
                return obj;
            });
            // data.splice(442,1);
            console.log(data);
            saveObrazac5(data, kvartal, access_token);
            setExcelData(JSON.stringify(data, null, 4));
        } else {
            setExcelData(null);
        }
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
                    <div className="demo-logo"/>
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
                        <Image align="center" width={100} src={logo}/>
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
                                    <div style={{marginTop: "15px"}}>
                                        <Data kvartal={kvartal} setKvartal={setKvartal}/>
                                        <br/>
                                        <hr/>
                                    </div>

                                    {kvartal != 0 && (
                                        <>
                                            <div>
                                                {/* obrazacIO */}
                                                {selectedItem === "ObrazacIO" && (
                                                    <ObrazacIOButton
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

                                                {/* obrazac5 */}
                                                {selectedItem === "Obrazac5" && (
                                                    <form
                                                        className="form-group"
                                                        autoComplete="off"
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <label>
                                                            <h5>Izaberi {selectedItem}</h5>
                                                        </label>
                                                        <br/>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            onChange={handleFile}
                                                            required
                                                        />
                                                        {excelFileError && (
                                                            <div
                                                                className="text-danger"
                                                                style={{marginTop: "5px"}}
                                                            >
                                                                {excelFileError}
                                                            </div>
                                                        )}
                                                        {true && (
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary"
                                                                style={{marginTop: "15px"}}
                                                            >
                                                                Učitaj Obrazac5
                                                            </button>
                                                        )}
                                                    </form>
                                                )}
                                                {/* obrazac5 */}
                                            </div>
                                            <div>
                                                <br/>
                                                <hr/>
                                                <h3>Uspešno ste učitali obrazac 5 !</h3>
                                            </div>

                                            {selectedItem === "Obrazac5" && false && (
                                                <div>
                                                    <br/>
                                                    <hr/>
                                                    <h5>Pregled {selectedItem}</h5>
                                                    <div className="viewer">
                                                        {excelData === null && (
                                                            <>Nije izabran nijedan dokument</>
                                                        )}
                                                        {excelData !== null && (
                                                            <div className="table">
                                                                <pre>{excelData}</pre>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
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
                    <Image width={600} src={logo}/>
                </Footer>
            </Layout>
        </>
    );
}

export default App1;
