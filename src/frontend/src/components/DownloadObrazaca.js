import React, { useEffect } from "react";
import BOOKPdf from '../BOOK.pdf';

function DownloadExcelButton() {
  // useEffect(() => {
  //     const fileUrl = "https://docs.google.com/spreadsheets/d/1K-_0nBQ0GJXT4lZz6MQBJM0C8bEod4B_2Dbs8HwKBms/edit?usp=drive_link";
  //
  //     fetch(fileUrl)
  //         .then((response) => response.blob())
  //         .then((blob) => {
  //             // Create a download link
  //             const link = document.createElement("a");
  //             link.href = URL.createObjectURL(blob);
  //             link.download = "UgovorOpen.xlsx";
  //
  //             // Append the link to the body
  //             document.body.appendChild(link);
  //
  //             // Simulate a click event to trigger the download
  //             link.click();
  //
  //             // Clean up the link
  //             link.remove();
  //         });
  // }, []);
  //
  // return (
  //   <button type="button" className="btn btn-dark">
  //     Preuzmi Zakljucni List
  //   </button>
  // );
    // 👇️ import the pdf document



        return (
            <div>
                <a
                    href={BOOKPdf}
                    download="BOOK-PDF-document"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button type="button" className="btn btn-dark" style={{ backgroundColor: "#0078D4" }}>
                        Preuzmi Zakljucni List
                    </button>

                </a>
            </div>
        );




}

export default DownloadExcelButton;
