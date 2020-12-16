<div align="center">

<b>Contextism</b> 🤩 is a new way to use React Context better.

<br><br><img width="230" height="230" alt="picker" src="https://github.com/Aslemammad/Contextism/blob/master/logo.png?raw=true">
<br><br>
<i>Read  <a title="Team email, team chat, team tasks, one app" href="https://kentcdodds.com/blog/how-to-use-react-context-effectively">this</a> article to become familiar with the idea.</i> <br><br>
 ![License](https://img.shields.io/npm/l/contextism)
</div>

## Installation 🔥

  

```bash
npm i contextism
// or 
yarn add contextism
```

  

## Usage ✏️
We have two ways to use Contextism, Creating store using it or using its hooks directly:
### #1 createStore ✋

```javascript
// store.js 
import { createStore } from 'contextism';
const context = createStore("default value for state");
export const { Provider, useDispatchContext, useStateContext, useStore } = context;

// App.jsx
import Div from './Div'
import { Provider } from './store';

const App = () => {
	const [ state, dispatch ] = React.useState("Value for state"); // or useReducer
	
	return (
		<Provider state={state} dispatch={dispatch}>
			// Components you want to use the state there.
			<Div />
		</Provider>
		)
}

// Div.jsx
import { useStateContext, useDispatchContext, useStore } from './store';

const Div = () => {
	const state = useStateContext(); // "Value for state"
	const dispatch = useDispatchContext(); // dispatch function (setState) in App
	// or better one
	const [state, dispatch] = useStore();
	
	return ...
}

```
When we create store using Contextism, it gives us 3 hooks :<br>

- **useStateContext**: the state value that we gave it to state prop in Provider component
- **useDispatchContext**: the setState function or useReducer dispatch that we passed it to dispatch prop
- **useStore**: returns us an array with two values of the above hooks; `[ useStateContext, useDispatchContext ]`

  ***NOTE***: you should use these hooks( methods of createStore function) in child components of *Provider* component.
  <br>

  
### #2 default hooks ✋
Contextism has two hooks beside createStore function:

- **useContext**: takes a React context and returns the value
- **useStore**: takes two React contexts and returns two values of them, the same thing like in the above way but with two arguments

```javascript
// Store.jsx
export const CountStateContext = React.createContext();
export const CountDispatchContext = React.createContext();
function countReducer(state, action) {
  ...
}

export function CountProvider({children}) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0});
  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}
// App.jsx
import { CountProvider } from './Store';
import Div from './Div';
export function App() {
	return (
		<CountProvider>
		<Div />
		</CountProvider>
	)

}
// Div.jsx
import { CountStateContext, CountDispatchContext } from './Store';
import { useContext, useStore} from 'contextism';

export function Div() {
	const state = useContext(CountStateContext);
	const dispatch = useContext(CountDispatchContext);
	// Or much better:
	const [state, dispatch] = useStore(CountStateContext,CountDispatchContext);
	
	return ...

}
```
## Typescript 🔷
Contextism has Typescript support like generics and ... . in **createStore** you can pass two generics too, first one for the state structure and interface, the second one for the useReducer hook.

```javascript
type Action = {type: 'increment'} | {type: 'decrement'}
type State = { count: number }
// The second generic is for useReducer Action
const context = createStore<State, Action>();

// For useState just pass the first generic (State interface generic)
const context = createStore<State>();
```
## Donation
You can support me and my projects with [Open Collecive](https://opencollective.com/contextism).

## Contribution 
I'm developer, not a perfect person, so I make much mistakes, it means that be free to create issues and then PRs.
<br>
## Thanks ❤️ 

Special thanks for contributing and using this project.
