export const firebaseOTP_error = (error) => {
  let errorMessage;
  switch (error.code) {
    case "auth/invalid-verification-code":
      errorMessage = "Invalid verification code";
      break;
    case "auth/code-expired":
      errorMessage = "Verification code has expired";
      break;
    case "auth/invalid-verification-id":
      errorMessage = "Invalid verification ID";
      break;
    case "auth/missing-verification-code":
      errorMessage = "Missing verification code";
      break;
    case "auth/quota-exceeded":
      errorMessage = "SMS quota for the project has been exceeded";
      break;
    case "auth/maximum-requests-reached":
      errorMessage = "Maximum number of verification attempts exceeded";
      break;
    default:
      errorMessage = "Error submitting OTP";
      break;
  }

  return errorMessage;
};

export const Firebase_login_error = (error) => {
  let errorMessage;
  switch (error.code) {
    case "auth/invalid-phone-number":
      errorMessage = "Invalid phone number";
      break;
    case "auth/missing-phone-number":
      errorMessage = "Missing phone number";
      break;
    case "auth/quota-exceeded":
      errorMessage = "SMS quota for the project has been exceeded";
      break;
    case "auth/captcha-check-failed":
      errorMessage = "Captcha verification failed";
      break;
    case "auth/timeout":
      errorMessage = "Verification timeout";
      break;
    case "auth/invalid-verification-id":
      errorMessage = "Invalid verification ID";
      break;
    case "auth/invalid-verification-code":
      errorMessage = "Invalid verification code";
      break;

    case "auth/user-not-found":
      errorMessage = "User not found";
      break;
    case "auth/wrong-password":
      errorMessage = "Please Check your password";
      break;
    case "auth/user-disabled":
      errorMessage = "Your Account is Disable, Please contact admin";
      break;
    default:
      errorMessage = "Error sending OTP";
      break;
  }

  return errorMessage;
};
