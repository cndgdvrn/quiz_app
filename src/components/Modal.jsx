import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  checkAnswer,
  incrementQuestion,
  calcScore,
  updateTimer,
  resetTimer,
} from "../redux/quizSlice";
import Result from "./Result";

const Modal = () => {
  let siklar = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  const {
    wholeQuestions,
    currentQuestion,
    score,
    totalQuestions,
    timer,
    timerStatus,
  } = useSelector((state) => state.quiz);
  const { status } = useSelector((state) => state.modal);
  const [choosenAnswer, setChoosenAnswer] = useState(999);
  const [isSelect, setIsSelect] = useState(false);
  const [width, setWidth] = useState(0);

  const dispatch = useDispatch();

  const condition =
    wholeQuestions[currentQuestion] && currentQuestion < totalQuestions;

  useEffect(() => {
    if (timerStatus === true && timer >= 0 && condition) {
      let interval = setInterval(() => {
        dispatch(updateTimer());
        setWidth(timer * (384 / 30000));
      }, 100);

      if (timer === 0) {
        handleNextQuestion();
      }

      return () => {
        clearInterval(interval);
      };
    }
  }, [timer, timerStatus, dispatch, condition]);

  useEffect(() => {
    if (choosenAnswer >= 0 && choosenAnswer <= 3) {
      setIsSelect(true);
    } else {
      setIsSelect(false);
    }
  }, [choosenAnswer]);

  const handleNextQuestion = () => {
    dispatch(checkAnswer(choosenAnswer));
    dispatch(calcScore());
    dispatch(incrementQuestion());
    dispatch(resetTimer());
    setWidth(0);
    setChoosenAnswer(999);
    // console.log(score, "score");
  };

  return (
    <>
      {status && (
        <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-gray-200">
          {condition ? (
            <div className="bg-white p-8 gap-y-3 flex flex-col w-96  justify-center shadow-2xl relative">
            {condition && (
              <div
                style={{ width: `${width}px` }}
                className="bg-red-400 h-2  absolute top-0 left-0 "></div>
            )}
            <div className="flex justify-between font text-xl font-bold">
              <span>{condition && `Question ${currentQuestion + 1}`}</span>
              <span>
                {condition && `${currentQuestion + 1} / ${totalQuestions}`}
              </span>
            </div>
            <div className="text-lg font-semibold">
              {condition && wholeQuestions[currentQuestion].question}
            </div>
            <div className="flex flex-col font-medium text-md gap-y-1">
              {condition &&
                wholeQuestions[currentQuestion].options.map((option, i) => {
                  return (
                    <span
                      onClick={() => setChoosenAnswer(i)}
                      key={i}
                      className={`bg-gray-600 p-3 rounded-lg text-white cursor-pointer opacity-90 hover:opacity-100  ${
                        choosenAnswer === i
                          ? "bg-yellow-400 text-green-600 font-semibold "
                          : null
                      } transition-all `}>
                      {siklar[`${i}`]}-{option}
                    </span>
                  );
                })}
            </div>
            {condition && (
              <button
                disabled={!isSelect}
                onClick={() => handleNextQuestion()}
                className="ml-auto text-xl bg-green-600 text-white p-2 rounded-lg disabled disabled:opacity-50">
                Sonraki Soru
              </button>
            )}
          </div>
          ): <Result/>}
        </div>
      )}
    </>
  );
};

export default Modal;
