import { useState } from 'react';
import './App.css';
import Test from './components/Test';

const stats = [
  { value: 'Ctrl / Command', label: 'Enable the overlay', tone: 'accent' },
  { value: 'Left click', label: 'Jump into your editor', tone: 'success' },
  { value: 'Right click', label: 'Walk parent ownership', tone: 'warm' },
];

const workflow = [
  {
    title: 'Target the exact node',
    copy: 'Hover cards, buttons, links, and nested blocks to see how source mapping behaves on real UI.',
  },
  {
    title: 'Open the current file',
    copy: 'Click the highlighted area to jump directly to the source line that rendered the current node.',
  },
  {
    title: 'Inspect parent owners',
    copy: 'Use the context menu to move upward through the component tree without leaving the page.',
  },
];

const hotspots = [
  { path: 'src/App.tsx', copy: 'Hero shell and interactive counter' },
  { path: 'src/components/Test/index.tsx', copy: 'Nested clickable component' },
  { path: 'src/main.tsx', copy: 'Bootstrapping and init entry' },
];

function App() {
  const [count, setCount] = useState(6);

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <div className="badge-row">
            <span className="badge">React Find Demo</span>
            <span className="badge badge-muted">Vite + React 19</span>
          </div>
          <h1>Trace every rendered node back to its source in seconds.</h1>
          <p className="hero-text">
            This playground is styled like a compact devtools landing page so you can test source jumping on
            nested components, state updates, and mixed interaction surfaces without looking at starter-kit UI.
          </p>
          <div className="hero-actions">
            <a
              className="primary-action"
              href="https://github.com/mjw-git/react-find"
              target="_blank"
              rel="noreferrer"
            >
              View project
            </a>
            <a className="secondary-action" href="https://vite.dev" target="_blank" rel="noreferrer">
              Vite docs
            </a>
            <a className="secondary-action" href="https://react.dev" target="_blank" rel="noreferrer">
              React docs
            </a>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map(item => (
            <article key={item.value} className={`stat-card stat-card-${item.tone}`}>
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </article>
          ))}
        </div>
      </header>

      <main className="content-grid">
        <section className="showcase-card">
          <div className="section-heading">
            <div>
              <p className="section-label">Live Surface</p>
              <h2>Inspect nested components in place</h2>
            </div>
            <span className="status-pill">source-file-path active</span>
          </div>

          <div className="demo-frame">
            <div className="demo-frame-bar">
              <span>hover target</span>
              <span>open in IDE</span>
            </div>

            <div className="demo-layout">
              <div className="demo-stack">
                <article className="demo-card demo-card-highlight">
                  <p className="mini-label">Nested owner chain</p>
                  <h3>Interactive component cluster</h3>
                  <p className="card-copy">
                    Use the overlay on this card, the nested component below, or the counter trigger to test
                    current-node jumps and parent traversal.
                  </p>
                  <Test
                    aa="Inspector Event Stream"
                    fn={() => {
                      console.log(Date.now());
                    }}
                  />
                </article>

                <article className="demo-card demo-card-muted">
                  <div className="counter-header">
                    <div>
                      <p className="mini-label">State updates</p>
                      <h3>Count trigger</h3>
                    </div>
                    <span className="counter-signal">Live</span>
                  </div>
                  <button className="count-button" onClick={() => setCount(value => value + 1)}>
                    <span>count is {count}</span>
                    <span>Trigger render</span>
                  </button>
                  <p className="card-copy">
                    Edit <code>src/App.tsx</code> and save to test HMR, then inspect the refreshed DOM to verify
                    mappings are still correct.
                  </p>
                </article>
              </div>

              <div className="demo-side">
                <article className="terminal-card">
                  <div className="terminal-top">
                    <div className="terminal-lights">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="terminal-title">tracked files</span>
                  </div>
                  <pre>
{`src/App.tsx
src/components/Test/index.tsx
src/main.tsx`}
                  </pre>
                </article>
                <canvas className="scan-canvas" aria-hidden="true"></canvas>
              </div>
            </div>
          </div>
        </section>

        <aside className="sidebar-stack">
          <section className="info-card">
            <p className="section-label">Inspection Workflow</p>
            <ol className="workflow-list">
              {workflow.map((item, index) => (
                <li key={item.title} className="workflow-item">
                  <span className="workflow-step">{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="info-card">
            <p className="section-label">Hotspots</p>
            <div className="hotspot-list">
              {hotspots.map(item => (
                <article key={item.path} className="hotspot-item">
                  <p className="hotspot-path">{item.path}</p>
                  <p className="hotspot-copy">{item.copy}</p>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}

export default App;
