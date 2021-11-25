import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Field from "../../../helpers/Field";
import { addGroup, editGroup } from "../../../../services/groups";
import { validationSchema } from "./formObjects";
import { getGroupById } from "../../../../services/groups";

const GroupForm = ({
  fetchGroups,
  setFormToggle,
  selectedGroupId,
  setPage,
}) => {
  const [group, setGroup] = useState(null);
  const { register, errors, handleSubmit, setValue } = useForm({
    mode: "onBlur",
    validationSchema,
  });

  useEffect(() => {
    if (selectedGroupId)
      getGroupById(selectedGroupId).then(({ data }) => {
        setGroup(data);
        setValue("name", data.name);
      });
  }, []);

  const handleFormSubmit = (data) => {
    if (selectedGroupId)
      editGroup({ name: data.name, id: selectedGroupId }).then(() => {
        fetchGroups();
        setPage(0);
        setFormToggle(false);
      });
    else
      addGroup(data)
        .then(() => {
          fetchGroups();
          setPage(0);
          setFormToggle(false);
        })
        .catch((err) => console.log(err));
  };

  return (
    <form className="modal__form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Field
        type="text"
        name="name"
        placeholder="Grupa A"
        label="Name"
        ref={register}
        error={errors.name}
      />
      <div className="form__actions">
        <button className="form__button">Submit</button>
      </div>
    </form>
  );
};

export default GroupForm;
