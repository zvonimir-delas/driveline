import { endpoints } from "./config";
import axios from "axios";

export const getDrivingSessionById = (id) =>
  axios.get(`${endpoints.drivingSession.getById}/${id}`);

export const getDrivingSessionsByStudentId = (id) =>
  axios.get(`${endpoints.drivingSession.getByStudentId}/${id}`);

export const addDrivingSession = ({ dayOfWeek, time }) =>
  axios.post(endpoints.drivingSession.add, { dayOfWeek, time });

export const editDrivingSession = ({ id, dayOfWeek, time }) =>
  axios.post(endpoints.drivingSession.edit, {
    id,
    dayOfWeek,
    time,
  });

export const appointDrivingSession = ({ id, xCoordinate, yCoordinate }) =>
  axios.post(endpoints.drivingSession.appoint, {
    id,
    xCoordinate,
    yCoordinate,
  });

export const finishDrivingSession = ({
  drivingSessionId,
  signature,
  locationLogs,
  rating,
}) => {
  var data = {
    drivingSessionId,
    locationLogs,
    rating};

  var formData = new FormData();
  var imagefile = document.querySelector("#file");
  formData.append("AlphanumerincFormData", JSON.stringify(data));
  formData.append("FileToUpload", signature);
  return axios.post(endpoints.drivingSession.finish, formData);
}

export const cancelDrivingSession = (id) =>
  axios.post(`${endpoints.drivingSession.cancel}/${id}`);

export const deleteDrivingSession = (id) =>
  axios.delete(`${endpoints.drivingSession.delete}/${id}`);
