import { useState } from 'react';
import axios from 'axios';

const CreateTest = () => {
	const [status, setStatus] = useState('create');
	const [duration, setDuration] = useState(0);
	const [numQuestions, setNumQuestions] = useState(0);
	const BaseURL = 'https://localhost:3000/test/';

	const handleSubmit = async (event) => {
		event.preventDefault();
		setStatus('creating');
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const formData = {
				testDuration: duration,

				numQuestions,
			};
			const res = await axios.post(
				'http://localhost:4000/admin/test/new',
				formData,
				config,
			);
			setStatus(res.data.id);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{status !== 'create' ? (
				<>
					{status === 'creating' ? (
						<h1>Creating...</h1>
					) : (
						<div>
							<h1>Created: {status} </h1>
							<button
								onClick={() =>
									navigator.clipboard.writeText(
										BaseURL + status,
									)
								}
							>
								Copy
							</button>
						</div>
					)}
				</>
			) : (
				<form onSubmit={handleSubmit}>
					<label>
						Test Duration (minutes):
						<input
							type="number"
							value={duration}
							onChange={(event) =>
								setDuration(parseInt(event.target.value))
							}
						/>
					</label>
					<br />
					<label>
						Number of Questions:
						<input
							type="number"
							value={numQuestions}
							onChange={(event) =>
								setNumQuestions(parseInt(event.target.value))
							}
						/>
					</label>
					<br />
					<button type="submit">Create Test</button>
				</form>
			)}
		</>
	);
};

export default CreateTest;
