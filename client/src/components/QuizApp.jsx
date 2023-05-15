import { useEffect, useState } from 'react';
import axios from 'axios';
import Question from './Question';

const QuizApp = () => {
	const [fetched, setFetched] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [endTime, setEndTime] = useState(Date.now() + 60 * 1000 * 60);
	const [answers, setAnswers] = useState([]);
	const [timeLeft, setTimeLeft] = useState(60 * 1000 * 60);
	const [score, setScore] = useState(0);
	const [submitted, setSubmitted] = useState(true);
	const [s, sS] = useState(0);
	const buttonPressed = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeLeft(0);
		const wait = confirm('Are you sure you want to submit');
		if (!wait) {
			setSubmitted(false);
			return;
		}
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const formData = {
				testId: window.location.pathname.split('/')[2],
				userId: localStorage.getItem('user'),
				answers: answers,
			};
			const res = await axios.post(
				'http://localhost:4000/quiz/submit',
				formData,
				config,
			);
			console.log(res);
			setScore(res.data.quiz.score);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmit = async (e) => {
		console.log('submit', fetched);
		if (!fetched) return;
		if (s < 3) {
			sS(s + 1);
			return;
		} else {
			setSubmitted(true);
			setTimeLeft(0);
			e?.preventDefault();
			const wait = confirm('Are you sure you want to submit');
			if (!wait) {
				setSubmitted(false);
				return;
			}
			console.log('submit');
			if (endTime - Date.now() < 1000) return;
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};
				const formData = {
					testId: window.location.pathname.split('/')[2],
					userId: localStorage.getItem('user'),
					answers: answers,
				};
				const res = await axios.post(
					'http://localhost:4000/quiz/submit',
					formData,
					config,
				);
				console.log(res);
				setScore(res.data.quiz.score);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const getQuestions = async () => {
		try {
			const formData = {
				testId: window.location.pathname.split('/')[2],
				userId: localStorage.getItem('user'),
			};
			console.log(formData);
			const res = await axios.post(
				'http://localhost:4000/quiz/get',
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			console.log(res.data);
			setQuestions(res.data.quiz.questions);
			setEndTime(res.data.quiz.endTime);
			setScore(res.data.quiz.score);
			setTimeLeft(Math.max(Math.floor((endTime - Date.now()) / 1000), 0));
			setSubmitted(res.data.quiz.endTime - Date.now() < 0);
			if (submitted) setTimeLeft(0);
			console.log(timeLeft + ' seconds left');
			await setTimeout(() => {}, 1000);
			setFetched(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - 1);
		}, 1000);
		if (timeLeft === 0) {
			clearInterval(timer);
			if (!submitted && fetched) handleSubmit();
		}
		if (!submitted) {
			const t = Math.floor((endTime - Date.now()) / 1000);
			setTimeLeft(Math.max(0, t));
		}
		return () => {
			clearInterval(timer);
		};
	});

	useEffect(() => {
		getQuestions();
	}, []);

	if (!fetched) return <>Loading...</>;

	return (
		<div>
			<form
				onSubmit={buttonPressed}
				className="container mx-auto px-4 py-8 relative"
			>
				<p className="text-lg mb-4 absolute right-0 mr-4 bg-orange-300 p-2 rounded-lg">
					Time Remaining: {formatTime(timeLeft)}
				</p>
				{questions.map((question, index) => (
					<Question
						questionId={question}
						key={index}
						index={index}
						answers={answers}
						setAnswers={setAnswers}
					/>
				))}

				<div className="text-center">
					{submitted ? (
						<p className="mt-4 text-2xl bg-orange-200 p-3">
							Your score: {score}
						</p>
					) : (
						<>
							<button
								type="submit"
								onClick={buttonPressed}
								className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mx-2"
							>
								Submit
							</button>
						</>
					)}
				</div>
			</form>
		</div>
	);
};

const formatTime = (timeInSeconds) => {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;
	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
};

export default QuizApp;
