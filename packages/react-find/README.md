# React-find

React-find can help you locate files quickly

## Demo

![React-find in action](https://raw.githubusercontent.com/mjw-git/react-find/main/demo.gif)

Of course you can use the context menu to find the current node and its parent nodes
![React-find in action](https://raw.githubusercontent.com/mjw-git/react-find/main/demo2.gif)

## Install

```shell
pnpm install react-find
```

## Start

If you use the **React 19.x**, you should use the plugin

In vite:

```typescript
//vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 添加类型声明以解决模块声明文件缺失问题
import { vitePluginReactSource } from 'react-find/next';
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [vitePluginReactSource(), react()],
});
```

Add the script to your file like `pages/app.tsx`:

You need to make sure that process.env.NODE_ENV === 'development'

```jsx
import init from 'react-find/next';

init();
```

If you use the **React 18.x** or lower version, you need't to use plugin,direct import

```typescript
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
