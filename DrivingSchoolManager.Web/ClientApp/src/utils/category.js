import category from "../constants/category";
import eventTopic from "../constants/eventTopic";

export const getCategoryProps = categoryEnum =>
  Object.values(category).find(category => category.value === categoryEnum);

export const getCategoryProp = (categoryEnum, topic) => {
  const categoryProps = Object.values(category).find(
    category => category.value === categoryEnum
  );

  switch (topic) {
    case eventTopic.regulations:
      return categoryProps.regulationsLessons;
    case eventTopic.firstAid:
      return categoryProps.firstAidLessons;
    case eventTopic.drivingSession:
      return categoryProps.drivingLessons;
    default:
      return;
  }
};

export const getCategories = () =>
  Object.values(category).map(category => category.value);
