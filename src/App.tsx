import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home';
import Header from './components/Header';

const App: React.FC = () => {

	return (
		<Provider store={ store }>
			<div className='flex flex-col min-h-screen bg-gray-100'>
				<Header />

				<main className='flex flex-col flex-1'>
					<Home />
				</main>
			</div>
		</Provider>
	);
};

export default App;