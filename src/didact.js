const CHILDREN = 'children';
const TEXT_ELEMENT = 'TEXT_ELEMENT';

const createElement = (type, props, ...children) => {
	return {
		type,
		props: {
			...props,
			children: children.map((child) => {
				return typeof child === 'object' ? child : createTextElement(child);
			}),
		},
	};
};

const createTextElement = (text) => {
	return {
		type: TEXT_ELEMENT,
		props: {
			nodeValue: text,
			children: [],
		},
	};
};

const render = (element, container) => {
	const dom =
		element.type === TEXT_ELEMENT
			? document.createTextNode('')
			: document.createElement(element.type);

	const isProperty = (key) => key !== CHILDREN;

	Object.keys(element.props)
		.filter(isProperty)
		.forEach((name) => {
			dom[name] = element.props[name];
		});

	element.props.children.forEach((child) => {
		render(child, dom);
	});
	container.appendChild(dom);
};

let nextUnitOfWork = null;

const workLoop = (deadline) => {
	let shouldYield = false;

	while (nextUnitOfWork && !shouldYield) {
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
		shouldYield = deadline.timeRemaining() < 1;
	}
	requestIdleCallback(workLoop);
};

requestIdleCallback(workLoop);

const performUnitOfWork = (nextUnitOfWork) => {};

export { render, createElement };
