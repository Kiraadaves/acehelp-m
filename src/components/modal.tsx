import React from "react";

interface ModalProps {
  onClose: () => void;
  id: number;
  title: string;
  body: string;
}

const Modal = ({ onClose, id, title, body }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate__animated animate__slideInDown bg-white space-y-4 w-full max-w-lg px-6 pt-6 pb-12 rounded shadow-md">
        <div className="flex justify-end">
          {" "}
          <button
            className=" bg-[#B771E5] text-white rounded-full px-3 py-1 text-base font-bold"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <h2 className="text-xl font-bold text-[#B771E5] text-center mb-4">
          {title}
        </h2>
        <p className="text-sm text-[#60686C] mb-4">{body}</p>
      </div>
    </div>
  );
};

export default Modal;
