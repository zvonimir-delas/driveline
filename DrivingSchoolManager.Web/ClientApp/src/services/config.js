import axios from "axios";
import { history } from "../utils/History";

const base = "https://localhost:44310";
const loginBase = `${base}/login`;
const userBase = `${base}/users`;
const eventBase = `${base}/events`;
const drivingSessionBase = `${base}/driving-sessions`;
const reviewBase = `${base}/reviews`;
const drivingSchoolBase = `${base}/driving-schools`;
const groupBase = `${base}/groups`;

export const endpoints = {
  login: {
    getToken: `${loginBase}`,
    getNewToken: `${loginBase}/new`,
  },
  users: {
    getById: `${userBase}/get-by-id`,
    getByRole: `${userBase}/get-by-role`,
    add: `${userBase}/add`,
    edit: `${userBase}/edit`,
    delete: `${userBase}/delete`,
    getInstructorUsers: `${userBase}/get/instructor-users-by-token`,
    getByToken: `${userBase}/get-by-token`,
    getInstructorSchedule: `${userBase}/get-instructor-schedule`,
    getAppointedDrivingSessions: `${userBase}/get-appointed-driving-sessions`,
    getStudentStats: `${userBase}/get-student-stats`,
  },
  events: {
    getById: `${eventBase}/get-by-id`,
    getByDrivingSchool: `${eventBase}/get-by-driving-school`,
    getDrivesByInstructor: `${eventBase}/get-drives-by-instructor`,
    add: `${eventBase}/add`,
    addExamOrDrive: `${eventBase}/add-exam-or-drive`,
    edit: `${eventBase}/edit`,
    delete: `${eventBase}/delete`,
    getByUser: `${eventBase}/get-by-user`,
    getEventStudents: `${eventBase}/get-event-students`,
    addExamResults: `${eventBase}/add-exam-results`,
    getPotentialStudentsForEvent: `${eventBase}/get-potential-students-for-event`,
    confirmPresence: `${eventBase}/confirm-presence`,
  },
  drivingSession: {
    getById: `${drivingSessionBase}/get-by-id`,
    getByStudentId: `${drivingSessionBase}/student-id`,
    add: `${drivingSessionBase}/add`,
    edit: `${drivingSessionBase}/edit`,
    appoint: `${drivingSessionBase}/appoint`,
    finish: `${drivingSessionBase}/finish`,
    cancel: `${drivingSessionBase}/cancel`,
    delete: `${drivingSessionBase}/delete`,
  },
  reviews: {
    add: `${reviewBase}/add`,
    getStudentReviews: `${reviewBase}/get/student-reviews-by-token`,
    getByInstructor: `${reviewBase}/get-by-instructor`,
    getStudentRatings: `${reviewBase}/get/student-rating-by-token`,
  },
  drivingSchools: {
    getById: `${drivingSchoolBase}/get-by-id`,
    getAll: `${drivingSchoolBase}/get-driving-schools`,
    getRating: `${drivingSchoolBase}/get-rating`,
  },
  groups: {
    base: groupBase,
  },
};

const getNewToken = (token) =>
  axios.post(endpoints.login.getNewToken, { token });

export const configureAxios = () => {
  axios.interceptors.request.use((config) => {
    const token = `Bearer ${localStorage.getItem("token")}`;
    config.headers["Authorization"] = token;

    return config;
  });

  const handleRedirectToLogin = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      let originalRequest = error.config;
      const token = localStorage.getItem("token");
      if (error.response && error.response.status === 401 && !token) {
        history.push("/login");

        return Promise.reject(error);
      } else if (
        error.response &&
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._isRetryRequest &&
        token
      ) {
        originalRequest._isRetryRequest = true;

        return getNewToken(token).then(({ data }) => {
          if (!data) {
            handleRedirectToLogin();

            return;
          }
          localStorage.setItem("token", data);

          return axios(originalRequest);
        });
      } else if (
        error.response &&
        error.response.status === 401 &&
        originalRequest &&
        originalRequest._isRetryRequest
      ) {
        handleRedirectToLogin();
      }

      return Promise.reject(error);
    }
  );
};
