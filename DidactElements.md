### Didact元素

```javascript
const element = {
  type: "div",
  props: {
    id: "container",
    children: [
      { type: "input", props: { value: "foo", type: "text" } },
      { type: "a", props: { href: "https://tse1-mm.cn.bing.net/th?id=OIP._S9AReGNMmBZ2eGcHlSr-gHaEo&w=145&h=100&c=8&rs=1&qlt=90&pid=3.1&rm=2" } },
      { type: "span", props: {} }
    ]
  }
};
```

```html
<div id="container">
  <input value="foo" type="text">
  <a href="https://tse1-mm.cn.bing.net/th?id=OIP._S9AReGNMmBZ2eGcHlSr-gHaEo&w=145&h=100&c=8&rs=1&qlt=90&pid=3.1&rm=2"></a>
  <span></span>
</div>
```
