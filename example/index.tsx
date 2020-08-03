import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '../dist/index';

export interface Player {
	points: number;
}

export interface Store {
	sound: boolean;
	persian: boolean;
	difficulty: number;
	round: number;
	playerOne: Player;
	playerTwo?: Player;
}
type Action = { type: 'increment' | 'decrement' }
type Dispatch = (action: Action) => void
type State = { count: number }
type CountProviderProps = { children: React.ReactNode }

const context = createStore<Store>();
const redContext = createStore<State, Action>();
const Div = () => {
	const [
		state,
		dispatch
	] = context.useStore();
	const [red, redDispatch] = redContext.useStore();


	console.log(state, dispatch, red, redDispatch)
	return (
		<div className='' onClick={() => redDispatch({ type: 'decrement' } as any)}>
			See the console
		</div>
	);
};

function countReducer(state: State, action: Action) {
	switch (action.type) {
		case 'increment': {
			return { count: state.count + 1 }
		}
		case 'decrement': {
			return { count: state.count - 1 }
		}
		default: {
			throw new Error(`Unhandled action type:`)
		}
	}
}
// TODO Complete the Reducer option 
const App = () => {
	const [
		state,
		dispatch
	] = React.useState<Store>({ sound: true, persian: true, difficulty: 1, round: 1, playerOne: { points: 0 } });
	const [red, redDispatch] = React.useReducer(countReducer, { count: 0 })

	return (
		<div className=''>
			<context.Provider state={state} dispatch={dispatch}>
				<redContext.Provider state={red} dispatch={redDispatch} >

					<Div />
				</redContext.Provider>

			</context.Provider>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
