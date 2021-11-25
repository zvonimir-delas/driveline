import { endpoints } from "./config";
import axios from "axios";

export const addReview = ({ comment, rating }) =>
  axios.post(endpoints.reviews.add, { comment, rating });

export const getReviewsByInstructorId = (id) => {
  return axios.get(`${endpoints.reviews.getByInstructor}/${id}`);
};
