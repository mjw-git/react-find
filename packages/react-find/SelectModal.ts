export interface NodeItem {
  'source-file-path': string;
  tagName: string;
}

export interface ModalStyle {
  [key: string]: string | number | undefined;
}

export interface SelectModalProps {
  remoteServerName?: string;
  style?: ModalStyle;
  filePath?: string;
  protocol?: string;
  onSuccess: () => void;
  list?: NodeItem[];
}

export interface SelectModalController {
  update: (props: SelectModalProps) => void;
  clear: () => void;
}

interface ModalRoot extends HTMLElement {
  __reactFindModal?: SelectModalController;
}

const textFontFamily = '"IBM Plex Sans", "Segoe UI", sans-serif';
const monoFontFamily = '"JetBrains Mono", "SFMono-Regular", monospace';
const contextMenuWidth = 360;
const contextMenuMaxHeight = 360;
const unitlessStyleProperties = new Set(['fontWeight', 'opacity', 'zIndex']);

const applyStyle = (element: HTMLElement, style: ModalStyle) => {
  const styleDeclaration = element.style as unknown as Record<string, string>;

  for (const [property, value] of Object.entries(style)) {
    if (value == null) {
      styleDeclaration[property] = '';
      continue;
    }

    const normalizedValue =
      typeof value === 'number' && !unitlessStyleProperties.has(property) ? `${value}px` : `${value}`;

    styleDeclaration[property] = normalizedValue;
  }
};

const createBadge = (text: string, style: ModalStyle) => {
  const badge = document.createElement('span');
  applyStyle(badge, style);
  badge.textContent = text;
  return badge;
};

const getDisplayTagName = (tagName: string) => {
  return `<${tagName.toLowerCase()} />`;
};

const getDisplayFileName = (filePath: string) => {
  const segments = filePath.split(/[\\/]/);
  return segments[segments.length - 1] || filePath;
};

const shouldReduceMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const openWithProtocol = (href: string) => {
  const link = document.createElement('a');
  link.href = href;
  link.click();
};

const resolveHref = (protocol: string, filePath: string, remoteServerName?: string) => {
  return remoteServerName
    ? `${protocol}://vscode-remote/ssh-remote+${remoteServerName}${filePath}`
    : `${protocol}://file/${filePath}`;
};

const resolveProtocol = (protocol?: string) => {
  return protocol || window.localStorage.getItem('react_find_protocol') || 'vscode';
};

