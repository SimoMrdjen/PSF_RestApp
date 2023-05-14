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
                selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                };
            } else {
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
                range: 23,
            });
            const headers = jsonData[0];
            const data = jsonData.slice(1).map((row) => {
                let obj = {};
                headers.forEach((header, index) => {
                    obj['_' + header] = row[index];
                });
                return obj;
            });
            const filteredData = data.filter((obj) => Object.values(obj).some((value) => value !==  undefined));
            console.log(JSON.stringify(filteredData));
            setExcelData(JSON.stringify(filteredData, null, 4));
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
