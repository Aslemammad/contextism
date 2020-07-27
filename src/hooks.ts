import * as React from 'react';

export const useContext = (defaultContext: React.Context<any> | undefined, context?: React.Context<any>) => {
	if (!context && !defaultContext) {
		throw new Error('react-use-context-hook: ❌ pass a context to the useState hook.');
	}
	return React.useContext(context || (defaultContext as React.Context<any>));
};
export const useStore = (state: React.Context<any>, dispatch: React.Context<any>) => {
	if (!state || !dispatch) {
		throw new Error('react-use-context-hook: ❌ pass two contexts to the useAllState hook.');
	}
	return [
		React.useContext(state),
		React.useContext(dispatch)
	];
};
