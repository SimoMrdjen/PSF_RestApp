import React, { useState, useEffect } from "react";
import logo from "./APV.png";
import { Breadcrumb, Layout, Image } from "antd";
import Kvartal from "./components/Kvartal";
import ObrazacIO from "./components/ObrazacIO";
import ZakljucniList from "./components/ZakljucniList";
import Obrazac5 from "./components/Obrazac5";
import DownloadExcelButton from "./components/DownloadObrazaca";
import HeaderSection from "./components/HeaderSection";
import MainContentSection from "./components/MainContentSection";
import { getZakList } from "./api/client-api";
import {
  successNotification,
  errorNotification,
  warningNotification,
} from "./components/Notification";

const { Header, Content, Footer } = Layout;

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

function MainForma({ access_token, role, loggedIn, setLoggedIn}) {
  const [kvartal, setKvartal] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemStatus, setSelectedItemStatus] = useState(null);
  const [selectedItemCancel, setSelectedItemCancel] = useState(null);

  const handleMenuClick = (item) => {
    setSelectedItemStatus(null);
    setSelectedItemCancel(null);
    setSelectedItem(item.key);
  };

  const handleMenuClickStatus = (item) => {
    setSelectedItem(null);
    setSelectedItemCancel(null);
    setSelectedItemStatus(item.key);
    let token = localStorage.getItem("token");
    getZakList(token).catch((error) => {
      errorNotification("Podizanje statusa nije moguće!", error.message);
    });
  };

  const handleMenuClickCancel = (item) => {
    let token = localStorage.getItem("token");
    setSelectedItemStatus(null);
    setSelectedItem(null);
    setSelectedItemCancel(item.key);
    getZakList(token).catch((error) => {
      errorNotification("Storniranje nije moguće!", error.message);
    });
  };


   const handleDownload = async (item) => {
     try {
       const response = await fetch('https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80');

       if (!response.ok) {
         errorNotification('Neuspesno preuzimanje');
         return;
       }
       const blob = await response.blob();
       // Create a URL for the blob
       const blobUrl = URL.createObjectURL(blob);
       // Create a temporary anchor element
       const anchor = document.createElement("a");
       // Set the href attribute to the blob URL
       anchor.href = blobUrl;
       // Set the 'download' attribute to specify the suggested file name
       anchor.download = 'ZamenicemoSlikuSaExcelFile.jpg';
       // Trigger a click event on the anchor element to start the download
       anchor.click();
       // Clean up: remove the temporary anchor element and revoke the blob URL
       anchor.remove();
       URL.revokeObjectURL(blobUrl);
     } catch (error) {
         errorNotification('Neuspesno preuzimanje');
     }
   };


  useEffect(() => {
    console.log(
      "This is izabrani meni from MainForma . Ucitavanje: " +
        selectedItem +
        "\nStatus: " +
        selectedItemStatus +
        "\nCancel: " +
        selectedItemCancel,
    );
  }, [selectedItem, selectedItemStatus, selectedItemCancel]);

  return (
    <>
      <Layout>
        <HeaderSection
          loggedIn = {loggedIn}
          setLoggedIn = {setLoggedIn}
          handleMenuClick={handleMenuClick}
          handleMenuClickStatus={handleMenuClickStatus}
          handleMenuClickCancel={handleMenuClickCancel}
          menuItems={menuItems}
          handleDownload={handleDownload}
          logo={logo}
        />

        <Content className="site-layout" style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>PSF</Breadcrumb.Item>
            <Breadcrumb.Item>
              {selectedItem ? `Ucitavanje` : ""}
              {selectedItemCancel ? `Storniranje` : ""}
              {selectedItemStatus ? `Podizanje statusa` : ""}
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {selectedItem}
              {selectedItemStatus}
              {selectedItemCancel}
            </Breadcrumb.Item>
          </Breadcrumb>

          <MainContentSection
            kvartal={kvartal}
            setKvartal={setKvartal}
            selectedItem={selectedItem}
            selectedItemCancel={selectedItemCancel}
            selectedItemStatus={selectedItemStatus}
            access_token={access_token}
            setSelectedItemCancel={setSelectedItemCancel}
            setSelectedItemStatus={setSelectedItemStatus}
          />
        </Content>

        <Footer style={{ textAlign: "center" }}>
          <Image width={400} src={logo} />
        </Footer>
      </Layout>
    </>
  );
}

