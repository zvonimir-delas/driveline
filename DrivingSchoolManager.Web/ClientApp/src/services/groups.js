import { endpoints } from "./config";
import axios from "axios";

export const getGroupById = (id) => axios.get(`${endpoints.groups.base}/${id}`);

export const getGroupsByDrivingSchoolId = (id, limit, offset = 0) =>
  axios.get(
    `${endpoints.groups.base}/driving-school-id/${id}?limit=${limit}&offset=${offset}`
  );

export const addGroup = ({ name }) =>
  axios.post(`${endpoints.groups.base}`, { name });

export const editGroup = ({ id, name }) =>
  axios.put(`${endpoints.groups.base}`, { id, name });

export const deleteGroup = (id) =>
  axios.delete(`${endpoints.groups.base}/${id}`);
