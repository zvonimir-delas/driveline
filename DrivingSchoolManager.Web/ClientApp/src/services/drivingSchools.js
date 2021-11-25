import { endpoints } from "./config.js";
import axios from "axios";

export const getAllDrivingSchools = (pageNumber, pageSize, search, filter) => {
  const city = filter.city;
  const category = filter.category;
  const minPrice = filter.priceRangeFrom;
  const maxPrice = filter.priceRangeTo;

  return axios
    .get(endpoints.drivingSchools.getAll, {
      params: {
        pageNumber,
        pageSize,
        search,
        city,
        category,
        minPrice,
        maxPrice
      }
    })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getDrivingSchoolRating = id => {
  return axios
    .get(`${endpoints.drivingSchools.getRating}/${id}`, {
      params: { id }
    })
    .then(response => response.data)
    .catch(error => console.log(error));
};

export const getDrivingSchoolById = id => {
  return axios
    .get(`${endpoints.drivingSchools.getById}/${id}`)
    .then(response => response.data)
    .catch(error => console.log(error));
};
