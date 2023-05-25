import { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../components/User';

// const User = ({ userId, score }) => {
// 	const BaseURL = 'http://localhost:5173/user/';
// 	return (
// 		<div className="flex items-center bg-slate-100 justify-around m-4">
// 			<a
// 				href={BaseURL + userId}
// 				className="text-2xl font-bold m-4 flex flex-col items-center justify-center"
// 			>
// 				{userId}
// 			</a>
// 			<div className="bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2">
// 				{' '}
// 				{score}
// 			</div>
// 		</div>
// 	);
// };

const Tests = () => {
	const [quizList, setQuiz] = useState([]);
	useEffect(() => {
		const testId = window.location.pathname.split('/')[2];
		const getTests = async () => {
			try {
				const res = await axios.post(
					'admin/quiz',
					{ testId: testId },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					},
				);
				console.log(res);
				setQuiz(res.data.quiz);
			} catch (error) {
				console.log(error);
			}
		};
		getTests();
	}, []);
	return (
		<div className="container mx-auto px-4 py-8 relative">
			<>
				{quizList.map(({ userId, score }) => {
					return (
						<User
							key={userId}
							userId={userId}
							score={score}
						/>
					);
				})}
			</>
		</div>
	);
};

export default Tests;
