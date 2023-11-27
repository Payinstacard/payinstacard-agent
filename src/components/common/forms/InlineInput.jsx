import React from "react";
import { BiEditAlt, BiSave } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";

const InlineInput = (props) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [value, setValue] = React.useState(props?.content);
  const primaryButtonStyles =
    "bg-primary hover:bg-blue-700 text-white font-bold py-2 px-2 rounded";
  React.useEffect(() => {
    setValue(props?.content);
  }, [props?.content]);
  return (
    <>
      <span className="mr-3">
        {isEdit ? (
          <input
            className="w-20 text-sm px-2 py-0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          props?.content
        )}
      </span>
      {isEdit ? (
        <>
          <button
            className={primaryButtonStyles}
            onClick={() => {
              props?.onSave(value);
              setIsEdit(false);
            }}
          >
            <BiSave />
          </button>
          <button
            className={`${primaryButtonStyles} m-1`}
            onClick={() => {
              setIsEdit(false);
            }}
          >
            <MdOutlineCancel />
          </button>
        </>
      ) : (
        <button
          className={primaryButtonStyles}
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          <BiEditAlt />
        </button>
      )}
    </>
  );
};

export default InlineInput;
