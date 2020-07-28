import * as React from 'react';
import { useContext, useStore } from './hooks';
const createStore = <T, U>(defaultState?: T, defaultDispatch?: U) => {
	const stateContext = React.createContext<T | undefined>(defaultState);
	const dispatchContext = React.createContext<U | undefined>(defaultDispatch);
	return {
		stateContext,
		dispatchContext,
		useStateContext: useContext.bind(null, stateContext),
		useDispatchContext: useContext.bind(null, dispatchContext),
		useStore: useStore.bind(null, stateContext, dispatchContext),
		Provider: ({ state, dispatch, children }: { state: T; dispatch?: U; children?: React.ReactChildren | React.ReactNode }) => {
			return (
				<stateContext.Provider value={state}>
					<dispatchContext.Provider value={dispatch}>{children}</dispatchContext.Provider>
				</stateContext.Provider>
			);
		}
	};
};

export default createStore;
