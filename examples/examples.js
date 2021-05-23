import { render } from '../src/didact';

const element = {
	type: 'div',
	props: {
		id: 'container',
		children: [
			{ type: 'input', props: { value: 'foo', type: 'text' } },
			{
				type: 'img',
				props: {
					src: 'https://avatars.githubusercontent.com/u/46106134?s=60&v=4',
				},
			},
			{
				type: 'div',
				props: {
					style: 'background:red',
					children: [{ type: 'TEXT ELEMENT', props: { nodeValue: 'bar' } }],
				},
			},
			{
				type: 'span',
				props: {
					style: 'cursor: pointer',
					onClick: (e) => console.log(e),
					children: [
						{ type: 'TEXT ELEMENT', props: { nodeValue: 'click me' } },
					],
				},
			},
		],
	},
};

render(element, document.getElementById('root'));
