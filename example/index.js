import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore, useContext } from '../dist/index';

const context = createStore(undefined);
const reactContext = React.createContext(undefined);
const Div = () => {
	const cont = context.useStateContext();
	const [
		state,
		dispatch
	] = context.useStore();
	const reactState = useContext(reactContext);
	return (
		<div className=''>
			<div className=''>
				Contextism: {state} React Context: {reactState}{' '}
			</div>
		</div>
	);
};
const App = () => {
	const [
		state,
		dispatch
	] = React.useState(0);
	const [
		reactState,
		reactSetState
	] = React.useState(0);
	return (
		<div className=''>
			<reactContext.Provider value={reactState}>
				<context.Provider state={state} dispatch={dispatch}>
					<Div />
				</context.Provider>
			</reactContext.Provider>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
