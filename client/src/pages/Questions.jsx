import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types';

const Question = ({ question }) => {
	if (!question) return <div>Loading...</div>;
	return (
		<div className="mb-4 bg-slate-100 rounded p-4">
			<p className="font-semibold mb-2">{question.question}</p>
			<div>
				<ol>
					{question.options.map((option, index) => (
						<li key={index}>
							<div className="inline-flex items-center">
								{option}
							</div>
						</li>
					))}
				</ol>
			</div>
			<div>
				Answer: {question.correctOption + 1}
				&#40;
				<span className="italic">
					{question.options[question.correctOption]}
				</span>
				&#41;
			</div>
		</div>
	);
};

const AddQuestionButton = ({ getQuestions }) => {
	const [status, setStatus] = useState();
	const [question, setQuestion] = useState('');
	const [option1, setOption1] = useState('');
	const [option2, setOption2] = useState('');
	const [option3, setOption3] = useState('');
	const [option4, setOption4] = useState('');
	const [correctOption, setCorrectOption] = useState();
	const handleSubmit = async (event) => {
		event.preventDefault();
		setStatus('sending');
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const formData = {
				question,
				options: [option1, option2, option3, option4],
				correctOption: correctOption - 1,
			};
			const res = await axios.post(
				'admin/question/new',
				formData,
				config,
			);
			setStatus('sent');
			console.log(res);
			setQuestion('');
			setOption1('');
			setOption2('');
			setOption3('');
			setOption4('');
			setCorrectOption();
			getQuestions();
		} catch (error) {
			console.log(error);
			setStatus('failed');
		}
	};

	return (
		<div>
			{status !== 'send' ? (
				<>
					{status === 'sending' ? (
						<h1 className="text-3xl font-bold m-8 flex flex-col items-center justify-center">
							Saving...
						</h1>
					) : (
						<>
							{status === 'sent' ? (
								<div className="flex flex-col items-center justify-center">
									<h1 className="text-3xl font-bold m-4 flex flex-col items-center justify-center">
										Saved
									</h1>
									<button
										onClick={() => setStatus('send')}
										className="bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2"
									>
										{' '}
										Add another Question
									</button>
								</div>
							) : (
								<>
									{status === 'failed' ? (
										<div className="flex flex-col items-center justify-center">
											<h1 className="text-3xl font-bold m-4 flex flex-col items-center justify-center">
												Failed
											</h1>
											<button
												onClick={() =>
													setStatus('send')
												}
												className="bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2"
											>
												{' '}
												Try Again
											</button>
										</div>
									) : (
										<div className="flex flex-col items-center justify-center m-4">
											<button
												onClick={() =>
													setStatus('send')
												}
												className="bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2"
											>
												{' '}
												Add Question
											</button>
										</div>
									)}
								</>
							)}
						</>
					)}
				</>
			) : (
				<form onSubmit={handleSubmit}>
					<h1 className="text-3xl font-bold m-8 flex flex-col items-center justify-center">
						Add Question
					</h1>
					<label className="font-semibold">
						Question Statement
						<input
							type="text"
							value={question}
							onChange={(event) =>
								setQuestion(event.target.value)
							}
							required
							className="w-full bg-slate-100 p-1"
						/>
					</label>
					<br />
					<label>
						Option 1:
						<input
							type="text"
							value={option1}
							required
							onChange={(event) => setOption1(event.target.value)}
							className="w-full bg-slate-100 p-1"
						/>
					</label>
					<br />
					<label>
						Option 2:
						<input
							type="text"
							value={option2}
							required
							onChange={(event) => setOption2(event.target.value)}
							className="w-full bg-slate-100 p-1"
						/>
					</label>
					<br />
					<label>
						Option 3:
						<input
							type="text"
							value={option3}
							required
							onChange={(event) => setOption3(event.target.value)}
							className="w-full bg-slate-100 p-1"
						/>
					</label>
					<br />
					<label>
						Option 4:
						<input
							type="text"
							value={option4}
							required
							onChange={(event) => setOption4(event.target.value)}
							className="w-full bg-slate-100 p-1"
						/>
					</label>
					<br />
					<label>
						Correct Option :
						<input
							type="Number"
							value={correctOption}
							required
							onChange={(event) =>
								setCorrectOption(event.target.value)
							}
							className="w-full bg-slate-100 p-1"
						/>
					</label>
					<br />
					<div className="flex flex-col items-center justify-center m-4">
						<button
							type="submit"
							className="px-16 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mx-2"
						>
							Add Question
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

AddQuestionButton.propTypes = {
	getQuestions: PropTypes.func.isRequired,
};

Question.propTypes = {
	question: PropTypes.object.isRequired,
};

const Questions = () => {
	const [questions, setQuestions] = useState([]);
	const getQuestions = async () => {
		try {
			const res = await axios.post('admin/question');
			console.log(res);
			setQuestions(res.data.Question);
			toast.success(res.data.Question.length + ' Questions fetched');
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getQuestions();
	}, []);
	return (
		<div className="container mx-auto px-4 py-8 relative">
			<AddQuestionButton getQuestions={getQuestions} />
			<>
				{questions.map((question, index) => {
					return (
						<Question
							question={question}
							key={index}
						/>
					);
				})}
			</>
		</div>
	);
};

export default Questions;
