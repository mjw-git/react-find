import * as React from 'react';
import Test from './components/Test';

const workflow = [
  {
    title: 'Hover a nested surface',
    copy: 'Use the loader-powered demo card, tags, and buttons to verify source mapping in Webpack builds.',
  },
  {
    title: 'Jump to the current source',
    copy: 'Click the highlighted node to open the current file in your configured editor.',
  },
  {
    title: 'Walk the owner chain',
    copy: 'Open the context menu to compare current and parent nodes without leaving the demo page.',
  },
];

const files = [
  { path: 'src/App.tsx', copy: 'Page shell and stateful controls' },
  { path: 'src/components/Test.tsx', copy: 'Nested loader target' },
  { path: 'src/index.tsx', copy: 'React mount and init entry' },
];

const App: React.FC = () => {
  const [count, setCount] = React.useState(5);

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <div className="badge-row">
            <span className="badge">React Find Demo</span>
            <span className="badge badge-muted">Webpack 5</span>
          </div>
          <h1>Make the Webpack demo feel like a real product surface.</h1>
          <p className="hero-text">
            This version keeps the loader integration front and center while giving you polished cards, nested
            states, and enough structure to test source jumps beyond placeholder text.
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
            <a className="secondary-action" href="https://webpack.js.org" target="_blank" rel="noreferrer">
              Webpack docs
            </a>
          </div>
        </div>

        <div className="stats-grid">
          <article className="stat-card stat-card-accent">
            <p className="stat-value">Loader enabled</p>
            <p className="stat-label">JSX nodes get source-file-path attributes</p>
          </article>
          <article className="stat-card stat-card-success">
            <p className="stat-value">Left click</p>
            <p className="stat-label">Open the current file in your IDE</p>
          </article>
          <article className="stat-card stat-card-warm">
            <p className="stat-value">Right click</p>
            <p className="stat-label">Inspect parent ownership</p>
          </article>
        </div>
      </header>

      <main className="content-grid">
        <section className="showcase-card">
          <div className="section-heading">
            <div>
              <p className="section-label">Loader Surface</p>
              <h2>Inspect nested JSX rendered through Webpack</h2>
            </div>
            <span className="status-pill">webpack-react-source-loader</span>
          </div>

          <div className="demo-frame">
            <div className="demo-frame-bar">
              <span>loader target</span>
              <span>owner aware</span>
            </div>
            <div className="demo-layout">
              <div className="demo-stack">
                <article className="demo-card demo-card-highlight">
                  <p className="mini-label">Nested component</p>
                  <h3>Interactive loader sandbox</h3>
                  <p className="card-copy">
                    Inspect this card, the nested component below, or the counter trigger to validate that the
                    Webpack loader preserves useful source mapping.
                  </p>
                  <Test
                    title="Webpack loader surface"
                    onPing={() => {
                      console.log('webpack demo ping');
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
                    Trigger re-renders, then inspect the button or parent card to compare file ownership in the
                    loader demo.
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
src/components/Test.tsx
src/index.tsx`}
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
              {files.map(item => (
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
};

export default App;
