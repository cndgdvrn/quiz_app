import { useDispatch, useSelector } from "react-redux";
import { resetQuizStates } from "../redux/quizSlice";
import { resetModalStates } from "../redux/modalSlice";

const Result = () => {
  const { score, totalQuestions } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const ratio = score / totalQuestions;

  const handleClick = () => {
    // window.location.reload();
    dispatch(resetModalStates())
    dispatch(resetQuizStates())
};

  return (
    <div
      className={`w-72 ${
        ratio > 7 ? "bg-green-400" : "bg-red-600"
      } shadow-lg p-6 flex flex-col items-center gap-y-3`}>
      <p className="text-xl">
        You scored <span className="font-semibold tracking-tight">{score}</span>{" "}
        out of{" "}
        <span className="font-semibold tracking-tight">
          {totalQuestions * 10}
        </span>
      </p>
      {ratio > 7 && <p className="text-2xl">Congrats!</p>}

      <button
        onClick={() => handleClick()}
        className="bg-yellow-300 text-gray-600 p-2 rounded-md outline-none text-xl hover:text-black hover:bg-yellow-400">
        Try Again
      </button>
    </div>
  );
};

export default Result;
