import React from "react";
import { useModal } from "../../context/modal";

const Button = ({ buttonName }) => {
  const { setIsModalOpen } = useModal();
  return (
    <div>
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
