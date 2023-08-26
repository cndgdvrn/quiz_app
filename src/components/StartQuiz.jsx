import { useDispatch, useSelector } from "react-redux";
import { OCModal } from "../redux/modalSlice";
import { updateTimerStatus } from "../redux/quizSlice";

const StartQuiz = () => {
  const { status } = useSelector((state) => state.modal);
  const { timerStatus } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateTimerStatus());
    dispatch(OCModal());
  };
//   console.log(status, "status");
//   console.log(timerStatus, "timerStatus");

  return (
    <div className="w-full h-full flex justify-center items-center">
      <button
        onClick={()=>handleClick()}
        className="outline-none bg-purple-600 text-gray-700 p-4 font-semibold tracking-wider text-3xl rounded-xl hover:text-gray-950 hover:bg-purple-400 transition-all">
        Quizi Başlat
      </button>
    </div>
  );
};

export default StartQuiz;
