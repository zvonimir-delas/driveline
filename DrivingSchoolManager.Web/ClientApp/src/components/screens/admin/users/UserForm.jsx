import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { validationSchema } from "./validationSchema";
import {
  getUsers,
  getUserById,
  addUser,
  editUser,
} from "../../../../services/users";
import { getGroupsByDrivingSchoolId } from "../../../../services/groups";
import { getUserInfo } from "../../../../utils/jwt";

import "../../../../styles/common/_modal.scss";
import Field from "../../../helpers/Field";
import UsersSelector from "../../common/UsersSelector";
import userType from "../../../../constants/role.json";
import categories from "../../../../constants/categories.json";

const UserForm = ({
  selectedUserId,
  usersUpdateHandler,
  formToggleHandler,
  setPage,
}) => {
  const [instructorId, setInstructorId] = useState(null);
  const [groups, setGroups] = useState({ data: [], count: 0 });
  const { register, errors, watch, handleSubmit, reset, setValue } = useForm({
    mode: "onBlur",
    validationSchema,
  });

  useEffect(() => {
    const userInfo = getUserInfo();
    selectedUserId &&
      getUserById(selectedUserId).then(({ data }) => {
        setValue("firstName", data.firstName);
        setValue("lastName", data.lastName);
        setValue("oib", data.oib);
        setValue("email", data.email);
        setValue("phoneNumber", data.phoneNumber);
        setValue("category", data.category);
        setValue("role", data.role);
        setValue("vehicle", data.vehicle && data.vehicle);
        setValue("group", data.group && data.group.name);
        setInstructorId(data.instructorId);
      });
    getGroupsByDrivingSchoolId(
      userInfo.drivingSchoolId,
      1000,
      0
    ).then(({ data }) => setGroups(data));
  }, []);

  const handleFormSubmit = (data) => {
    const user = { ...data };

    if (watch("role") === "Student") {
      user.vehicle = null;
      user.instructorId = instructorId;
      user.groupId = groups.data.find((group) => group.name === data.group).id;
    } else if (watch("role") === "Instructor")
      user.instructor = user.groupId = null;
    else if (watch("role") === "Admin")
      user.vehicle = user.instructor = user.groupId = null;

    if (selectedUserId)
      editUser({ id: selectedUserId, ...user }).then(() => {
        reset();
        usersUpdateHandler();
        setPage(0);
        formToggleHandler();
      });
    else {
      addUser(user).then(() => {
        reset();
        usersUpdateHandler();
        setPage(0);
        formToggleHandler();
      });
    }
  };

  return (
    <form className="modal__form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Field
        type="text"
        name="firstName"
        placeholder="Mate"
        label="First name"
        ref={register}
        error={errors.firstName}
      />
      <Field
        type="text"
        name="lastName"
        placeholder="Matić"
        label="Last name"
        ref={register}
        error={errors.lastName}
      />
      <Field
        type="text"
        name="oib"
        placeholder="52233311156"
        label="Oib"
        ref={register}
        error={errors.oib}
      />
      <Field
        type="email"
        name="email"
        placeholder="name@email.com"
        label="Email"
        ref={register}
        error={errors.email}
      />
      <Field
        type="text"
        name="phoneNumber"
        placeholder="092 345 1899"
        label="Phone number"
        ref={register}
        error={errors.phoneNumber}
      />
      {watch("role") !== "Admin" && !selectedUserId && (
        <Field
          component="select"
          type="text"
          name="category"
          label="Category"
          ref={register}
          options={Object.keys(categories)}
        />
      )}
      <Field
        component="select"
        type="text"
        name="role"
        label="Role"
        ref={register}
        options={Object.values(userType)}
        disabled={selectedUserId ? true : false}
      />
      {watch("role") === "Instructor" && (
        <Field
          type="text"
          name="vehicle"
          placeholder="Golf II"
          label="Vehicle"
          ref={register}
          error={errors.vehicle}
        />
      )}
      {watch("role") === "Student" && (
        <Field
          component="select"
          type="text"
          label="Group"
          name="group"
          options={groups.data.map((group) => group.name)}
          ref={register}
        />
      )}
      {watch("role") === "Student" && (
        <>
          <div className="form__label">Instructors</div>
          <UsersSelector
            userType={1}
            selectedUserId={instructorId}
            setUserId={setInstructorId}
          />
        </>
      )}
      <input type="file" id="file" name="file" />
      <div className="form__actions">
        <button className="form__button">Submit</button>
      </div>
    </form>
  );
};

export default UserForm;
