import * as React from 'react';

interface TestProps {
  title: string;
  onPing: () => void;
}

const Test = ({ title, onPing }: TestProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onPing();
    }
  };

  return (
    <article className="test-card" onClick={onPing} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      <div className="test-top">
        <span className="test-chip">Nested component</span>
        <span className="test-chip test-chip-muted">Loader ready</span>
      </div>
      <h3>{title}</h3>
      <p>Inspect this component, its child blocks, or its surrounding card to validate Webpack source jumping.</p>
      <div className="test-grid">
        <div className="test-node">
          <span className="test-node-label">Current node</span>
          <strong>Action surface</strong>
        </div>
        <div className="test-node">
          <span className="test-node-label">Parent chain</span>
          <strong>Owner stack</strong>
        </div>
      </div>
    </article>
  );
};

export default Test;
