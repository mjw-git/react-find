# React-find

English | [简体中文](./README.ZH-CN.md)
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

If you use the **React 19.x** or higher version, you should use the plugin

In Vite:

```typescript
//vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 添加类型声明以解决模块声明文件缺失问题
import { vitePluginReactSource } from 'react-find/vite';
// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [vitePluginReactSource(), react()],
});
```

In Webpack

```typescript
 {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          },{
            loader: require.resolve('react-find/webpack/webpack-react-source-loader')
          }
        ]
      },
```

Add the script to your file like `pages/app.tsx`:

```jsx
import { init } from 'react-find/next';

init();
```

If you use **React 18.x**, you don't need to use the loader, but you need to import react-find/next

```typescript
import { init } from 'react-find/next';

init();
```

If you use the **React 17.x** or lower version, you need't to use the plugin,direct import

```typescript
import init from 'react-find';

init();
```

In nextjs,use the webpack-react-source-loader

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'react-find/webpack/webpack-react-source-loader',
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
```

If you use the **`turbopack`**, you can use the following configuration

```
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.tsx': {
        loaders: ['react-find/webpack/webpack-react-source-loader'],
      },

      '*.jsx': {
        loaders: ['react-find/webpack/webpack-react-source-loader'],
      },
    },
  },
};

export default nextConfig;

```

You should create a client Component to init it

```typescript
"use client"

import { PropsWithChildren, useEffect } from "react"
import {init} from 'react-find/next'
const Profile=(props:PropsWithChildren)=>{
    useEffect(()=>{
        init()
    },[])
    return <div>{props.children}</div>

}
export default Profile

```

Then use it in your layout component

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
      >
        <Profile>
            {children}
        </Profile>

      </body>
    </html>
  );
}
```

Then Press the command(mac) or ctrl(win) and move your mouse to try it, click block will take you to the IDE

You also can right click to find current node and parent node which can find the source file.

If you always use the other IDE,You can init like this, or set the key `react_find_protocol` in localStorage

```js
init({ protocol: 'cursor' });
```

## Tips

- It only work that process.env.NODE_ENV === 'development'

## Options

| Name     | Description                                                                                              | type     | default              |
| -------- | -------------------------------------------------------------------------------------------------------- | -------- | -------------------- |
| protocol | IDE protocol                                                                                             | string   | -                    |
| keyCode  | [keyBoard keyCode](https://developer.mozilla.org/zh-CN/docs/Web/API/UI_Events/Keyboard_event_key_values) | string[] | ['Meta']/['Control'] |
