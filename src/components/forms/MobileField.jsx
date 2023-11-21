import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const CustomPhoneNumberInput = ({ name, value, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder=""
      className="bg-[#EFF1F999] rounded-lg border-0 w-full "
    />
  );
};
function MobileField({ name, value, onChange }) {
  return (
    <PhoneInput
      defaultCountry="IN"
      name={name}
      value={value}
      onChange={(val) => onChange({ target: { name: name, value: val } })}
      // inputComponent={CustomPhoneNumberInput}
      className="inputMobile bg-[#EFF1F999] rounded-lg border-0 w-full px-4"
    />
  );
}

export default MobileField;
