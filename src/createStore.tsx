import * as React from 'react';
import { useContext, useStore } from './hooks';
const createStore = <S, A = {}>(defaultState?: S) => {
	type Reducer = React.Dispatch<A>;
	type Dispatch = React.Dispatch<React.SetStateAction<S>>;
	const stateContext = React.createContext<S | undefined>(defaultState);
	const dispatchContext = React.createContext<Dispatch | Reducer | undefined>(undefined);
	return {
		stateContext,
		dispatchContext,
		useStateContext: () => useContext<S>(stateContext),
		useDispatchContext: () => useContext<Reducer | Dispatch>(dispatchContext),
		useStore: () => useStore<S, Dispatch | Reducer>(stateContext, dispatchContext),
		Provider: ({
			state,
			dispatch,
			children
		}: {
			state: S;
			dispatch?: Dispatch | Reducer;
			children?: React.ReactChildren | React.ReactNode;
		}) => {
			return (
				<stateContext.Provider value={state}>
					<dispatchContext.Provider value={dispatch}>{children}</dispatchContext.Provider>
				</stateContext.Provider>
			);
		}
	}

};

export default createStore;
