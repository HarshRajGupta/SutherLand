import { useEffect, useState } from 'react';
import axios from 'axios';

const Question = ({ questionId, index, answers, setAnswers }) => {
	const [question, setQuestion] = useState();
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const getQuestion = async () => {
		if (!questionId) return;
		try {
			const res = await axios.post(
				'http://localhost:4000/question/get',
				{ questionId },
				config,
			);
			setQuestion(res.data.Question);
			console.log(res.data.Question);
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
									checked={answers[index] === optionIndex}
									onChange={() => {
										const newAnswers = [...answers];
										newAnswers[index] = optionIndex;
										setAnswers(newAnswers);
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

export default Question;
