import { Profiler, useState } from 'react';
import './App.css';
import Test from './components/Test';

const stats = [
  { value: 'Classic fiber path', label: 'Inspect React 18 trees', tone: 'accent' },
  { value: 'Left click', label: 'Open current source line', tone: 'success' },
  { value: 'Context menu', label: 'Inspect parent ownership', tone: 'warm' },
];

const workflow = [
  {
    title: 'Hover the target',
    copy: 'Use the overlay on nested cards, buttons, and text blocks to inspect generated React 18 output.',
  },
  {
    title: 'Click for source',
    copy: 'The current node opens directly in your IDE through the configured protocol.',
  },
  {
    title: 'Traverse the tree',
    copy: 'Right click to inspect parent nodes and compare how ownership changes across nested components.',
  },
];

const hotspots = [
  { path: 'src/App.tsx', copy: 'Profiler shell, hero panel, and counter' },
  { path: 'src/components/Test/index.tsx', copy: 'Nested interactive owner target' },
  { path: 'src/main.tsx', copy: 'React 18 init flow' },
];

function App() {
  const [count, setCount] = useState(4);

  return (
    <Profiler
      id="react-find-demo"
      onRender={(id, phase, ...params) => {
        console.log(id, phase, params);
      }}
    >
      <div className="app-shell">
        <header className="hero-panel">
          <div className="hero-copy">
            <div className="badge-row">
              <span className="badge">React Find Demo</span>
              <span className="badge badge-muted">Vite + React 18</span>
            </div>
            <h1>Inspect React 18 output without giving up polish.</h1>
            <p className="hero-text">
              This playground keeps the classic fiber path visible while giving you a deliberate surface for
              testing source jumps on stateful, nested, and profiler-wrapped components.
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
                <p className="section-label">Profiler Surface</p>
                <h2>Use a styled sandbox for fiber-based inspection</h2>
              </div>
              <span className="status-pill">React 18 mode</span>
            </div>

            <div className="demo-frame">
              <div className="demo-frame-bar">
                <span>hover target</span>
                <span>fiber debug source</span>
              </div>

              <div className="demo-layout">
                <div className="demo-stack">
                  <article className="demo-card demo-card-highlight">
                    <p className="mini-label">Nested owner chain</p>
                    <h3>Interactive component cluster</h3>
                    <p className="card-copy">
                      Inspect the nested component, then compare the current node with its parent owners from the
                      context menu.
                    </p>
                    <Test
                      aa="Profiler Event Stream"
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
                      Use this control to generate updates, then inspect the button or its surrounding card to
                      confirm mapping stability.
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
    </Profiler>
  );
}

export default App;
