import React, { useState } from 'react';
import * as XLSX from 'xlsx'

function App1() {
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [excelData, setExcelData] = useState(null);

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

//    const handleSubmit = (e) => {
//        e.preventDefault();
//        if (excelFile !== null) {
//            const workbook = XLSX.read(excelFile, { type: 'buffer' });
//            const worksheetName = workbook.SheetNames[0];
//            const worksheet = workbook.Sheets[worksheetName];
//            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
//                header: 1,
//                range: 24,
//            });
//            const headers = jsonData[0];
//            const data = jsonData.slice(1).map((row) => {
//                let obj = {};
//                headers.forEach((header, index) => {
//                    obj['_' + header] = row[index];
//                });
//                return obj;
//            });
//            const filteredData = data.filter((obj) => Object.values(obj).some((value) => value !==  undefined));
//            //filteredData.splice(1,10);
//            const finalData = filteredData.filter((row) => {
//                  const firstProperty = row[0];
//                  return typeof firstProperty !== 'string';
//                });
//            console.log(JSON.stringify(finalData));
//            setExcelData(JSON.stringify(finalData, null, 4));
//        } else {
//            setExcelData(null);
//        }
//    };
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
      const fourthProperty = row[3];
      const tenthProperty = row[9];

      return typeof firstProperty !== 'string'
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
    data.splice(-1,-5);

    setExcelData(JSON.stringify(data, null, 4));
  } else {
    setExcelData(null);
  }
};


    return (
        <div className="container">
            <div className="form">
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
                    <button type="submit" className="btn btn-success" style={{ marginTop: 5 + 'px' }}>
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
    );
}

export default App1;
