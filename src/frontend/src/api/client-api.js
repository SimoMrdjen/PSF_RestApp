import fetch from "unfetch";

const checkStatus = (response) => {
  if (response.ok) {
    console.log(response);
    return response;
  }
  // convert non-2xx HTTP responses into errors:
  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
};

export const saveObrazac5 = async (data, kvartal, access_token) => {
  return fetch(`/api/obrazac_zb/${kvartal}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkStatus);
};

export const saveObrazacIO = (data, kvartal, year, access_token) =>
  fetch(`/api/obrazac_io/${kvartal}/${year}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkStatus);

export const saveZakljucni = (data, kvartal, jbbks, year, access_token) =>
  fetch(`/api/zakljucni_list/${kvartal}/${jbbks}/${year}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkStatus);

export const login = (data) =>
  fetch(`/api/v1/auth/authenticate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkStatus);


export const getAllUsers = (access_token) =>
    fetch("api/v1/users",
        {
            headers: {
               Authorization: `Bearer ${access_token}`
            }
        }).then(checkStatus);

export const getUsersLike = (likeUser, access_token) =>
    fetch(`api/v1/users/${likeUser}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }).then(checkStatus);

export const addNewUser = (data, access_token) =>
    fetch(`/api/v1/users`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        },
        method: "POST",
        body: JSON.stringify(data),
    }).then(checkStatus);

export const editUser = (user, access_token) =>
     fetch(`api/v1/users/${user.sifraradnika}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`
            },
            method: 'PUT',
            body: JSON.stringify(user)
            }
         );