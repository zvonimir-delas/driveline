import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { setDidStudentReview } from "../../../../utils/localStorage";

import { addReview } from "../../../../services/reviews";
import Rating from "../../../helpers/Rating";
import Field from "../../../helpers/Field";

import CloseIcon from "../../../../assets/icons/exit.svg";

const ReviewModal = ({ reviewModalToggleHandler }) => {
  const [rating, setRating] = useState(0);
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
    validationSchema: yup.object().shape({
      comment: yup
        .string()
        .required("Field is required")
        .min(5, "Minimum characters: 5")
        .max(255, "Maximum characters: 255"),
    }),
  });

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFormSubmit = ({ comment }) => {
    addReview({ comment, rating }).then(() => {
      reviewModalToggleHandler();
      setDidStudentReview(true);
    });
  };

  return (
    <form className="modal__form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Field
        component="textarea"
        label="Review comment"
        placeholder="Driving school and instructor were great..."
        name="comment"
        ref={register}
        error={errors.message}
      />
      <Rating
        editable={true}
        size={30}
        half={false}
        valueChangeHandler={handleRatingChange}
        value={rating}
      />
      <button className="form__button">Submit</button>
    </form>
  );
};

export default ReviewModal;
