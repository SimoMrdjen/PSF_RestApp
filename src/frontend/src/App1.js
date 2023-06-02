import React, { useState } from 'react';
import * as XLSX from 'xlsx'
import logo from './APV.png';
import { saveObrazac5} from "./client";
import { Breadcrumb, Layout, Menu, theme , Image} from 'antd';
import KvartalDrop from './components/KvartalDrop';
import Data from './components/Data';

const {Header, Content, Footer, Sider} = Layout;


function App1() {
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [excelData, setExcelData] = useState(null);
 const [kvartal, setKvartal] = useState(0);
    const {token: { colorBgContainer },} = theme.useToken();
//    const obj = [ {
//                         "prop1": 5176,
//                         "prop2": 411100,
//                         "prop3": "Плате, додаци и накнаде запослених",
//                         "prop4": 90127786.2,
//                         "prop5": 14534475.65,
//                         "prop7": 14534475.65,
//                         "propDuz": 4
//                     },
//                     {
//                         "prop1": 5177,
//                         "prop2": 412500,
//                         "prop3": "СОЦИЈАЛНИ ДОПРИНОСИ НА ТЕРЕТ ПОСЛОДАВЦА (од 5178 до 5180)",
//                         "prop4": 13654359.61,
//                         "prop5": 2201973.14,
//                         "prop6": 0,
//                         "prop7": 2201973.14,
//                         "prop8": 0,
//                         "prop9": 0,
//                         "prop10": 0,
//                         "prop11": 0,
//                         "propDuz": 0
//                     }];

    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (
                selectedFile &&
                selectedFile.type === 'application/vnd.ms-excel'
            ) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                };
            } else {
            console.log(selectedFile.type);
                setExcelFileError('Izabrani dokument nije MS Excel!');
                setExcelFile(null);
            }
        } else {
            console.log('Plz select your file');
        }
    };

const handleSubmit = (e) => {
  e.preventDefault();
  if (excelFile !== null) {
    const workbook = XLSX.read(excelFile, { type: 'buffer' });
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
      const tenthProperty = row[9];

      return typeof firstProperty !== 'string'
          && typeof firstProperty !== 'undefined'
          && typeof secondProperty !== 'string'
          && typeof secondProperty !== 'undefined'
          && typeof fourthProperty !== 'string'
          && typeof tenthProperty !== 'string';
    });

    const headers = filteredData[0];
    const data = filteredData.slice(1).map((row) => {
      let obj = {};
      headers.forEach((header, index) => {
        obj['prop' + header] = row[index];
      });
      return obj;
    });
       data.splice(442,1);
//      data.splice(0,3);
//       data.splice(10,436);
      // data.splice(278,282);
      console.log(data);
     saveObrazac5(data, kvartal);

   console.log(data);
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
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
            justifyContent: 'space-between',
            theme: 'light',
            background: '#666666' // Set the background color to blue
        }}
      >
        <div className="demo-logo" />
          <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
          </div>
          <div>
              <Image align="center" width={100} src={logo} />
          </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>PSF</Breadcrumb.Item>
          <Breadcrumb.Item>Ucitavanje</Breadcrumb.Item>
          <Breadcrumb.Item>Obrazac 5</Breadcrumb.Item>
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

             <div style={{ marginTop: 15 + 'px' }}>
              < Data
             kvartal = {kvartal}
             setKvartal ={setKvartal}
              />
                           <br></br>
                           <hr></hr>
             </div>


                 <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
                     <label>
                         <h5>Izaberi Obrazac5</h5>
                     </label>
                     <br></br>
                     <input type="file" className="form-control" onChange={handleFile} required></input>
                     {excelFileError && (
                         <div className="text-danger" style={{ marginTop: 5 + 'px' }}>
                             {excelFileError}
                         </div>
                     )}
                     <button type="submit" className="btn btn-primary"
                             style={{ marginTop: 15 + 'px' }}>
                         Učitaj Obrazac5
                     </button>
                 </form>
             </div>

             <br></br>
             <hr></hr>

             <h5>Pregled Obrasca5</h5>
             <div className="viewer">
                 {excelData === null && <>Nije izabran nijedan dokument</>}
                 {excelData !== null && (
                     <div className="table">
                         <pre>{excelData}</pre>
                     </div>
                 )}
             </div>

         </div>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
           <Image
               width={600}
                //src="https://spriv.vojvodina.gov.rs/wp-content/uploads/2021/11/background-02.png"
               src={logo}
          />
      </Footer>
    </Layout>
        </>

    );
}

export default App1;
