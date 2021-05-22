const CHILDREN = 'children';
const TEXT_ELEMENT = 'TEXT ELEMENT';

let rootInstance = null;

const render = (element, container) => {
	const prevInstance = rootInstance;
	rootInstance = reconcile(container, prevInstance, element);
};

const reconcile = (parentDom, instance, element) => {
	const newInstance = instantiate(element);

	if (instance == null) {
		parentDom.appendChild(newInstance.dom);
	} else if (element === null) {
		parentDom.removeChild(instance.dom);
		return null;
	} else if (instance.element.type === element.type) {
		updateDomProperties(instance.dom, instance.element.props, element.props);

		instance.childInstances = reconcileChildren(instance, element);
		instance.element = element;

		return instance;
	} else {
		parentDom.replaceChild(newInstance.dom, instance.dom);
	}
	return newInstance;
};

const reconcileChildren = (instance, element) => {
	const dom = instance.dom;
	const childInstances = instance.childInstances;
	const nextChildElements = element.props.children ?? [];
	const newChildInstances = [];

	const count = Math.max(childInstances.length, nextChildElements.length);

	for (let i = 0; i < count; i++) {
		const childInstance = childInstances[i];
		const childElement = nextChildElements[i];

		const newChildInstance = reconcile(dom, childInstance, childElement);
		newChildInstances.push(newChildInstance);
	}

	return newChildInstances.filter((instance) => instance);
};

const updateDomProperties = (dom, prevProps, nextProps) => {
	const isEvent = (name) => name.startsWith('on');
	const isAttribute = (name) => !isEvent(name) && name !== CHILDREN;

	const keysProps = Object.keys(prevProps);
	const nextKeysProps = Object.keys(nextProps);

	//remove event and attribute
	keysProps.forEach((name) => {
		if (isEvent(name)) {
			const eventType = name.toLowerCase().substring(2);
			dom.removeEventListener(eventType, prevProps[name]);
		} else if (isAttribute(name)) {
			dom[name] = null;
		}
	});

	nextKeysProps.forEach((name) => {
		if (isEvent(name)) {
			const eventType = name.toLowerCase().substring(2);
			dom.addEventListener(eventType, nextProps[name]);
		} else if (isAttribute(name)) {
			dom[name] = nextProps[name];
		}
	});
};

const instantiate = (element) => {
	const { type, props } = element;

	const isTextElement = type === TEXT_ELEMENT;

	const dom = isTextElement
		? document.createTextNode('')
		: document.createElement(type);

	updateDomProperties(dom, [], props);

	const childElements = props.children ?? [];

	const childInstances = childElements.map(instantiate);
	const childNodes = childInstances.map((childInstance) => childInstance.dom);

	childNodes.forEach((childDom) => dom.appendChild(childDom));

	return { dom, element, childInstances };
};

const createTextElement = (value) => {
	return createElement(TEXT_ELEMENT, { nodeValue: value });
};

const createElement = (type, config, ...args) => {
	const props = { ...config };
	const hasChildren = args?.length > 0;

	const rawChildren = (props.children = hasChildren ? [...args] : []);

	props.children = rawChildren
		.filter((attr) => attr)
		.map((attr) => (attr instanceof Object ? attr : createTextElement(attr)));

	return { type, props };
};

export { render };
