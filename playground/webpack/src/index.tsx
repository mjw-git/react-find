// index.tsx
import * as ReactDOM from 'react-dom/client';
import { init } from 'react-find/next';
import './styles.css';

import App from './App';
// console.log(process)

const root = ReactDOM.createRoot(document.getElementById('root')!);
// v18 的新方法
root.render(<App />);
init();
