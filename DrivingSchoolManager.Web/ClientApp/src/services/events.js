import { endpoints } from "./config";
import axios from "axios";

export const getEventById = (id) =>
  axios.get(`${endpoints.events.getById}/${id}`);

export const getEventStudents = (id) =>
  axios.get(`${endpoints.events.getEventStudents}/${id}`);

export const getByDrivingSchool = (dates, limit = 10, offset = 0) =>
  axios.post(
    `${endpoints.events.getByDrivingSchool}?limit=${limit}&offset=${offset}`,
    dates
  );

export const getByUser = () => axios.get(endpoints.events.getByUser);

export const addEvent = ({ events, groupId }) =>
  axios.post(endpoints.events.add, {
    events,
    groupId,
  });

export const getDrivesByInstructor = () =>
  axios.get(endpoints.events.getDrivesByInstructor);

export const addExamOrDrive = ({
  userId,
  event: { topic, type, start, end, location },
}) =>
  axios.post(endpoints.events.addExamOrDrive, {
    userId,
    event: { topic, type, start, end, location },
  });

export const addExamResults = ({ eventId, results }) =>
  axios.post(`${endpoints.events.addExamResults}/${eventId}`, results);

export const getPotentialStudentsForEvent = ({
  numberOfStudents,
  event: { number, type, topic, category },
}) =>
  axios.post(`${endpoints.events.getPotentialStudentsForEvent}`, {
    numberOfStudents,
    event: {
      number,
      type,
      topic,
      category,
    },
  });

export const deleteEvent = (id) =>
  axios.delete(`${endpoints.events.delete}/${id}`);
