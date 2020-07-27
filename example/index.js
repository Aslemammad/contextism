import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createState } from '../dist/index';

const context = createState('s');

const Div = () => {
	const cont = context.useStateContext();
	const [
		state,
		dispatch
	] = context.useStore();

	useEffect(() => {});

	return (
		<div className=''>
			here <div className=''> {state}</div>
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
