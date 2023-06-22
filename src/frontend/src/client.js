import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
    console.log(response);
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response
    return Promise.reject(error);
}

export const saveObrazac5 = (data, kvartal) =>
    fetch(`/api/obrazac_zb/${kvartal}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(data)
    }).then(checkStatus);

export const saveObrazacIO = (data, kvartal, year) =>
  fetch(`/api/obrazac_io/${kvartal}/${year}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  }).then(checkStatus);
