import { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ userId, score }) => {
	const [user, setUser] = useState(null);
	const getUser = async () => {
		try {
			const res = await axios.post(
				'admin/user',
				{ userId: userId },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			console.log(res);
			setUser(res.data.user);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getUser();
	}, []);
	if (!user) return <>Loading...</>;
	return (
		<div className="flex items-center bg-slate-100 justify-around m-4">
			<div className="text-2xl font-bold m-4 mr-32 flex flex-col items-center justify-center">
				{user.firstName} {user.lastName}
			</div>
			<>
				<div className="text-1xl">
					Score: {score}
				</div>
                <div className="bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2">
					{user.email}
				</div>
			</>
		</div>
	);
};

export default User;
