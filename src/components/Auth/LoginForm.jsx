import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { signIn } from "../../Firebase";
import LogoPng from "../../assets/svg/payinstaLogo.svg";
import Button from "../common/forms/Button";
import Input from "../common/forms/Input";
import { LoginPageSchema } from "../../schemas/ValidationSchema";
import { Firebase_login_error } from "../../services/firebaseErrors";
import { useAuth } from "../../stores/AuthContext";
// import { signIn } from "../../Firebase";
// import "firebase/auth";
// import { Firebase_login_error } from "../../service/firebaseErrors";
const initialValues = {
  email: "",
  password: "",
};
function LoginForm({
  setLockOutDuration,
  loginAttempts,
  setLoginAttempts,
  accountLock,
  setAccountLock,
  setLoad,
}) {
  const user = useAuth();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginPageSchema,

      onSubmit: async (values) => {
        const MAX_LOGIN_ATTEMPTS = 3; // Set your desired maximum attempts here
        const LOCKOUT_DURATION = 9000; // 5 minutes in milliseconds (adjust as needed)

        // console.log(loginAttempts);

        if (accountLock) {
          return; // Account is already locked
        }

        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
          setAccountLock(true);
          setLockOutDuration(LOCKOUT_DURATION);
          setTimeout(() => {
            setAccountLock(false);
            setLockOutDuration(0);
          }, LOCKOUT_DURATION);
          return;
        }
        try {
          setLoad(true);
          await signIn(values.email, values.password);
        } catch (error) {
          setLoad(false);
          setLoginAttempts(loginAttempts + 1);
          errors.message = Firebase_login_error(error);
        }
      },
    });
  return (
    <div class="w-[100%] md:w-[50%] flex flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="" src={LogoPng} alt="Your Company" />
        <h1 className="mt-6 text-[40px] font-bold leading-9 tracking-tight text-gray-900 text-[#1E293B]">
          Login
        </h1>
        <p className="font-medium	mt-4 text-base text-[#64748B]">
          Nice to meet you! Please enter your details.
        </p>
      </div>

      <div className="w-full mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            name="email"
            label="Email Address"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlure={handleBlur}
            error={errors.email}
            touch={touched}
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
          <Input
            name="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlure={handleBlur}
            error={errors.password}
            touch={touched}
            showEyeIcon={true}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 17C12.5304 17 13.0391 16.7893 13.4142 16.4142C13.7893 16.0391 14 15.5304 14 15C14 14.4696 13.7893 13.9609 13.4142 13.5858C13.0391 13.2107 12.5304 13 12 13C11.4696 13 10.9609 13.2107 10.5858 13.5858C10.2107 13.9609 10 14.4696 10 15C10 15.5304 10.2107 16.0391 10.5858 16.4142C10.9609 16.7893 11.4696 17 12 17ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 9.46957 4.21071 8.96086 4.58579 8.58579C4.96086 8.21071 5.46957 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z"
                  fill="#2F2F2F"
                />
              </svg>
            }
          />
          <div className="text-right">
            <Link
              to="/forgotpassword"
              className="font-semibold text-sm text-[#00006b]"
            >
              Forgot password?
            </Link>
          </div>
          <div>
            <Button type="submit" label="Login" errorMsg={errors.message} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
