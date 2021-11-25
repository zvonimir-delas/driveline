export const groupDrivingSessions = data =>
  data.reduce((categories, { id, dayOfWeek, time, status }) => {
    if (!categories[dayOfWeek]) categories[dayOfWeek] = [];
    categories[dayOfWeek].push({ id, time, status });
    return categories;
  }, {});

export const dayToString = day => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      break;
  }
};
