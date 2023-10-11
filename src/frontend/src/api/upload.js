import { API_BASE_URL } from "../config";

export const handleUpload = async (formData, token, year, kvartal, typeOfObrazac, txtOrExcel) => {
 console.log("From handleUpload")
         await fetch(`${API_BASE_URL}/upload/${txtOrExcel}/${year}/${kvartal}/${typeOfObrazac}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
    };

 export const handleUploadTxt =  async (data, token, year, kvartal, typeOfObrazac, txtOrExcel) => {
    await fetch(`${API_BASE_URL}/upload/${txtOrExcel}/${year}/${kvartal}/${typeOfObrazac}`, {
         method: 'POST',
         headers: {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
     });
 };

 export const saveTxtFile = (message, token, year, excelKvartal, selectedItem) => {
     const txtObject = {text: message};
     handleUploadTxt(txtObject, token, year, excelKvartal, selectedItem, "txt")
 }

export const downloadFileFromServer  =  async ( token) => {
    const response = await fetch(`${API_BASE_URL}/upload/download`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response;
};