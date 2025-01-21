# React-find

React-find can help you locate files quickly

![React-find in action](https://raw.githubusercontent.com/mjw-git/react-find/main/demo.gif)

Of course you can use the context menu to find the current node and its parent nodes
![React-find in action](https://raw.githubusercontent.com/mjw-git/react-find/main/demo2.gif)

## Install

```shell
pnpm install react-find
```

Add the script to your file like `pages/app.tsx`:

```jsx
import init from 'react-find';

init();
```

Then Press the command(mac) or ctrl(win) to try it

If you always use the other IDE,You can init like this

```js
init({ protocol: 'cursor' });
```

## Options

| Name     | Description                                                                                              | type     | default  |
| -------- | -------------------------------------------------------------------------------------------------------- | -------- | -------- |
| protocol | IDE protocol                                                                                             | string   | -        |
| keyCode  | [keyBoard keyCode](https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values) | string[] | ['Meta'] |
