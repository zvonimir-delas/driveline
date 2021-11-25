import * as yup from "yup";
import moment from "moment";
import { errorMessage } from "../../../../constants/formConstants.json";
import eventTopic from "../../../../constants/eventTopic";
import { eventType } from "../../../../constants/enums";

export const validationSchema = yup.object().shape({
  start: yup
    .string()
    .required(errorMessage.required)
    .test("is-time", errorMessage.time, (value) =>
      moment(value, "HH:mm").isValid()
    )
    .test("is-before", `${errorMessage.timeMin} 07:00`, (value) => {
      return moment(value, "HH:mm").isSameOrAfter(moment("07:00", "HH:mm"));
    })
    .test("is-after", `${errorMessage.timeMax} 22:00`, (value) => {
      return moment(value, "HH:mm").isSameOrBefore(moment("22:00", "HH:mm"));
    }),
  end: yup
    .string()
    .required(errorMessage.required)
    .test("is-time", errorMessage.time, (value) =>
      moment(value, "HH:mm").isValid()
    )
    .test("is-before", `${errorMessage.timeMin} 07:00`, (value) => {
      return moment(value, "HH:mm").isSameOrAfter(moment("07:00", "HH:mm"));
    })
    .test("is-after", `${errorMessage.timeMax} 22:00`, (value) => {
      return moment(value, "HH:mm").isSameOrBefore(moment("22:00", "HH:mm"));
    }),
  location: yup
    .string()
    .min(5, `${errorMessage.min} 5`)
    .max(30, `${errorMessage.max} 30`),
});

export const defaultValues = {
  type: eventType.lesson,
  topic: eventTopic.firstAid,
  start: "08:00",
  end: "10:00",
};
