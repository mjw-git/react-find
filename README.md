# React-find

## Demo

React-find can help you locate files quickly

![React-find in action](https://raw.githubusercontent.com/mjw-git/react-find/main/demo.gif)

Of course you can use the context menu to find the current node and its parent nodes
![React-find in action](https://raw.githubusercontent.com/mjw-git/react-find/main/demo2.gif)

## Install

```shell
pnpm install react-find
```

## Start

Add the script to your file like `pages/app.tsx`:

You need to make sure that process.env.NODE_ENV === 'development'

```jsx
import init from 'react-find';

init();
```

Then Press the command(mac) or ctrl(win) and move your mouse to try it, click block will take you to the IDE

You also can right click to find current node and parent node which can find the source file.

If you always use the other IDE,You can init like this

```js
init({ protocol: 'cursor' });
```

## Options

| Name     | Description                                                                                              | type     | default              |
| -------- | -------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| protocol | IDE protocol                                                                                             | string   | -                    |
| keyCode  | [keyBoard keyCode](https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values) | string[] | ['Meta']/['Control'] |
