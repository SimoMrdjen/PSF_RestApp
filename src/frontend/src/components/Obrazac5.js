import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveObrazac5 } from "../api/client-api";
import {errorNotification, successNotification} from "./Notification";

function Obrazac5({ kvartal, setKvartal, access_token }) {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [message, setMessage] = useState("");

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
      try{
          if (false) {
            throw new Error("proba error.");
          }
          let token = localStorage.getItem("token");
      saveObrazac5(data, kvartal, token)
          .then((res) => {
            console.log(res);
            successNotification("Obrazac je uspesno ucitan!");
          })
          .catch((error) => {
            console.log("This is error message", error.message);
            errorNotification(error.message);
          });
      } catch (error) {
              errorNotification(error.message);
}
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
          Učitaj Obrazac5
        </button>
      </form>
      <div>
        <br></br>
        <hr></hr>
        <h3>{message}</h3>
        {/* { false &&
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

export default Obrazac5;
