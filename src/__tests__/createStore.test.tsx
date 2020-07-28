import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import createStore from '../createStore';

const { Provider, useStore } = createStore();

const App = ({ initialValue }: { initialValue: number }) => {
	const [state, dispatch] = React.useState(initialValue);

	return (
		<Provider state={state} dispatch={dispatch}>
      <Counter />
    </Provider>
	);
};

const Counter = () => {
	const [count, dispatch] = useStore();

	return (
		<button onClick={() => dispatch(count + 1)} data-testid="counter">
      {count}
    </button>
	);
};


afterEach(cleanup);

describe('SeeMore', () => {
  it('is able to read from the store', () => {
    const value = 1;
    const { getByText } = render(<App initialValue={value} />);

    expect(getByText(value.toString())).toBeTruthy();
  });

  it('is able to update the store', async () => {
    const value = 1;
    const { getByText, getByTestId } = render(<App initialValue={value} />);

    fireEvent.click(getByTestId('counter'));
    await waitFor(() => expect(getByText((value + 1).toString())).toBeTruthy());

    fireEvent.click(getByTestId('counter'));
    await waitFor(() => expect(getByText((value + 2).toString())).toBeTruthy());
  });
});
