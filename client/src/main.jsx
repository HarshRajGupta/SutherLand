import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from './UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<UserContextProvider>
			<App />
		</UserContextProvider>
		<ToastContainer />
	</>,
);