const renderMenuItems = (
  menu: HTMLDivElement,
  props: SelectModalProps,
  openFilePath: (filePath: string) => void,
) => {
  menu.replaceChildren();

  const list = props.list || [];
  const protocol = resolveProtocol(props.protocol);

  const header = document.createElement('div');
  applyStyle(header, {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    padding: '14px 16px',
    marginBottom: 10,
    borderRadius: 20,
    border: '1px solid rgba(74, 222, 128, 0.18)',
    background:
      'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.84) 55%, rgba(8, 47, 73, 0.92))',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
  });

  const headerTop = document.createElement('div');
  applyStyle(headerTop, {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  });

  const headerTitleGroup = document.createElement('div');
  const headerTitle = document.createElement('div');
  applyStyle(headerTitle, {
    color: '#f8fafc',
    fontSize: 15,
    fontWeight: 700,
    fontFamily: textFontFamily,
    letterSpacing: '0.01em',
  });
  headerTitle.textContent = 'React Find';

  const headerSubtitle = document.createElement('div');
  applyStyle(headerSubtitle, {
    marginTop: 6,
    color: '#94a3b8',
    fontSize: 12,
    lineHeight: '1.55',
    fontFamily: textFontFamily,
  });
  headerSubtitle.textContent =
    list.length > 1
      ? 'Click the current node to open the file. Right click to inspect parent owners.'
      : 'Click the current node to open the file directly.';

  headerTitleGroup.append(headerTitle, headerSubtitle);

  const headerMeta = document.createElement('div');
  applyStyle(headerMeta, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    flexWrap: 'wrap',
  });
  headerMeta.appendChild(
    createBadge(protocol.toUpperCase(), {
      padding: '4px 10px',
      borderRadius: 999,
      border: '1px solid rgba(74, 222, 128, 0.25)',
      background: 'rgba(22, 163, 74, 0.16)',
      color: '#bbf7d0',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: monoFontFamily,
      letterSpacing: '0.08em',
    }),
  );
  headerMeta.appendChild(
    createBadge(`${list.length} node${list.length > 1 ? 's' : ''}`, {
      padding: '4px 10px',
      borderRadius: 999,
      border: '1px solid rgba(56, 189, 248, 0.22)',
      background: 'rgba(14, 165, 233, 0.12)',
      color: '#bae6fd',
      fontSize: 11,
      fontWeight: 600,
      fontFamily: textFontFamily,
    }),
  );
  if (props.remoteServerName) {
    headerMeta.appendChild(
      createBadge(`SSH · ${props.remoteServerName}`, {
        padding: '4px 10px',
        borderRadius: 999,
        border: '1px solid rgba(167, 139, 250, 0.22)',
        background: 'rgba(139, 92, 246, 0.12)',
        color: '#ddd6fe',
        fontSize: 11,
        fontWeight: 600,
        fontFamily: textFontFamily,
      }),
    );
  }

  headerTop.append(headerTitleGroup, headerMeta);
  header.appendChild(headerTop);
  menu.appendChild(header);

  list.forEach((item, index) => {
    const menuItem = document.createElement('div');
    applyStyle(menuItem, {
      cursor: 'pointer',
      padding: '14px 16px',
      marginBottom: index === list.length - 1 ? 0 : 10,
      borderRadius: 18,
      border: '1px solid rgba(148, 163, 184, 0.16)',
      background:
        'linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.56) 75%, rgba(2, 6, 23, 0.7))',
      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      transition:
        'transform 180ms cubic-bezier(0.22, 1, 0.36, 1), border-color 180ms ease, background 180ms ease, box-shadow 180ms ease',
    });
    menuItem.setAttribute('role', 'button');
    menuItem.tabIndex = 0;
    menuItem.onmouseenter = () => {
      menuItem.style.transform = 'translateY(-2px)';
      menuItem.style.borderColor = 'rgba(74, 222, 128, 0.4)';
      menuItem.style.background =
        'linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.76) 75%, rgba(2, 6, 23, 0.82))';
      menuItem.style.boxShadow = '0 18px 32px rgba(2, 6, 23, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)';
    };
    menuItem.onmouseleave = () => {
      menuItem.style.transform = 'translateY(0)';
      menuItem.style.borderColor = 'rgba(148, 163, 184, 0.16)';
      menuItem.style.background =
        'linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.56) 75%, rgba(2, 6, 23, 0.7))';
      menuItem.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.04)';
    };
    menuItem.onclick = () => {
      openFilePath(item['source-file-path']);
    };
    menuItem.onkeydown = event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFilePath(item['source-file-path']);
      }
    };

    const topRow = document.createElement('div');
    applyStyle(topRow, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    });

    const title = document.createElement('div');
    applyStyle(title, {
      color: '#f8fafc',
      fontSize: 15,
      fontWeight: 700,
      fontFamily: monoFontFamily,
      letterSpacing: '0.02em',
    });
    title.textContent = getDisplayTagName(item.tagName);

    const roleBadge = createBadge(index === 0 ? 'Current' : 'Parent', {
      padding: '4px 10px',
      borderRadius: 999,
      border:
        index === 0 ? '1px solid rgba(74, 222, 128, 0.26)' : '1px solid rgba(148, 163, 184, 0.16)',
      background: index === 0 ? 'rgba(34, 197, 94, 0.14)' : 'rgba(148, 163, 184, 0.1)',
      color: index === 0 ? '#bbf7d0' : '#e2e8f0',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: textFontFamily,
      letterSpacing: '0.04em',
    });
    topRow.append(title, roleBadge);

    const sourceLabel = document.createElement('div');
    applyStyle(sourceLabel, {
      marginTop: 12,
      color: '#64748b',
      fontSize: 11,
      fontWeight: 700,
      fontFamily: textFontFamily,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    });
    sourceLabel.textContent = index === 0 ? 'Current source' : 'Parent source';

    const source = document.createElement('div');
    source.title = item['source-file-path'];
    applyStyle(source, {
      marginTop: 8,
      wordBreak: 'break-all',
      color: '#cbd5e1',
      fontSize: 12,
      lineHeight: '1.6',
      fontFamily: monoFontFamily,
    });
    source.textContent = item['source-file-path'];

    const footer = document.createElement('div');
    applyStyle(footer, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: 12,
      flexWrap: 'wrap',
    });
    const fileBadge = createBadge(getDisplayFileName(item['source-file-path']), {
      padding: '5px 10px',
      borderRadius: 999,
      background: 'rgba(59, 130, 246, 0.12)',
      border: '1px solid rgba(96, 165, 250, 0.16)',
      color: '#bfdbfe',
      fontSize: 11,
      fontWeight: 600,
      fontFamily: monoFontFamily,
    });
    const actionHint = createBadge(index === 0 ? 'Click to open' : 'Jump to parent', {
      padding: '5px 10px',
      borderRadius: 999,
      background: 'rgba(15, 23, 42, 0.88)',
      border: '1px solid rgba(148, 163, 184, 0.18)',
      color: '#cbd5e1',
      fontSize: 11,
      fontWeight: 600,
      fontFamily: textFontFamily,
    });
    footer.append(fileBadge, actionHint);

    menuItem.append(topRow, sourceLabel, source, footer);
    menu.appendChild(menuItem);
  });
};

