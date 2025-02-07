// index.tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {init} from 'react-find/next'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)
// v18 的新方法
root.render(<App />)
init()


