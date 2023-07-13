import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveZakljucni } from '../client';
import { IndividualData } from './IndividualData';


import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip, message } from 'antd';

function ZakljucniList({ kvartal, setKvartal, access_token }) {
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
      range: 5,
    });

    const filteredData = jsonData.filter((row) => typeof row[0] !== 'undefined');

    const headers = filteredData[0];
    const data = filteredData.slice(1).map((row) => {
      let obj = {};

      headers.slice(0, 8).forEach((header, index) => {
        let value = row[index] ;
        if (typeof value === 'undefined' || value === '' ) {
          value = 0;
        }
        obj[`prop${index + 1}`] = value === null ? 0 : value;
      });
      return obj;
    });

    const jbbk = worksheet['B1']?.v || '';
// // Create a new Date object using the year, month, and day values
    const year = worksheet['E5']?.v || '';
    const month = worksheet['E4']?.v || '';
    const day = worksheet['E3']?.v || '';
    const date = new Date(year, month - 1, day);
    const days = Math.floor((date.getTime() + (12*60*60*1000)) / (24*60*60*1000)) + 25569;

    console.log("JBBK:", jbbk);
    console.log("Datum:", date);

    // data.splice(116,1000);
    console.log("Data:", data);
    saveZakljucni(data, kvartal, days, year,access_token );
    setExcelData(JSON.stringify(data, null, 4));
  } else {
    setExcelData(null);
  }
};

  return (
    <div>
      <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <h5>Izaberi Zakljucni List</h5>
        </label>
        <br></br>
        <input type="file" className="form-control" onChange={handleFile} required></input>
        {excelFileError && (
          <div className="text-danger" style={{ marginTop: 5 + 'px' }}>
            {excelFileError}
          </div>
        )}
        <button type="submit" className="btn btn-primary" style={{ marginTop: 15 + 'px' }}>
          Učitaj Zakljucni List
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

export default ZakljucniList;


