import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoPng from "../../assets/svg/payinstaLogo.svg";
import Button from "../common/forms/Button";
import Input from "../common/forms/Input";
import { ForgotPasswordPageSchema } from "../../schemas/ValidationSchema";
import { sendForgotPasswordEmail } from "../../Firebase";
import { Firebase_login_error } from "../../services/firebaseErrors";
import { toast } from "react-toastify";
import Loader from "./../common/Loader/Loader";

const initialValues = {
  email: "",
};
function ForgotPasswordForm({}) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: ForgotPasswordPageSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        setLoading(true);

        await sendForgotPasswordEmail(values.email.trim());
        toast("Successfully send reset password email", {
          theme: "dark",
          hideProgressBar: true,
          type: "success",
        });
        setTimeout(() => navigate("/"), 3000);
      } catch (error) {
        errors.message = Firebase_login_error(error);
        toast(Firebase_login_error(error), {
          theme: "dark",
          hideProgressBar: true,
          type: "error",
        });
      }
      setLoading(false);
    },
  });
  return (
    <div className="w-[100%] md:w-[50%] flex flex-col items-center justify-center px-6 py-12 lg:px-8">
      {loading && <Loader />}
      <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="" src={LogoPng} alt="Your Company" />
        <h1 className="mt-6 text-[40px] font-bold leading-9 tracking-tight text-gray-900 text-[#1E293B]">
          Forgot Password?
        </h1>
        <p className="font-medium	mt-4 text-base text-[#64748B]">
          No worries! Just enter your e-mail and we’ll send you a OTP . then
          verify it and its done.
        </p>
      </div>

      <div className="w-full mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <Input
            name="email"
            label="Email Address"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.email}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path
                  d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM17.6 4.25L11.06 8.34C10.41 8.75 9.59 8.75 8.94 8.34L2.4 4.25C2.29973 4.19371 2.21192 4.11766 2.14189 4.02645C2.07186 3.93525 2.02106 3.83078 1.99258 3.71937C1.96409 3.60796 1.9585 3.49194 1.97616 3.37831C1.99381 3.26468 2.03434 3.15581 2.09528 3.0583C2.15623 2.96079 2.23632 2.87666 2.33073 2.811C2.42513 2.74533 2.53187 2.69951 2.6445 2.6763C2.75712 2.65309 2.87328 2.65297 2.98595 2.67595C3.09863 2.69893 3.20546 2.74453 3.3 2.81L10 7L16.7 2.81C16.7945 2.74453 16.9014 2.69893 17.014 2.67595C17.1267 2.65297 17.2429 2.65309 17.3555 2.6763C17.4681 2.69951 17.5749 2.74533 17.6693 2.811C17.7637 2.87666 17.8438 2.96079 17.9047 3.0583C17.9657 3.15581 18.0062 3.26468 18.0238 3.37831C18.0415 3.49194 18.0359 3.60796 18.0074 3.71937C17.9789 3.83078 17.9281 3.93525 17.8581 4.02645C17.7881 4.11766 17.7003 4.19371 17.6 4.25Z"
                  fill="#2F2F2F"
                />
              </svg>
            }
          />

          <Button type="submit" label="Submit" />
          <Button
            outlined={true}
            buttonActions={{
              onClick: () => navigate("/"),
            }}
            label="Back to Login"
          />
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
