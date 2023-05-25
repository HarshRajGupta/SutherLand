import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const AdminPanel = ({ user, setUser }) => {
	const logoutHandler = async () => {
		await axios.post('/auth/logout');
		setUser(null);
		localStorage.removeItem('user');
	};
	return (
		<>
			<Header
				user={user}
				setUser={setUser}
			/>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-4xl font-bold mb-8">Assessment Test</h1>
				<div className="space-y-4">
					{!user || !user.isAdmin ? (
						<div onClick={logoutHandler}>
							<Link to="/login">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
									Login as Admin
								</button>
							</Link>
						</div>
					) : (
						<>
							<Link to="/test">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
									Test
								</button>
							</Link>
							<Link to="/question">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2">
									Question
								</button>
							</Link>
							
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default AdminPanel;
