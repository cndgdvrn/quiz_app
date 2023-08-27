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
import { AiOutlineClose } from "react-icons/ai";
import CloseModal from "./CloseModal";
import { OCCloseModal } from "../redux/closeModalSlice";

const Modal = () => {
  let opts = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  const {
    wholeQuestions,
    currentQuestion,
    totalQuestions,
    timer,
    timerStatus,
  } = useSelector((state) => state.quiz);
  const { status } = useSelector((state) => state.modal);
  const { closeModalStatus } = useSelector((state) => state.closeModal);
  const [choosenAnswer, setChoosenAnswer] = useState(999);
  const [isSelect, setIsSelect] = useState(false);
  const [width, setWidth] = useState(0);

  const dispatch = useDispatch();

  const [condition, setCondition] = useState(false);
    // wholeQuestions[currentQuestion] && currentQuestion < totalQuestions;


    //UseEffect comp render olur olmaz soruyu getirdiği için total soru sayısının 1 eksiği kadar ile sınırlandırıldı.
    useEffect(()=>{
        if(wholeQuestions[currentQuestion] && currentQuestion < totalQuestions-1){
            console.log(currentQuestion,"currentQuestion");
            setCondition(true)
        }else{
            setCondition(false)
        }
    },[wholeQuestions,currentQuestion,totalQuestions])

    console.log(condition,"condition");

  useEffect(() => {
    if (timerStatus === true && timer >= 0 && condition) {
      let interval = setInterval(() => {
        dispatch(updateTimer());
        setWidth(timer * (384 / 30000));
      }, 1000);

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
  };

  return (
    <>
      {status && (
        <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-gray-200">
          {condition ? (
            <div className="bg-white p-12 pt-16 gap-y-3 flex flex-col w-96  justify-center shadow-2xl relative">
              <div>
                <div
                  style={{ width: `${width}px` }}
                  className="bg-red-400 h-2  absolute top-0 left-0 "></div>
                <div
                  onClick={() => dispatch(OCCloseModal())}
                  className="absolute top-4 right-2 bg-red-400 p-1 rounded-full flex justify-center items-center cursor-pointer">
                  <AiOutlineClose size={20} />
                </div>
                {closeModalStatus && (
                  <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-20 flex justify-center items-center z-10">
                    <CloseModal  setCondition={setCondition} />
                  </div>
                )}
              </div>

              <div className="flex justify-between font text-xl font-bold">
                <span> Question {currentQuestion + 1}</span>
                <span>
                  {currentQuestion + 1} / {totalQuestions}
                </span>
              </div>
              <div className="text-lg font-semibold">
                {wholeQuestions[currentQuestion].question}
              </div>
              <div className="flex flex-col font-medium text-md gap-y-1">
                {wholeQuestions[currentQuestion].options.map((option, i) => {
                  return (
                    <span
                      onClick={() => setChoosenAnswer(i)}
                      key={i}
                      className={`bg-gray-600 p-3 rounded-lg text-white cursor-pointer opacity-90 hover:opacity-100  ${
                        choosenAnswer === i
                          ? "bg-yellow-400 text-green-600 font-semibold "
                          : null
                      } transition-all `}>
                      {opts[`${i}`]}-{option}
                    </span>
                  );
                })}
              </div>

              <button
                disabled={!isSelect}
                onClick={() => handleNextQuestion()}
                className="ml-auto text-xl bg-green-600 text-white p-2 rounded-lg disabled disabled:opacity-50">
                Next Question
              </button>
            </div>
          ) : (
            <Result />
          )}
        </div>
      )}
    </>
  );
};

export default Modal;
