const isOTPValid = (OTPCreatingTime: Date): boolean => {
  const OTP_TIME_LIMIT = 5 * 60 * 1000; // 5 minutes in milliseconds
  const currentTime = new Date().getTime();
  const otpTime = new Date(OTPCreatingTime).getTime();

  if (isNaN(otpTime)) {
    throw new Error("Invalid date format");
  }

  return currentTime - otpTime <= OTP_TIME_LIMIT;
};

export default isOTPValid;
