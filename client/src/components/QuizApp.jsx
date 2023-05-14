import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import axios from 'axios';
import PropTypes from 'prop-types';

const Question = ({ questionId, handleAnswerSelection, answers }) => {
	const [question, setQuestion] = useState();
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const getQuestion = async () => {
		try {
			const res = await axios.post(
				'http://localhost:4000/question/get',
				{ questionId },
				config,
			);
			setQuestion(res.data.Question);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getQuestion();
	}, []);
	if (!question) {
		return <>Loading...</>;
	} else
		return (
			<div className="mb-4">
				<p className="font-semibold mb-2">{question.question}</p>
				<ul>
					{question.options.map((option, optionIndex) => (
						<li key={optionIndex}>
							<label className="inline-flex items-center">
								<input
									type="radio"
									name={`question-${questionId}`}
									value={option}
									checked={answers[questionId] === option}
									onChange={() => {
										handleAnswerSelection(
											questionId,
											option,
										);
									}}
									className="form-radio text-indigo-600"
								/>
								<span className="ml-2">{option}</span>
							</label>
						</li>
					))}
				</ul>
			</div>
		);
};

Question.propTypes = {
	questionId: PropTypes.string.isRequired,
	handleAnswerSelection: PropTypes.func.isRequired,
	answers: PropTypes.array.isRequired,
};

const QuizApp = ({ questions, endTime, score }) => {
	const [timeLeft, setTimeLeft] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [Score, setScore] = useState(score);
	const [submitted, setSubmitted] = useState(timeLeft > 0);
	console.log(timeLeft);
	const handleAnswerSelection = (index, selectedAnswer) => {
		const newAnswers = [...answers];
		newAnswers[index] = selectedAnswer;
		setAnswers(newAnswers);
	};

	const handleSubmit = (e) => {
		e?.preventDefault();
		setSubmitted(true);
		let totalScore = 0;
		setScore(totalScore);
	};
	useState(() => {
		const t = endTime[0] - Date.now();
		setTimeLeft(t);
		console.log('time ' + timeLeft);
	});
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);
		const t = Math.floor((endTime[0] - Date.now()) / 1000);
		setTimeLeft(Math.max(0, t));
		if (timeLeft <= 0) {
			clearInterval(timer);
			handleSubmit();
		}
		return () => {
			clearInterval(timer);
		};
	});

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	};

	return (
		<>
			<div className="container mx-auto px-4 py-8 relative">
				<p className="text-lg mb-4 absolute right-0 mr-4 bg-orange-300 p-2 rounded-lg">
					Time Remaining: {formatTime(timeLeft)}
				</p>
				{questions.map((question) => (
					<Question
						questionId={question}
						key={question}
						handleAnswerSelection={handleAnswerSelection}
						answers={answers}
					/>
				))}

				<div className="text-center">
					{submitted ? (
						<p className="mt-4 text-2xl bg-orange-200 p-3">
							Your score: {Score}
						</p>
					) : (
						<>
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
						</>
					)}
				</div>
			</div>
		</>
	);
};

QuizApp.propTypes = {
	questions: PropTypes.array.isRequired,
};

export default QuizApp;
