import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import categories from "../../../../constants/categories";
import { placeholder, errorMessage } from "../../../../constants/formConstants";
import Field from "../../../helpers/Field";

const Filters = ({ filterDrivingSchools }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    defaultValues: {
      city: "",
      category: "Any",
      priceRangeFrom: 0,
      priceRangeTo: 0
    },
    validationSchema: yup.object().shape({
      city: yup.string(),
      category: yup.string(),
      priceRangeFrom: yup.number().typeError(errorMessage.number),
      priceRangeTo: yup.number().typeError(errorMessage.number)
    })
  });

  const categoryOptions = Object.keys(categories);
  categoryOptions.unshift("Any");

  const handleFormSubmit = values => {
    filterDrivingSchools(values);
  };

  return (
    <div className="driving-schools__filters">
      <form
        className="filters__form"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <Field
          type="text"
          name="city"
          placeholder="Split, Croatia"
          label="City"
          ref={register}
        />
        <Field
          component="select"
          name="category"
          type="text"
          label="Category"
          options={categoryOptions}
          ref={register}
        />
        <Field
          type="number"
          name="priceRangeFrom"
          placeholder="0"
          label="Min price"
          error={errors.priceRangeFrom}
          ref={register}
        />
        <Field
          type="number"
          name="priceRangeTo"
          placeholder="0"
          label="Max price"
          error={errors.priceRangeTo}
          ref={register}
        />
        <button className="form__submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Filters;
