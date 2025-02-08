/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

// import { type CSSProperties } from 'react';
import { createRoot, Root } from 'react-dom/client';
import SelectModal from '../SelectModal';
import { CSSProperties } from 'react';
import { NodeItem } from '../SelectModal';

export interface ParamsProps {
  protocol?: string;
  keyCode?: string[];
}


const init = (params?: ParamsProps) => {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return;
  const isMac = function () {
    return /macintosh|mac os x/i.test(navigator.userAgent);
  };
  const DEFAULT_KEY_CODE = isMac() ? ['Meta'] : ['Control'];
  const { keyCode = DEFAULT_KEY_CODE, protocol } = params || {};

  let current: HTMLElement | null = null;
  let keyDown = false;
  let root: Root | null = null;
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

  root = createRoot(rootDom);


  const clear = () => {
   try {
    root?.render(<SelectModal onSuccess={()=>{}} list={[]}/>);
   } catch (error) {
    console.log(error);
   }
    keyDown = false;
  };

  const findNodeAttrFilePath = (node: HTMLElement): string | undefined => {
    return node.getAttribute('source-file-path') as string;
  };

  const findParentNodeFileAttr = (node: HTMLElement) => {
    const list: NodeItem[] = [];
    let _node: HTMLElement | null = node;
    const pathMap = new Map<string, boolean>();
    while (_node?.parentElement && !rootDom.contains(_node) && rootDom !== _node) {
      let path = findNodeAttrFilePath(_node);

      if (path && !pathMap.has(path.split(':')[0])) {
        pathMap.set(path.split(':')[0], true);

        list.push({ 'source-file-path': path, tagName: _node.tagName });
      }
      _node = _node.parentElement;
    }

    return { list, _node, currentNode: node };
  };

  const renderRect = () => {
    if (keyDown && current && document.body.contains(current)) {
      const rootDom = createRootDom();
      const { _node, list, currentNode } = findParentNodeFileAttr(current);
      if (_node && _node !== rootDom && !rootDom.contains(_node) && rootDom !== _node) {
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

        if (list.length === 0) return;

        root?.render(
          <SelectModal
            list={list}
            onSuccess={() => {
              clear();
            }}
            protocol={protocol}
            filePath={list[0]['source-file-path']}
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
          console.log(344);
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
