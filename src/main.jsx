import { render, createElement } from './didact.js';
/** @jsx createElement */

const updateValue = (e) => {
	rerender(e.target.value);
};

const container = document.getElementById('root');
const rerender = (value) => {
	const element = (
		<div>
			<input onInput={updateValue} value={value} />
			<h2>Hello {value}</h2>
		</div>
	);

	render(element, container);
};

rerender('world');
