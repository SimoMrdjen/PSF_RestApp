
 export const handleUpload = async (formData, token, year, kvartal, typeOfObrazac) => {
 console.log("From handleUpload")
         await fetch(`/api/upload/${year}/${kvartal}/${typeOfObrazac}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });
    };