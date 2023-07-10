import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveObrazacIO } from '../client';
import { IndividualData } from './IndividualData';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';

function ObrazacIOButton({ kvartal, setKvartal, access_token }) {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        selectedFile.name.endsWith('.xls')
      ) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        console.log(selectedFile.type);
        setExcelFileError('Izabrani dokument nije XLSX ili XLS!');
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
        range: 6,
      });
       const filteredData = jsonData.filter((row) => {
          const firstProperty = row[0];
      return typeof firstProperty !== 'string'
          && typeof firstProperty !== 'undefined';
         });

      const headers = filteredData[0];
      const data = filteredData.slice(1).map((row) => {
        let obj = {};

      headers.slice(0, 7).forEach((header, index) => {
        let value;
        if (index === 3 || index === 4) {
          value = String(row[index]).padStart(4, '0');
        }
        else if (index === 1 ) {
          value = String(row[index]).padStart(3, '0');
        } else {
          value = row[index];
        }
        obj[`prop${index + 1}`] = value;
      });
        return obj;
      });
       const jbbk = worksheet['B3']?.v || '';
       const year = worksheet['D3']?.v || '';

       console.log(jbbk);
       //data.splice(116,1000);
      console.log(data);
      saveObrazacIO(data, kvartal, year, access_token );
      setExcelData(JSON.stringify(data, null, 4));
    } else {
      setExcelData(null);
    }
  };

  return (
    <div>
      <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <h5>Izaberi ObrazacIO</h5>
        </label>
        <br></br>
        <input type="file" className="form-control" onChange={handleFile} required></input>
        {excelFileError && (
          <div className="text-danger" style={{ marginTop: 5 + 'px' }}>
            {excelFileError}
          </div>
        )}
        <button type="submit" className="btn btn-primary" style={{ marginTop: 15 + 'px' }}>
          Učitaj ObrazacIO
        </button>
      </form>
      <div>
        <br></br>
        <hr></hr>
        <h5>Pregled ObrazacIO</h5>
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
  );
}

export default ObrazacIOButton;


