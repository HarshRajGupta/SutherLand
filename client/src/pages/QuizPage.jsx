import QuizApp from '../components/QuizApp';
import axios from 'axios';
import { useEffect, useState } from 'react';

const QuizPage = ({ user, setUser }) => {
	const [questions, setQuestions] = useState([]);
	const [endTime, setEndTime] = useState(Date.now());
	const [score, setScore] = useState(0);
	useEffect(() => {
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
				setQuestions(res.data.quiz.questions);
				console.log(res.data.quiz);
				setEndTime(res.data.quiz.endTime);
				setScore(res.data.quiz.score);
			} catch (error) {
				console.log(error);
			}
		};
		getQuestions();
	}, []);
	return (
		<QuizApp
			questions={questions}
			endTime={endTime}
			score={score}
			user={user}
			setUser={setUser}
		/>
	);
};

export default QuizPage;
