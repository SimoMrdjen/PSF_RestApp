
 export const handleUpload = async (formData, token, year, kvartal, typeOfObrazac, txtOrExcel) => {
 console.log("From handleUpload")
         await fetch(`/api/upload/${txtOrExcel}/${year}/${kvartal}/${typeOfObrazac}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
    };

 export const handleUploadTxt =  async (data, token, year, kvartal, typeOfObrazac, txtOrExcel) => {
     console.log("From handleUpload")
    await  fetch(`/api/upload/${txtOrExcel}/${year}/${kvartal}/${typeOfObrazac}`, {
         method: 'POST',
         headers: {
             'Authorization': `Bearer ${token}`,
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
     });
 };