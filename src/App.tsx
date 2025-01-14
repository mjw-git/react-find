import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Test from './components/Test';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Test
          aa="ddd"
          fn={() => {
            console.log(Date.now());
          }}
        />
        <a href="https://vite.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <canvas style={{ width: 300, height: 300, border: '1px solid red' }}></canvas>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
