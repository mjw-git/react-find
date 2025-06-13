/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

import { type CSSProperties, type ReactElement } from 'react';
import { render } from 'react-dom';
import SelectModal from './SelectModal';

interface ParamsProps {
  protocol?: string;
  keyCode?: string[];
  remoteServerName?: string;
}
export interface FiberNode {
  type: string | { name: string; render: { name: string } };
  _debugOwner: FiberNode;
  _debugSource: {
    columnNumber: number;
    lineNumber: number;
    fileName: string;
  };
}

const init = (params?: ParamsProps) => {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return;
  const isMac = function () {
    return /macintosh|mac os x/i.test(navigator.userAgent);
  };
  const DEFAULT_KEY_CODE = isMac() ? ['Meta'] : ['Control'];
  const { protocol, keyCode = DEFAULT_KEY_CODE, remoteServerName } = params || {};

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

  root = { render: (v: null | JSX.Element | ReactElement) => render(v as any, rootDom) };

  const clear = () => {
    root?.render(null);
    keyDown = false;
  };

  const findReactFiberAttr = (node: HTMLElement): FiberNode | undefined => {
    for (const prop in node) {
      if (prop.startsWith('__reactFiber')) {
        return node[prop as keyof HTMLElement] as unknown as FiberNode;
      }
    }
  };

  const findParentNodeFileAttr = (node: HTMLElement) => {
    const list: FiberNode[] = [];
    let _node: HTMLElement | null = node;
    let attr = findReactFiberAttr(_node);
    while (
      !attr &&
      _node &&
      _node.parentElement !== body &&
      _node !== body &&
      !rootDom.contains(_node) &&
      rootDom !== _node
    ) {
      _node = _node.parentElement;
      if (_node) {
        attr = findReactFiberAttr(_node);
      }
    }
    if (attr) list.push(attr);
    while (attr?._debugOwner) {
      list.push(attr._debugOwner);
      attr = attr._debugOwner;
    }

    (window as any).react_find_attr_list = list;
    return { list, attr, _node, currentNode: node };
  };

  const renderRect = () => {
    if (keyDown && current && document.body.contains(current)) {
      const rootDom = createRootDom();
      const { attr, _node, list, currentNode } = findParentNodeFileAttr(current);
      if (attr && _node && _node !== rootDom && !rootDom.contains(_node) && rootDom !== _node) {
        const rect = currentNode.getBoundingClientRect();
        const customStyle: CSSProperties = {
          wordBreak: 'break-all',
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left,
          opacity: 0.2,
          background: '#8250DF',
          zIndex: 999999,
          border: '1px dashed #8250DF',
        };
        const filePath = list.find(item => item._debugSource);
        if (list.length === 0 || !filePath) return;
        root?.render(
          <SelectModal
            remoteServerName={remoteServerName}
            list={list
              .filter(item => item._debugSource)
              .map(item => ({
                'source-file-path': `${item._debugSource.fileName}:${item._debugSource.lineNumber}`,
                tagName:
                  typeof item.type === 'string'
                    ? `${item.type}`
                    : `${item?.type?.name || item.type?.render?.name}`,
              }))}
            onSuccess={() => {
              clear();
            }}
            protocol={protocol}
            filePath={`${filePath._debugSource.fileName}:${filePath._debugSource.lineNumber}`}
            style={customStyle}
          />
        );
      }
    }
  };

  document.addEventListener('keydown', e => {
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
  document.addEventListener('mousemove', e => {
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
