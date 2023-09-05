import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveZakljucni } from "../api/client-api";
import {
  successNotification,
  errorNotification,
  warningNotification,
} from "./Notification";
import { handleUpload , handleUploadTxt} from "../api/upload";

function ZakljucniList({
  kvartal,
  setKvartal,
  access_token,
  selectedItem,
  setSelectedItem,
}) {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [message, setMessage] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [excelFileUpload, setExcelFileUpload] = useState(null);

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
          setActiveButton(true);
          setExcelFileUpload(selectedFile);
        };
      } else {
        setExcelFileError("Izabrani dokument nije XLSX ili XLS!");
        setExcelFile(null);
      }
    } else {
    }
    setActiveButton(true);
  };

  const handleSubmit = (e) => {
    setMessage("");
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

      const year = worksheet["E4"]?.v || "";
      const jbbks = worksheet["B3"]?.v || "";
      const excelKvartal = worksheet["B4"]?.v || "";

      if (excelKvartal != kvartal) {
        errorNotification(
          "Izabrani kvartal se razlikuje od kvartala sa excel fajla!"
        );
        setExcelData(null);
        setKvartal(0);
        setSelectedItem(null);
        return;
      }
      let token = localStorage.getItem("token");

      const formData = new FormData();
      if (excelFileUpload) {
        formData.append('file', excelFileUpload);
        handleUpload(formData, token, year, excelKvartal, selectedItem, "excel");
      }
      let txtMessagge = "";

      saveZakljucni(data, kvartal, jbbks, year, token)
        .then((response) => {
          console.log(response);
          return response.text(); // Get the text content from the response
        })
        .then((text) => {
          // console.log(res);
          if (text === "") {
            successNotification("Obrazac je uspesno ucitan!");
            const txtObject = {text: "Obrazac je uspesno ucitan!"};
            handleUploadTxt(txtObject, token, year, excelKvartal, selectedItem, "txt");
          } else {
            console.log("responseText:", text);
            warningNotification(
              text,
              "Obrazac je učitan ali postoje greške. \n "
            );
            txtMessagge = "Obrazac je učitan ali postoje greške. \n " + text;
            const txtObject = {text: txtMessagge};
            handleUploadTxt(txtObject, token, year, excelKvartal, selectedItem, "txt");
          }
          // Handle successful response if needed
        })
        .catch((error) => {
          errorNotification("Neuspešno učitavanje!", error.message);
          txtMessagge = "Neuspešno učitavanje!\n" +  error.message;
          const txtObject = {text: txtMessagge};
          handleUploadTxt(txtObject, token, year, excelKvartal, selectedItem, "txt");
          setKvartal(0);
        });
    } else {
      setExcelData(null);
    }
    setKvartal(0);
    setSelectedItem(null);
  };

  return (
    <div>
      <form className="form-group" autoComplete="off" onSubmit={handleSubmit}>
        <label>
          <h5>Izaberi Zakljucni List</h5>
        </label>
        <br></br>
        <input
          disabled={kvartal === 0}
          type="file"
          className="form-control"
          onChange={handleFile}
          lang="sr"
          placeholder="Unesite tekst"
          required
        ></input>
        {excelFileError && (
          <div className="text-danger" style={{ marginTop: 5 + "px" }}>
            {excelFileError}
          </div>
        )}
        <br />

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: 15 + "px" }}
          disabled={!activeButton || kvartal === 0}
          style={{ backgroundColor: "#98b4d4" }}
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
