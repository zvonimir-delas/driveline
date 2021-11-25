import * as yup from "yup";
import { errorMessage } from "../../../../constants/formConstants.json";

export const validationSchema = yup.object().shape({
  name: yup.string().min(`${errorMessage.min} 2`).max(`${errorMessage.max} 20`),
});
