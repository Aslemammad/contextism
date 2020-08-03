import * as React from 'react';

export const useContext = <S>(context: React.Context<S | undefined>) => {
	if (!context) {
		throw new Error('react-use-context-hook: ❌ pass a context to the useState hook.');
	}
	return React.useContext<S | undefined>(context) as S;
};
export const useStore = <S, D>(state?: React.Context<S | undefined>, dispatch?: React.Context<D | undefined>) => {
	if (!state || !dispatch) {
		throw new Error('react-use-context-hook: ❌ pass two contexts to the useAllState hook.');
	}
	return [
		React.useContext<S | undefined>(state),
		React.useContext<D | undefined>(dispatch)
	] as [S, D];
};
