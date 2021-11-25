import { endpoints } from "./config";
import axios from "axios";

export const getToken = ({ email, password, notificationToken }) =>
  axios.post(endpoints.login.getToken, { email, password, notificationToken });

export const getNewToken = token =>
  axios.post(endpoints.login.getNewToken, token);
