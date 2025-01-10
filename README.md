# React-find

React-find can help you locate files quickly

![React-find in action](https://raw.githubusercontent.com/mjw-git/react-find/main/demo.gif)


## Install


```shell
pnpm install react-find -D
```

Add the script to your file like `pages/app.tsx`:

```jsx
import init from 'react-find'

init()
```
Then Press the command(mac) or ctrl(win) to try it

If you use the cursor,You can init like this,it's default to vscode

```js
init({protocol:'cursor'})
```