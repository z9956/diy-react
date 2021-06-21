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

const createDom = (fiber) => {
	const dom =
		fiber.type === TEXT_ELEMENT
			? document.createTextNode('')
			: document.createElement(fiber.type);

	const isProperty = (key) => key !== CHILDREN;

	Object.keys(fiber.props)
		.filter(isProperty)
		.forEach((name) => {
			dom[name] = fiber.props[name];
		});

	return dom;
};

const render = (element, container) => {
	wipRoot = {
		dom: container,
		props: {
			children: [element],
		},
	};
	nextUnitOfWork = wipRoot;
};

let nextUnitOfWork = null;
let wipRoot = null;

const workLoop = (deadline) => {
	let shouldYield = false;

	while (nextUnitOfWork && !shouldYield) {
		nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
		shouldYield = deadline.timeRemaining() < 1;
	}
	if (!nextUnitOfWork && wipRoot) {
		commitRoot();
	}
	requestIdleCallback(workLoop);
};

requestIdleCallback(workLoop);

const commitRoot = () => {
	commitWork(wipRoot.child);
	wipRoot = null;
};

const commitWork = (fiber) => {
	if (!fiber) return;

	const domParent = fiber.parent.dom;
	domParent.appendChild(fiber.dom);
	commitWork(fiber.child);
	commitWork(fiber.sibling);
};

const performUnitOfWork = (fiber) => {
	if (!fiber.dom) {
		fiber.dom = createDom(fiber);
	}

	const elements = fiber.props.children;
	let index = 0;
	let prevSibling = null;

	while (index < elements.length) {
		const element = elements[index];

		const newFiber = {
			type: element.type,
			props: element.props,
			parent: fiber,
			dom: null,
		};

		if (index === 0) {
			fiber.child = newFiber;
		} else {
			prevSibling.sibling = newFiber;
		}

		prevSibling = newFiber;
		index++;
	}

	if (fiber.child) {
		return fiber.child;
	}

	let nextFiber = fiber;
	while (nextFiber) {
		if (nextFiber.sibling) {
			return nextFiber.sibling;
		}
		nextFiber = nextFiber.parent;
	}
};

export { render, createElement };
