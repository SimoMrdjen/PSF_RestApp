import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveZakljucni } from "../api/client-api";

function ZakljucniList({ kvartal, setKvartal, access_token }) {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("This is token from Zakljucni List", access_token);
  }, []);

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
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 5,
      });

      const filteredData = jsonData.filter(
        (row) => typeof row[0] !== "undefined"
      );

      const headers = filteredData[0];
      const data = filteredData.slice(1).map((row) => {
        let obj = {};

        headers.slice(0, 8).forEach((header, index) => {
          let value = row[index];
          if (typeof value === "undefined" || value === "") {
            value = 0;
          }
          obj[`prop${index + 1}`] = value === null ? 0 : value;
        });
        return obj;
      });

      const year = worksheet["E5"]?.v || "";
      const jbbk = worksheet["B1"]?.v || "";
      console.log("JBBK:", jbbk);

      // data.splice(116,1000);
      console.log("Data:", data);
      saveZakljucni(data, kvartal, jbbk, year, access_token);
      setMessage("Zaključni list je uspesno ucitan!");
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
        <input
          type="file"
          className="form-control"
          onChange={handleFile}
          required
        ></input>
        {excelFileError && (
          <div className="text-danger" style={{ marginTop: 5 + "px" }}>
            {excelFileError}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: 15 + "px" }}
        >
          Učitaj Zakljucni List
        </button>
      </form>
      <div>
        <br></br>
        <hr></hr>
        <h5>{message}</h5>
        {/*} {false &&
                <div className="viewer">
                  {excelData === null && <>Nije izabran nijedan dokument</>}
                  {excelData !== null && (
                    <div className="table">
                      <pre>{excelData}</pre>
                    </div>
                  )}
                </div>
        } */}
      </div>
    </div>
  );
}

export default ZakljucniList;
