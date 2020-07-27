import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '../dist/index';

const context = createStore('s');

const Div = () => {
	const cont = context.useStateContext();
	const [
		state,
		dispatch
	] = context.useStore();

	return (
		<div className=''>
			<div className=''> {state}</div>
		</div>
	);
};
const App = () => {
	const [
		state,
		dispatch
	] = React.useState('23');

	return (
		<div className=''>
			<context.Provider state={state} dispatch={dispatch}>
				<Div />
			</context.Provider>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
