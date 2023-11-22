import _ from "lodash";

const validate = (formData) => {
  let newErrors = {};

  const {
    firstName,
    lastName,
    mobileNo,
    mobileVerified,
    email,
    city,
    state,
    pincode,
  } = formData;

  if (!firstName || _.isEmpty(firstName)) {
    newErrors = { ...newErrors, firstName: "First name is required" };
  } else if (firstName.length < 3) {
    newErrors = {
      ...newErrors,
      firstName: "First name should be minimum 3 characters.",
    };
  }

  if (!lastName || _.isEmpty(lastName)) {
    newErrors = { ...newErrors, lastName: "Last name is required" };
  } else if (lastName.length < 3) {
    newErrors = {
      ...newErrors,
      lastName: "Last name should be minimum 3 characters.",
    };
  }

  if (!mobileNo || _.isEmpty(mobileNo)) {
    newErrors = { ...newErrors, mobileNo: "Mobile number is required" };
  } else if (!/^(|\+91)?[789]\d{9}$/.test(mobileNo)) {
    newErrors = {
      ...newErrors,
      mobileNo: "Invalid mobile number.",
    };
    // } else if (
    //   !mobileVerified ||
    //   mobileVerified == "" ||
    //   mobileVerified === false
    // ) {
    //   newErrors = { ...newErrors, mobileVerified: "Verify mobile first." };
  }

  if (!email || _.isEmpty(email)) {
    newErrors = { ...newErrors, email: "Email is required" };
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    newErrors = {
      ...newErrors,
      email: "Invalid Email.",
    };
  }

  if (!city || _.isEmpty(city)) {
    newErrors = { ...newErrors, city: "City is required" };
  }

  if (!state || _.isEmpty(state)) {
    newErrors = { ...newErrors, state: "State is required" };
  }

  if (!pincode || _.isEmpty(pincode)) {
    newErrors = { ...newErrors, pincode: "Pincode is required" };
  } else if (pincode.length !== 6) {
    newErrors = {
      ...newErrors,
      pincode: "Invalid Pincode.",
    };
  }

  // Add validation for other fields

  return newErrors;
};

export default validate;
