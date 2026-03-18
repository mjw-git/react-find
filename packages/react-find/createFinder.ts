import createSelectModal, { type ModalStyle, type NodeItem } from './SelectModal';

export interface FinderParams {
  protocol?: string;
  keyCode?: string[];
  remoteServerName?: string;
}

interface InspectContext {
  body: HTMLElement;
  rootDom: HTMLElement;
}

interface InspectResult {
  list: NodeItem[];
  filePath?: string;
  currentNode: Element;
}

type InspectNode = (node: Element, context: InspectContext) => InspectResult | null;

const wrapperId = 'react-find-wrapper';

const isMac = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

const createRootDom = () => {
  const dom = document.querySelector<HTMLElement>(`#${wrapperId}`);
  if (dom) {
    return dom;
  }

  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', wrapperId);
  wrapper.style.position = 'absolute';
  wrapper.style.top = '0px';
  wrapper.style.left = '0px';
  document.body.appendChild(wrapper);
  return wrapper;
};

const createHighlightStyle = (rect: DOMRect): ModalStyle => {
  const radius = Math.max(10, Math.min(18, Math.floor(Math.min(rect.width, rect.height) / 4)));

  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    zIndex: 999999,
    borderRadius: radius,
    border: '1px solid rgba(74, 222, 128, 0.52)',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.18), rgba(56, 189, 248, 0.14))',
    boxShadow:
      '0 0 0 1px rgba(255, 255, 255, 0.04), 0 18px 36px rgba(15, 23, 42, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
    backdropFilter: 'blur(4px)',
    transition: 'box-shadow 180ms ease, transform 180ms ease',
  };
};

export const initFinder = (params: FinderParams | undefined, inspectNode: InspectNode) => {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return;

  const DEFAULT_KEY_CODE = isMac() ? ['Meta'] : ['Control'];
  const { protocol, keyCode = DEFAULT_KEY_CODE, remoteServerName } = params || {};

  const body = document.body;
  const rootDom = createRootDom();
  const modal = createSelectModal(rootDom);
  let current: Element | null = null;
  let keyDown = false;

  const clear = () => {
    modal.clear();
    keyDown = false;
  };

  const renderRect = () => {
    if (!keyDown || !current || !body.contains(current)) return;

    const result = inspectNode(current, { body, rootDom });
    if (!result || result.list.length === 0 || !result.filePath) {
      modal.clear();
      return;
    }

    modal.update({
      remoteServerName,
      list: result.list,
      onSuccess: clear,
      protocol,
      filePath: result.filePath,
      style: createHighlightStyle(result.currentNode.getBoundingClientRect()),
    });
  };

  document.addEventListener('keydown', event => {
    if (keyCode.includes(event.key)) {
      keyDown = true;
      renderRect();
      return;
    }

    clear();
  });

  document.addEventListener('keyup', clear);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clear();
    }
  });
  window.addEventListener('blur', clear);
  document.addEventListener('mousemove', event => {
    if (!(event.target instanceof Element)) {
      return;
    }
    if (event.target === rootDom || rootDom.contains(event.target)) {
      return;
    }
    if (event.target === current) {
      return;
    }

    current = event.target;
    renderRect();
  });
};
