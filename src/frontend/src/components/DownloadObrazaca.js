import React, { useEffect } from "react";
import BOOKPdf from '../BOOK.pdf';
import ZakljucniListxlsx from '../ZakljucniList.xlsx';

function DownloadExcelButton() {

        return (
            <div>
                <a
                    href={ZakljucniListxlsx}
                    download="ZakljucniList-xlsx-document"
                    target="_blank"
                    rel="noreferrer"
                >
                    <button
                        type="button"
                        className="btn btn-dark"
                        style={{
                            backgroundColor: "#a3a3a8",
                            fontSize: "12px", // Adjust the font size as needed
                            padding: "8px 15px", // Adjust the padding as needed
                        }}
                    >
                        Preuzmi Zakljucni List
                    </button>

                </a>
            </div>
        );
    //
    //This is component for download , too...
    // import React from "react";
    //
    // const DownloadExcelFile = () => {
    //     const handleDownload = () => {
    //         // Replace 'your-server-url' with the actual URL of the Excel file on the server
    //         const fileUrl = "https://your-server-url/path/to/excel-file.xlsx";
    //         const link = document.createElement("a");
    //         link.href = fileUrl;
    //         link.setAttribute("download", "excel-file.xlsx"); // Change the filename as needed
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     };
    //
    //     return (
    //         <button
    //             type="button"
    //             className="btn btn-primary"
    //             onClick={handleDownload}
    //         >
    //             Download Excel File
    //         </button>
    //     );
    // };
    //
    // export default DownloadExcelFile;


}

export default DownloadExcelButton;
