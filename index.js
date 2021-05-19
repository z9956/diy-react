const render = (element, parentDom) => {
  const { type, props } = element;
  const dom = document.createElement(type);
  const childElements = props.children ?? [];

  childElements.forEach(childElement => render(childElement, dom));
  parentDom.appendChild(dom);
};


