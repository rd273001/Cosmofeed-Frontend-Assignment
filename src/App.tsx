import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home';

const App: React.FC = () => {

  return (
		<Provider store={store}>
			<div className='flex flex-col min-h-screen bg-gray-100'>
				<Home />
			</div>
		</Provider>
	);
};

export default App;