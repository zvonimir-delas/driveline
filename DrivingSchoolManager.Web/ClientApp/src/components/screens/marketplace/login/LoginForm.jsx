import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { placeholder, errorMessage } from "../../../../constants/formConstants";
import { getToken } from "../../../../services/login";

import Field from "../../../helpers/Field";

const LoginForm = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(errorMessage.required)
        .email(errorMessage.email),
      password: yup.string().required(errorMessage.required)
    })
  });

  const handleLogin = data => {
    const { email, password } = data;

    const notificationToken = localStorage.getItem("notification-token");

    getToken({ email, password, notificationToken })
      .then(({ data }) => {
        localStorage.setItem("token", data.token);

        switch (data.user.role) {
          case "Student":
            history.push("student/profile");
            break;
          case "Instructor":
            history.push("instructor/profile");
            break;
          case "Admin":
            history.push("admin/users");
            break;
          default:
            break;
        }
      })
      .catch(() => alert("Failed to authenticate"));
  };

  return (
    <form
      className="login__form"
      onSubmit={handleSubmit(handleLogin)}
      noValidate
    >
      <Field
        type="email"
        name="email"
        label="Email"
        ref={register}
        error={errors.email}
        placeholder={placeholder.email}
      />
      <Field
        type="password"
        name="password"
        label="Password"
        ref={register}
        error={errors.password}
        placeholder={placeholder.password}
      />
      <button className="form__submit">Login</button>
    </form>
  );
};

export default LoginForm;
