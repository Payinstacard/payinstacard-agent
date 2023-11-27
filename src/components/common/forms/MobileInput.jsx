import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

const CustomPhoneNumberInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder=""
      className="bg-[#EFF1F999] rounded-lg border-0 w-full "
    />
  );
};
function MobileInput({ formData, setFormData }) {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState("");
  const handleChange = (newValue) => {
    setValue(newValue);
    setFormData({ ...formData, ben_mobile: newValue });
  };
  return (
    <PhoneInput
      defaultCountry="IN"
      value={formData.ben_mobile}
      onChange={handleChange}
      //   inputComponent={CustomPhoneNumberInput}
      className="w-full "
    />
  );
}

export default MobileInput;
