import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { validationSchema, defaultValues } from "./formObjects";
import moment from "moment";

import {
  addEvent,
  addExamOrDrive,
  getEventById,
} from "../../../../services/events";
import { getGroupsByDrivingSchoolId } from "../../../../services/groups";
import { getUserInfo } from "../../../../utils/jwt";
import eventType from "../../../../constants/eventType";
import eventTopic from "../../../../constants/eventTopic";
import Field from "../../../helpers/Field";
import UsersSelector from "../../common/UsersSelector";

const EventForm = ({
  selectedEventId,
  formToggleHandler,
  eventsUpdateHandler,
  dates,
}) => {
  const [event, setEvent] = useState({});
  const [studentId, setStudentId] = useState(null);
  const [groups, setGroups] = useState({ data: [], count: 0 });
  const { register, handleSubmit, errors, watch, setValue } = useForm({
    mode: "onBlur",
    validationSchema,
    defaultValues,
  });

  useEffect(() => {
    const userInfo = getUserInfo();
    getGroupsByDrivingSchoolId(
      userInfo.drivingSchoolId,
      1000,
      0
    ).then(({ data }) => setGroups(data));
    selectedEventId &&
      getEventById(selectedEventId).then(({ data }) => {
        setEvent(data);
        setValue("topic", data.topic);
        setValue("type", data.type);
        setValue("start", moment(data.start, "HH:mm:ss").format("HH:mm"));
        setValue("end", moment(data.end, "HH:mm:ss").format("HH:mm"));
        setValue("location", data.location);
        setValue("group", data.group && data.group.name);
      });
  }, []);

  const handleFormSubmit = (data) => {
    let event = { ...data };

    const events = [];
    const eventStart = moment.utc(event.start, "HH:mm");
    const eventEnd = moment.utc(event.end, "HH:mm");

    dates.forEach((date) => {
      const momentDate = moment(date);
      const start = moment(eventStart);
      const end = moment(eventEnd);

      start.date(momentDate.date());
      start.month(momentDate.month());
      start.year(momentDate.year());
      end.date(momentDate.date());
      end.month(momentDate.month());
      end.year(momentDate.year());
      events.push({ ...event, start, end });
    });

    if (event.type === "Exam" || event.topic === "Drive")
      addExamOrDrive({
        userId: studentId,
        event: { ...event, start: events[0].start, end: events[0].end },
      }).then(() => {
        formToggleHandler();
        eventsUpdateHandler();
      });
    else {
      const groupId = groups.data.find((group) => group.name == event.group).id;

      addEvent({ events, groupId }).then(() => {
        formToggleHandler();
        eventsUpdateHandler();
      });
    }
  };

  return (
    <form className="modal__form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Field
        component="select"
        type="text"
        label="Topic"
        name="topic"
        options={Object.values(eventTopic)}
        ref={register}
      />
      {watch("topic") !== eventTopic.drive && (
        <Field
          component="select"
          type="text"
          label="Type"
          name="type"
          options={Object.values(eventType)}
          ref={register}
        />
      )}
      <Field
        type="time"
        label="Start"
        name="start"
        error={errors.start}
        ref={register}
      />
      <Field
        type="time"
        label="End"
        name="end"
        error={errors.end}
        ref={register}
      />
      <Field
        type="text"
        label="Location"
        name="location"
        placeholder="Classroom 15"
        error={errors.location}
        ref={register}
      />
      {watch("type") !== "Exam" && watch("topic") !== "Drive" && (
        <Field
          component="select"
          type="text"
          label="Group"
          name="group"
          options={groups.data.map((group) => group.name)}
          ref={register}
        />
      )}
      {(watch("type") === "Exam" || watch("topic") === "Drive") && (
        <UsersSelector
          userType={0}
          selectedUserId={studentId}
          setUserId={setStudentId}
        />
      )}

      <div className="form__actions">
        <button className="form__button ">Submit</button>
      </div>
    </form>
  );
};

export default EventForm;
