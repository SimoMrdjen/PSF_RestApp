import fetch from "unfetch";
import { errorNotification } from "../components/Notification";

//const checkStatus = (response) => {
//  if (response.ok) {
//    console.log(response);
//    return response;
//  }
//  // convert non-2xx HTTP responses into errors:
//  const error = new Error(response.statusText);
//  error.response = response;
//  return Promise.reject(error);
//};

const checkStatus = async (response) => {
  if (response.ok) {
    console.log("Response from cheCHECK STATUS", response);
    return response; // If you expect JSON as a successful response
  }
  const errorText = await response.text();
  throw new Error(errorText);
};

export const saveZakljucni = (data, kvartal, jbbks, year, access_token) =>
  fetch(`/api/zakljucni_list/${kvartal}/${jbbks}/${year}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkStatus);

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

export const login = (data) =>
  fetch(`/api/v1/auth/authenticate`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkStatus);

export const getAllUsers = (access_token) =>
  fetch("api/v1/users", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(checkStatus);

export const getUsersLike = (likeUser, access_token) =>
  fetch(`api/v1/users/${likeUser}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(checkStatus);

export const addNewUser = (data, access_token) =>
  fetch(`/api/v1/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  }).then(checkStatus);

export const editUser = (user, access_token) =>
  fetch(`api/v1/users/${user.sifraradnika}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "PUT",
    body: JSON.stringify(user),
  });

export const getZakList = (access_token) =>
  fetch(`api/zakljucni_list`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    method: "GET",
  }).then(checkStatus);

export const raiseStatusZakList = (id, access_token) =>
  fetch(`api/zakljucni_list/status/${id}`, {
    headers: {
      //"Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "PUT",
    //body: JSON.stringify(user),
  }).then(checkStatus);

export const stornoZakList = (id, access_token) =>
  fetch(`api/zakljucni_list/storno/${id}`, {
    headers: {
      //"Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    method: "PUT",
    //body: JSON.stringify(user),
  }).then(checkStatus);
