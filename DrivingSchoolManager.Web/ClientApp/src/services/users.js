import { endpoints } from "./config";
import axios from "axios";

export const getUser = () => axios.get(endpoints.users.getByToken);

export const getUserById = (userId) =>
  axios.get(`${endpoints.users.getById}/${userId}`);

export const getUsers = (userRoleAsInt = -1, limit = 10, offset = 0) =>
  axios.get(
    `${endpoints.users.getByRole}/${userRoleAsInt}?limit=${limit}&offset=${offset}`
  );

export const addUser = ({
  firstName,
  lastName,
  oib,
  email,
  phoneNumber,
  category,
  vehicle,
  role,
  instructorId,
  groupId,
}) => {
  var data = {
    firstName,
    lastName,
    oib,
    email,
    phoneNumber,
    category,
    vehicle,
    role,
    instructorId,
    groupId,
  };
  var formData = new FormData();
  var imagefile = document.querySelector("#file");
  formData.append("AlphanumerincFormData", JSON.stringify(data));
  formData.append("FileToUpload", imagefile.files[0]);
  return axios.post(endpoints.users.add, formData);
};

export const editUser = ({
  id,
  firstName,
  lastName,
  oib,
  email,
  phoneNumber,
  vehicle,
  instructorId,
  groupId,
}) => {
  var data = {
    id,
    firstName,
    lastName,
    oib,
    email,
    phoneNumber,
    vehicle,
    instructorId,
    groupId,
  };
  var formData = new FormData();
  var imagefile = document.querySelector("#file");
  formData.append("AlphanumerincFormData", JSON.stringify(data));
  formData.append("FileToUpload", imagefile.files[0]);
  console.log(data);
  return axios.post(endpoints.users.edit, formData);
};

export const deleteUser = (userId) =>
  axios.delete(`${endpoints.users.delete}/${userId.id}`);

export const getInstructorUsers = () =>
  axios.get(endpoints.users.getInstructorUsers);

export const getInstructorSchedule = (instructorId) =>
  axios.get(`${endpoints.users.getInstructorSchedule}/${instructorId}`);

export const getAppointedDrivingSessions = (studentId) =>
  axios.get(`${endpoints.users.getAppointedDrivingSessions}/${studentId}`);

export const getUserEvents = () => axios.get(endpoints.events.getUserEvents);

export const getUserExams = () => axios.get(endpoints.events.getUserExams);

export const getStudentReviews = () =>
  axios.get(endpoints.reviews.getStudentReviews);

export const getInstructorReviews = () =>
  axios.get(endpoints.reviews.getInstructorReviews);

export const getStudentFinishedDrivingSessionsNumber = () =>
  axios.get(endpoints.drivingSession.getStudentFinishedDrivingSessionsNumber);

export const getStudentUpcomingDrivingSession = () =>
  axios.get(endpoints.drivingSession.getStudentUpcomingDrivingSession);

export const getStudentTwoWeeksEvents = () =>
  axios.get(endpoints.events.getStudentTwoWeeksEvents);

export const getStudentRating = () =>
  axios.get(endpoints.reviews.getStudentRatings);

export const getStudentStats = (id) =>
  axios.get(`${endpoints.users.getStudentStats}/${id}`);
