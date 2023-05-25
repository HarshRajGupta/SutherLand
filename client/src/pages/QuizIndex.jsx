import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
	const [testId, setTestId] = useState('');
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/quiz/${testId}`);
	};
	return (
		<>
			<div className="container justify-center align-center mx-auto px-4 py-8 relative">
				<div className="text-center">
					<form onSubmit={handleSubmit}>
						<label>
							QUIZ ID :
							<input
								className="w-full px-4 py-2 bg-gray-100 rounded  mx-2 my-2"
								type="text"
								value={testId}
								onChange={(event) =>
									setTestId(event.target.value)
								}
							/>
						</label>
						<br />

						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-indigo-700 mx-2 my-2"
						>
							Start Test
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default QuizPage;
