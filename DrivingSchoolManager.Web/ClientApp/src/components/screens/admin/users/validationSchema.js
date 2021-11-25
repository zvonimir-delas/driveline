import * as yup from "yup";
import { errorMessage } from "../../../../constants/formConstants.json";

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(2, `${errorMessage.min} 2`)
    .max(30, `${errorMessage.max} 30`),
  lastName: yup
    .string()
    .trim()
    .min(2, `${errorMessage.min} 2`)
    .max(20, `${errorMessage.max} 20`),
  oib: yup.number().typeError(errorMessage.number),
  email: yup
    .string()
    .trim()
    .email(errorMessage.email)
    .min(5, `${errorMessage.min} 5`)
    .max(30, `${errorMessage.max} 30`),
  phoneNumber: yup
    .string()
    .trim()
    .min(5, `${errorMessage.min} 5`)
    .max(15, `${errorMessage.max} 15`),
  instructor: yup
    .string()
    .email(errorMessage.email)
    .min(5, `${errorMessage.min} 5`)
    .max(30, `${errorMessage.max} 30`),
  vehicle: yup
    .string()
    .trim()
    .min(5, `${errorMessage.min} 5`)
    .max(20, `${errorMessage.max} 20`),
});
