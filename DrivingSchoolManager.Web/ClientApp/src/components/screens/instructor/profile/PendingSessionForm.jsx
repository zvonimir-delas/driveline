import React, { useEffect } from "react";
import moment from "moment";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { day } from "../../../../constants/enums";
import { errorMessage } from "../../../../constants/formConstants";
import {
  getDrivingSessionById,
  addDrivingSession,
  deleteDrivingSession,
} from "../../../../services/drivingSessions";

import Field from "../../../helpers/Field";

const InstructorForm = ({
  drivingSessionId,
  formToggleHandler,
  scheduleUpdateHandler,
}) => {
  const { register, handleSubmit, errors, reset, setValue } = useForm({
    mode: "onBlur",
    validationSchema: yup.object().shape({
      time: yup
        .string()
        .required(errorMessage.required)
        .test("is-time", errorMessage.time, (value) =>
          moment(value, "HH:mm").isValid()
        )
        .test("is-before", `${errorMessage.timeMin} 07:00`, (value) => {
          return moment(value, "HH:mm").isSameOrAfter(moment("07:00", "HH:mm"));
        })
        .test("is-after", `${errorMessage.timeMax} 22:00`, (value) => {
          return moment(value, "HH:mm").isSameOrBefore(
            moment("22:00", "HH:mm")
          );
        }),
    }),
    defaultValues: {
      dayOfWeek: "Monday",
      time: "07:00",
    },
  });

  useEffect(() => {
    drivingSessionId &&
      getDrivingSessionById(drivingSessionId).then(({ data }) => {
        setValue("dayOfWeek", data.dayOfWeek);
        setValue("time", moment(data.time, "HH:mm:ss").format("HH:mm"));
      });
  }, []);

  const handleSessionDelete = () => {
    deleteDrivingSession(drivingSessionId).then(() => {
      formToggleHandler();
      scheduleUpdateHandler();
    });
  };

  const handleFormSubmit = (data = {}) => {
    let { dayOfWeek, time } = data;

    addDrivingSession({ dayOfWeek, time }).then(() => {
      reset();
      formToggleHandler();
      scheduleUpdateHandler();
    });
  };

  return (
    <form className="modal__form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Field
        component="select"
        type="text"
        label="Day"
        name="dayOfWeek"
        options={Object.values(day)}
        ref={register}
      />
      <Field
        type="time"
        label="Time"
        name="time"
        ref={register}
        error={errors.time}
      />
      <div className="modal__actions">
        <button type="submit" value="Submit" className="modal__button">
          Submit
        </button>
        {drivingSessionId && (
          <button
            className="modal__button modal__button--red"
            onClick={handleSessionDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default InstructorForm;
