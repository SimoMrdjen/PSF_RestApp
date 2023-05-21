import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const saveObrazac5 = data =>
    fetch("/api/obrazac5", {
        headers: {
            'Content-Type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(data)
    }).then(checkStatus);