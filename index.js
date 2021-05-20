const CHILDREN = 'children';
export const TEXT_ELEMENT = 'TEXT ELEMENT';

export const render = (element, parentDom) => {
	const { type, props } = element;

	const isTextElement = type === TEXT_ELEMENT;

	const dom = isTextElement
		? document.createTextNode('')
		: document.createElement(type);

	const isListener = (name) => name.startsWith('on');

	const keysProps = Object.keys(props);

	keysProps.filter(isListener).forEach((name) => {
		const eventType = name.toLowerCase().substring(2);
		dom.addEventListener(eventType, props[name]);
	});

	const isAttribute = (name) => !isListener(name) && name !== CHILDREN;
	keysProps.filter(isAttribute).forEach((name) => {
		dom[name] = props[name];
	});

	const childElements = props.children ?? [];
	childElements.forEach((childElement) => render(childElement, dom));

	parentDom.appendChild(dom);
};
