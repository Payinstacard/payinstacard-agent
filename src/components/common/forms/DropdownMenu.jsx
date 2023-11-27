import React, { useEffect, useRef, useState } from "react";
function DropdownMenu({ classes, options, selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState("below");
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      const spaceBelow =
        window.innerHeight - button.getBoundingClientRect().bottom;
      const spaceAbove = button.getBoundingClientRect().top;
      // Check if there's not enough space below the button to display the dropdown
      if (spaceBelow < 200 && spaceAbove > 200) {
        setPosition("above");
      } else {
        setPosition("below");
      }
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${classes}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        ref={buttonRef}
        className={`${
          selectedOption === "Select anyone" ? "text-blackBlur2" : "text-black"
        } flex justify-between items-center bg-[#EFF1F999] rounded-lg p-2 px-3 w-11/12 text-left`}
      >
        <span>{selectedOption} </span>
        <span>
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul
          className={`absolute mt-0 py-2 bg-white border rounded-b-lg w-11/12 shadow-md z-10 ${
            position === "above" ? "bottom-full " : ""
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="cursor-pointer hover:text-white hover:bg-primary px-4 py-2"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
