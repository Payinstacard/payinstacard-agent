import React, { useState } from "react";

function WithdrawPopup({ onClose, onWithdraw }) {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawalAmount);
    if (!isNaN(amount) && amount >= 500) {
      onWithdraw(amount);
      onClose();
    } else {
      alert("Withdrawal amount must be a valid number and at least 500.");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 ">
      <div className="bg-white p-6 rounded-md w-96 ">
        <label className="block text-[25px] font-bold  ">
          Withdrawal Amount:{" "}
        </label>
        <p className="text-sm text-red-500 mt-[-5px] mb-4 ">
          *Minimum withdrawal amount: &#8377;500
        </p>
        <input
          type="number"
          value={withdrawalAmount}
          onChange={(e) => setWithdrawalAmount(e.target.value)}
          className="w-full border p-2 rounded-md mb-4"
        />

        <button
          onClick={handleWithdraw}
          disabled={withdrawalAmount < 500}
          className={`bg-[#00006B] text-white p-2 rounded-md ${
            withdrawalAmount < 500 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Withdraw
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 p-2 rounded-md ml-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default WithdrawPopup;
