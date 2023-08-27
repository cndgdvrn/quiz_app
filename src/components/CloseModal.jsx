import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OCCloseModal, resetCloseModalStates } from "../redux/closeModalSlice";
import { resetModalStates } from "../redux/modalSlice";
import { resetQuizStates } from "../redux/quizSlice";

const CloseModal = ({setCondition}) => {
  const { closeModalStatus } = useSelector((state) => state.closeModal);
  const dispatch = useDispatch();

  console.log(closeModalStatus, "closeModalStatus");

  const handleNotQuit = () => {
    dispatch(OCCloseModal());
  };
  const handleQuit = () => {
    // dispatch(resetModalStates());
    // dispatch(resetQuizStates());
    // dispatch(resetCloseModalStates());
    setCondition(false)
  };

  return (
    <div className="flex flex-col gap-y-6 bg-white p-6 text-xl shadow-2xl">
      <p className="text-2xl">Do you want to quit?</p>
      <div className="flex items-center justify-center space-x-8">
        <button onClick={()=>handleQuit()} className="bg-gray-800 text-white p-2 rounded-sm">Yes</button>
        <button
          onClick={() => handleNotQuit()}
          className="bg-gray-800 text-white p-2 rounded-sm">
          No
        </button>
      </div>
    </div>
  );
};

export default CloseModal;
