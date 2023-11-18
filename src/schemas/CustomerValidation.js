import _ from "lodash";

const validate = (step, formData) => {
  let newErrors = {};
  if (step === 1) {
    if (!formData?.mobile || _.isEmpty(formData?.mobile)) {
      newErrors = { ...newErrors, mobile: "Mobile number is required" };
    } else if (!/^[0-9]{10}$/.test(formData?.mobile)) {
      newErrors = {
        ...newErrors,
        mobile: "Invalid mobile number.",
      };
    }
    if (!formData?.Email || _.isEmpty(formData?.Email)) {
      newErrors = { ...newErrors, Email: "Email is required" };
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData?.Email)) {
      newErrors = {
        ...newErrors,
        Email: "Invalid Email.",
      };
    }
    if (
      !formData?.Customer_data?.FullName ||
      _.isEmpty(formData?.Customer_data?.FullName)
    ) {
      newErrors = {
        ...newErrors,
        FullName: "Please Enter Your Full Name Here",
      };
    } else if (formData?.Customer_data?.FullName.length < 3) {
      newErrors = {
        ...newErrors,
        FullName: "Full Name should be minimum 3 characters.",
      };
    }
    if (
      !formData?.Customer_data?.Business_Name ||
      _.isEmpty(formData?.Customer_data?.Business_Name)
    ) {
      newErrors = {
        ...newErrors,
        Business_Name: "Please Enter Your Business Name",
      };
    } else if (formData?.Customer_data?.Business_Name.length < 3) {
      newErrors = {
        ...newErrors,
        Business_Name: "Business name should be minimum 3 characters.",
      };
    }
    if (
      !formData?.Customer_data?.Address ||
      _.isEmpty(formData?.Customer_data?.Address)
    ) {
      newErrors = { ...newErrors, Address: "Please Enter Your Address Here" };
    } else if (formData?.Customer_data?.Address.length < 10) {
      newErrors = {
        ...newErrors,
        Address: "Address should be minimum 10 characters.",
      };
    }
    if (
      !formData?.Customer_data?.Pincode ||
      _.isEmpty(formData?.Customer_data?.Pincode)
    ) {
      newErrors = { ...newErrors, Pincode: "Pin required" };
    } else if (formData?.Customer_data?.Pincode?.length !== 6) {
      newErrors = {
        ...newErrors,
        Pincode: "Invalid Pincode.",
      };
    }
  }
  if (step === 2) {
    if (
      !formData?.kyc_details?.Aadhar_Details?.aadhar ||
      _.isEmpty(formData?.kyc_details?.Aadhar_Details?.aadhar)
    ) {
      newErrors = {
        ...newErrors,
        AadhararNo: "Enter 12 digit Aadhaar Number",
      };
    } else if (formData?.kyc_details?.Aadhar_Details?.aadhar?.length !== 12) {
      newErrors = {
        ...newErrors,
        AadhararNo: "Invalid Aadharar number.",
      };
    } else if (
      !formData?.kyc_details?.aadhaarVerified ||
      formData?.kyc_details?.aadhaarVerified === false
    ) {
      newErrors = {
        ...newErrors,
        aadhaarVerified: "Please verify Aadhaar",
      };
    }

    if (
      !formData?.kyc_details?.Pan_details?.pan ||
      _.isEmpty(formData?.kyc_details?.Pan_details?.pan)
    ) {
      newErrors = { ...newErrors, panNO: "Please enter Pan number" };
    } else if (formData?.kyc_details?.Pan_details?.pan.length !== 10) {
      newErrors = { ...newErrors, panNO: "Enter valid Pan Number " };
    } else if (
      !formData?.kyc_details?._PANVerified ||
      formData?.kyc_details?._PANVerified === false
    ) {
      newErrors = {
        ...newErrors,
        _PANVerified: "Please verify PAN",
      };
    }
    if (_.isEmpty(formData?.Customer_data?.Business_Name)) {
      newErrors = {
        ...newErrors,
        Business_Name: "Please Enter Your Business Name",
      };
    } else if (formData?.Customer_data?.Business_Name.length < 3) {
      newErrors = {
        ...newErrors,
        Business_Name: "Business name should be minimum 3 characters.",
      };
    }
  }
  if (step === 3) {
    if (
      !formData?.bank_details?.account?.accountNo ||
      _.isEmpty(formData?.bank_details?.account?.accountNo)
    ) {
      newErrors = {
        ...newErrors,
        accountNo: "Please Enter Bank Account Number",
      };
    } else if (
      formData?.bank_details?.account?.accountNo.length < 12 ||
      formData?.bank_details?.account?.accountNo.length > 17
    ) {
      newErrors = {
        ...newErrors,
        accountNo: "Account No  should be of Range 12-17 digits.",
      };
    }
    if (
      !formData?.bank_details?.account?.ifsc ||
      _.isEmpty(formData?.bank_details?.account?.ifsc)
    ) {
      newErrors = { ...newErrors, ifsc: "Enter IFSC of Bank" };
    } else if (formData?.bank_details?.account?.ifsc.length !== 11) {
      newErrors = {
        ...newErrors,
        ifsc: "Invalid IFSC.",
      };
    }
    if (
      !formData?.bank_details?.bank_verified ||
      formData?.bank_details?.bank_verified === false
    ) {
      newErrors = { ...newErrors, bank_verified: "Verify Bank details" };
    }
  }
  if (step === 4) {
    if (
      !formData?.Commission?.BasePersentage ||
      formData?.Commission?.BasePersentage === ""
    ) {
      newErrors = {
        ...newErrors,
        BasePersentage: "Enter Base Commission",
      };
    } else if (formData?.Commission?.BasePersentage > 5) {
      newErrors = {
        ...newErrors,
        BasePersentage: "Base Commission should between 0 to 5 percentage.",
      };
    }
    if (
      !formData?.Commission?.markupPercentage ||
      formData?.Commission?.markupPercentage === ""
    ) {
      newErrors = {
        ...newErrors,
        markupPercentage: "Enter markup Commission",
      };
    } else if (formData?.Commission?.markupPercentage > 0.7) {
      newErrors = {
        ...newErrors,
        markupPercentage: "Enter MarkUp Commission as per limit prescribed.",
      };
    }
  }

  return newErrors;
};

export default validate;
