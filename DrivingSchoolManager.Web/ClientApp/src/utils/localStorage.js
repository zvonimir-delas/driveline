export const setTrackedPath = (path, drivingSessionId) => {
  localStorage.setItem(
    `tracked-path-${drivingSessionId}`,
    JSON.stringify(path)
  );
};

export const getTrackedPath = (drivingSessionId) => {
  return JSON.parse(localStorage.getItem(`tracked-path-${drivingSessionId}`));
};

export const removeTrackedPath = (drivingSessionId) => {
  localStorage.removeItem(`tracked-path-${drivingSessionId}`);
};

export const setDidStudentReview = (bool) => {
  localStorage.setItem("did-student-review", JSON.stringify(bool));
};

export const getDidStudentReview = () => {
  return JSON.parse(localStorage.getItem("did-student-review"));
};
