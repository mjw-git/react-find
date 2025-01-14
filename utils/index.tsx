/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

import { version, type CSSProperties, type ReactElement } from 'react';
import { render } from 'react-dom';
import SelectModal from './SelectModal';

interface ParamsProps {
  protocol?: string;
  keyCode?: string[];
}
const init = (params?: ParamsProps) => {
  if (process.env.NODE_ENV !== 'development') return;
  const { protocol, keyCode = ['Meta'] } = params || {};

  const body = document.body;
  let current: HTMLElement | null = null;
  let keyDown = false;
  let root: { render: any } | null = null;
  const createRootDom = () => {
    const dom = document.querySelector('#react-find-wrapper');
    if (dom) {
      return dom;
    } else {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('id', 'react-find-wrapper');
      wrapper.style.position = 'absolute';
      wrapper.style.top = `0px`;
      //   wrapper.style.background = 'red';
      wrapper.style.left = `0px`;
      document.body.appendChild(wrapper);
      return wrapper;
    }
  };
  const rootDom = createRootDom();

  if (Number(version.split('.')[0]) <= 17) {
    root = { render: (v: null | JSX.Element | ReactElement) => render(v as any, rootDom) };
  } else {
    const reactDom = require('react-dom/client');

    root = reactDom.createRoot(rootDom);
  }

  const clear = () => {
    root?.render(null);
    keyDown = false;
  };

  const findReactFiberAttr = (node: HTMLElement) => {
    for (const prop in node) {
      if (prop.startsWith('__reactFiber')) {
        return node[prop as keyof HTMLElement];
      }
    }
  };

  const findParentNodeFileAttr = (node: HTMLElement) => {
    let _node: HTMLElement | null = node;
    let attr = findReactFiberAttr(_node) as unknown as { _debugSource: Record<string, string> };

    while (
      !attr?._debugSource?.fileName &&
      _node &&
      _node.parentElement !== body &&
      _node !== body &&
      !rootDom.contains(_node) &&
      rootDom !== _node
    ) {
      _node = _node.parentElement;
      attr = findReactFiberAttr(_node!) as unknown as { _debugSource: Record<string, string> };
    }
    return { attr, _node, currentNode: node };
  };

  const renderRect = () => {
    if (keyDown && current && document.body.contains(current)) {
      const rootDom = createRootDom();
      const { attr, _node } = findParentNodeFileAttr(current);
      if (attr && _node && _node !== rootDom && !rootDom.contains(_node) && rootDom !== _node) {
        const rect = _node.getBoundingClientRect();
        const customStyle: CSSProperties = {
          wordBreak: 'break-all',
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          opacity: 0.2,
          background: '#8250DF',
          zIndex: 9999,
          border: '1px dashed #8250DF',
        };
        root?.render(
          <SelectModal
            onSuccess={() => {
              clear();
            }}
            protocol={protocol}
            filePath={`${attr?._debugSource?.fileName}:${attr?._debugSource?.lineNumber}`}
            style={customStyle}
          />,
        );
      }
    }
  };

  document.addEventListener('keydown', (e) => {
    if (keyCode.includes(e.key)) {
      keyDown = true;
      renderRect();
    } else {
      clear();
    }
  });

  document.addEventListener('keyup', () => {
    clear();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clear();
    }
  });
  window.addEventListener('blur', () => {
    clear();
  });
  document.addEventListener('mousemove', (e) => {
    if (e.target && (rootDom === e.target || rootDom.contains(e.target as HTMLElement))) {
      return;
    }
    if (e.target === current) {
      return;
    }
    current = e.target as HTMLElement;
    renderRect();
  });
};
export default init;