export default MainForma;

// import React, { useState, useEffect } from "react";
// import logo from "./APV.png";
// import { Breadcrumb, Layout, Menu, Image } from "antd";
// import Kvartal from "./components/Kvartal";
// import ObrazacIO from "./components/ObrazacIO";
// import ZakljucniList from "./components/ZakljucniList";
// import Obrazac5 from "./components/Obrazac5";
// import DownloadExcelButton from "./components/DownloadObrazaca";
//
//
// const { Header, Content, Footer, Sider } = Layout;
//
// const menuItems = [
//   {
//     key: "ZakljucniList",
//     label: "ZakljucniList",
//   },
//   {
//     key: "ObrazacIO",
//     label: "ObrazacIO",
//   },
//   {
//     key: "Obrazac5",
//     label: "Obrazac5",
//   },
// ];
//
// function MainForma({ access_token, role }) {
//   const [kvartal, setKvartal] = useState(0);
//   const [selectedItem, setSelectedItem] = useState(null);
//
//   const handleMenuClick = (item) => {
//     setSelectedItem(item.key);
//   };
//   useEffect(() => {
//     console.log("This is token from MainForma", access_token);
//     console.log("This is Role from MainForma", role);
//   }, []);
//
//   return (
//     <>
//       <Layout>
//         <Header
//             style={{
//               position: "sticky",
//               top: 0,
//               zIndex: 1,
//               width: "100%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               background: "#6f6f76", // Set the background color to blue (#0078D4 is the Windows blue color)
//             }}
//         >
//           <div className="demo-logo" />
//
//           <Menu
//              theme="dark" // Use dark theme to match the Windows style
//               mode="horizontal"
//               defaultSelectedKeys={["1"]}
//               onClick={handleMenuClick}
//               style={{ flexGrow: 1, background: "#6f6f76" }} // Set the menu background to blue
//           >
//             <Menu.SubMenu title="Učitavanja obrazaca" style={{  background: "#6f6f76" }} >
//               {menuItems.map((item) => (
//                   <Menu.Item key={item.key}>{item.label}</Menu.Item>
//               ))}
//             </Menu.SubMenu>
//
//
//           <div align="left">
//             <DownloadExcelButton />
//           </div>
//           </Menu>
//           <div>
//             <Image align="center" width={100} src={logo} />
//           </div>
//         </Header>
//
//         <Content className="site-layout" style={{ padding: "0 50px" }}>
//           <Breadcrumb style={{ margin: "16px 0" }}>
//             <Breadcrumb.Item>PSF</Breadcrumb.Item>
//             <Breadcrumb.Item>Ucitavanje</Breadcrumb.Item>
//             <Breadcrumb.Item>{selectedItem}</Breadcrumb.Item>
//           </Breadcrumb>
//           {selectedItem ? (
//             <>
//               <div
//                 style={{
//                   padding: 24,
//                   minHeight: 380,
//                   background: "white",
//                 }}
//               >
//                 <div className="container">
//                   <div className="form">
//                     <div style={{ marginTop: "15px" }}>
//                       <Kvartal kvartal={kvartal} setKvartal={setKvartal} />
//                       <br />
//                       <hr />
//                     </div>
//
//                     {kvartal !== 0 && (
//                       <>
//                         {/* obrazacIO */}
//                         {selectedItem === "ObrazacIO" && (
//                           <ObrazacIO
//                             kvartal={kvartal}
//                             setKvartal={setKvartal}
//                             access_token={access_token}
//                           />
//                         )}
//
//                         {/* zakljucniList */}
//                         {selectedItem === "ZakljucniList" && (
//                           <ZakljucniList
//                             kvartal={kvartal}
//                             setKvartal={setKvartal}
//                             access_token={access_token}
//                           />
//                         )}
//
//                         {/* Obrazac5 */}
//                         {selectedItem === "Obrazac5" && (
//                           <Obrazac5
//                             kvartal={kvartal}
//                             setKvartal={setKvartal}
//                             access_token={access_token}
//                           />
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               {/*<Register access_token={access_token} />*/}
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//               <br />
//             </>
//           )}
//         </Content>
//
//         <Footer style={{ textAlign: "center" }}>
//           <Image width={400} src={logo} />
//         </Footer>
//       </Layout>
//     </>
//   );
// }
//
// export default MainForma;
