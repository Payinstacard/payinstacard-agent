import * as Yup from "yup";

export const LoginPageSchema = new Yup.ObjectSchema({
  email: Yup.string().email().required("please enter valid email"),
  password: Yup.string().min(4).required("Enter minimum 4 character"),
});

export const ForgotPasswordPageSchema = new Yup.ObjectSchema({
  email: Yup.string().email().required("please enter valid email"),
});
