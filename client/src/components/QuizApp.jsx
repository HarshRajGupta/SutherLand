import { useEffect, useState } from "react";
import questions from "../questions.js";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";

const QuizApp = () => {
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const handleAnswerSelection = (index, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedAnswer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    setSubmitted(true);
    let totalScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateScore();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      calculateScore();
    }
  }, [timeLeft]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 relative">
        <p className="text-lg mb-4 absolute right-0 mr-4 bg-orange-300 p-2 rounded-lg">
          Time Remaining: {formatTime(timeLeft)}
        </p>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold mb-2">{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerSelection(index, option)}
                      className="form-radio text-indigo-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mx-2"
          >
            Submit
          </button>
          <Link
            to="/"
            className="mx-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-indigo-700"
          >
            HomePage
          </Link>
          {submitted && (
            <p className="mt-4 text-2xl bg-orange-200 p-3">
              Your score: {score}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizApp;
