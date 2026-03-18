import type { KeyboardEvent } from 'react';

const Test = (props: { aa: string; fn: () => void }) => {
  const { aa, fn } = props;

  const handleTrigger = () => {
    fn?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTrigger();
    }
  };

  return (
    <article className="test-card" onClick={handleTrigger} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      <div className="test-top">
        <span className="test-chip">Nested component</span>
        <span className="test-chip test-chip-muted">Owner aware</span>
      </div>
      <h3>{aa}</h3>
      <p>Use react-find on this card, its CTA, or the child blocks below to trace the owner stack.</p>
      <div className="test-grid">
        <div className="test-node">
          <span className="test-node-label">Current node</span>
          <strong>Action surface</strong>
        </div>
        <div className="test-node">
          <span className="test-node-label">Parent chain</span>
          <strong>Open source tree</strong>
        </div>
      </div>
    </article>
  );
};

export default Test;