const createSelectModal = (container: HTMLElement): SelectModalController => {
  const modalRoot = container as ModalRoot;
  if (modalRoot.__reactFindModal) {
    return modalRoot.__reactFindModal;
  }

  const overlay = document.createElement('div');
  const overlayTag = document.createElement('div');
  const overlayHint = document.createElement('div');
  const contextMenu = document.createElement('div');
  applyStyle(overlay, {
    overflow: 'visible',
    cursor: 'pointer',
    isolation: 'isolate',
  });
  applyStyle(overlayTag, {
    position: 'absolute',
    top: 10,
    left: 10,
    maxWidth: 'calc(100% - 20px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    padding: '6px 10px',
    borderRadius: 999,
    border: '1px solid rgba(125, 211, 252, 0.18)',
    background: 'rgba(2, 6, 23, 0.74)',
    color: '#f8fafc',
    fontSize: 11,
    fontWeight: 700,
    fontFamily: monoFontFamily,
    letterSpacing: '0.06em',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.28)',
    backdropFilter: 'blur(10px)',
  });
  applyStyle(overlayHint, {
    position: 'absolute',
    right: 10,
    bottom: 10,
    maxWidth: 'calc(100% - 20px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    padding: '5px 10px',
    borderRadius: 999,
    border: '1px solid rgba(148, 163, 184, 0.18)',
    background: 'rgba(15, 23, 42, 0.78)',
    color: '#cbd5e1',
    fontSize: 11,
    fontWeight: 600,
    fontFamily: textFontFamily,
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.2)',
    backdropFilter: 'blur(8px)',
  });
  applyStyle(contextMenu, {
    color: '#e2e8f0',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1999999,
    width: contextMenuWidth,
    maxHeight: contextMenuMaxHeight,
    overflow: 'auto',
    padding: 10,
    borderRadius: 24,
    border: '1px solid rgba(148, 163, 184, 0.16)',
    background:
      'linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.94) 78%, rgba(15, 23, 42, 0.98))',
    boxShadow: '0 28px 80px rgba(2, 6, 23, 0.52), 0 0 0 1px rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(16px)',
    fontFamily: textFontFamily,
  });
  overlay.style.display = 'none';
  contextMenu.style.display = 'none';
  overlay.append(overlayTag, overlayHint);
  container.append(overlay, contextMenu);

  let currentProps: SelectModalProps | null = null;

  const hideContextMenu = () => {
    contextMenu.style.display = 'none';
  };

  const openFilePath = (filePath?: string) => {
    if (!currentProps || !filePath) return;

    const { remoteServerName, onSuccess, protocol } = currentProps;
    const currentProtocol = resolveProtocol(protocol);
    const href = resolveHref(currentProtocol, filePath, remoteServerName);

    onSuccess?.();
    openWithProtocol(href);
  };

  overlay.addEventListener('click', () => {
    openFilePath(currentProps?.filePath);
  });

  overlay.addEventListener('contextmenu', event => {
    if (!currentProps?.filePath) return;

    renderMenuItems(contextMenu, currentProps, openFilePath);

    const resolvedMenuWidth = Math.min(contextMenuWidth, Math.max(280, window.innerWidth - 16));
    let x = event.clientX;
    let y = event.clientY;
    const estimatedHeight = Math.min(126 + (currentProps.list?.length || 0) * 108, contextMenuMaxHeight);
    if (event.clientX + resolvedMenuWidth > window.innerWidth) {
      x = event.clientX - resolvedMenuWidth <= 0 ? 0 : event.clientX - resolvedMenuWidth;
    }
    if (event.clientY + estimatedHeight > window.innerHeight) {
      y = event.clientY - estimatedHeight <= 0 ? 0 : event.clientY - estimatedHeight;
    }

    applyStyle(contextMenu, {
      width: resolvedMenuWidth,
      left: x,
      top: y,
    });
    contextMenu.scrollTop = 0;
    contextMenu.style.display = 'block';
    if (!shouldReduceMotion()) {
      contextMenu.animate(
        [
          { opacity: '0', transform: 'translateY(10px) scale(0.98)' },
          { opacity: '1', transform: 'translateY(0) scale(1)' },
        ],
        {
          duration: 180,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        },
      );
    }
    event.preventDefault();
  });

  const controller: SelectModalController = {
    update(props) {
      currentProps = props;
      if (!props.filePath) {
        controller.clear();
        return;
      }

      hideContextMenu();
      renderMenuItems(contextMenu, props, openFilePath);
      const currentItem = props.list?.[0];
      overlayTag.textContent = currentItem
        ? `${getDisplayTagName(currentItem.tagName)} · ${getDisplayFileName(currentItem['source-file-path'])}`
        : 'Open source';
      overlayHint.textContent =
        (props.list?.length || 0) > 1 ? 'Click to open · Right click for parents' : 'Click to open source';
      overlay.title = props.filePath || '';
      applyStyle(overlay, {
        position: 'fixed',
        ...props.style,
      });
      overlay.style.display = 'block';
    },
    clear() {
      currentProps = null;
      overlay.style.display = 'none';
      hideContextMenu();
      contextMenu.replaceChildren();
    },
  };

  modalRoot.__reactFindModal = controller;
  return controller;
};

export default createSelectModal;
