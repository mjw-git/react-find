import React, { CSSProperties, useEffect, useRef, useState } from 'react';
export interface NodeItem {
  'source-file-path': string;
  tagName: string;
}
interface SelectModalProps {
  remoteServerName?: string;
  style?: React.CSSProperties;
  filePath?: string;
  protocol?: string;
  onSuccess: () => void;
  list?: NodeItem[];
}
const contextMenuWidth = 300;

const SelectModal = (props: SelectModalProps) => {
  const { style, filePath: path, protocol, onSuccess, list, remoteServerName } = props;
  const ref = useRef<HTMLDivElement[]>([]);
  const [filePath, setFilePath] = useState(path);
  const [contextMenuStyle, setContextMenuStyle] = useState<CSSProperties>();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const openWithProtocol = (href: string) => {
    const link = document.createElement('a');
    link.href = href;
    link.click();
  };
  const _protocol = protocol || window.localStorage.getItem('react_find_protocol') || 'vscode';
  useEffect(() => {
    setContextMenuVisible(false);
  }, [style]);
  useEffect(() => {
    setFilePath(path);
  }, [path]);

  if (!filePath) return null;
  return (
    <>
      <div style={{ position: 'fixed', left: 0, top: 0, zIndex: 999999 }}></div>
      {contextMenuVisible && (
        <div
          style={{
            borderRadius: 4,
            color: '#fff',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 1999999,
            width: contextMenuWidth,
            overflow: 'auto',
            height: 250,
            background: '#000',
            ...contextMenuStyle,
          }}
        >
          {list?.map((item, index) => {
            return (
              <div
                ref={(_: HTMLDivElement) => {
                  ref.current[index] = _;
                }}
                onClick={() => {
                  if (_protocol) {
                    onSuccess?.();
                    openWithProtocol(
                      remoteServerName
                        ? `${_protocol}://vscode-remote/ssh-remote+${remoteServerName}${item['source-file-path']}`
                        : `${_protocol}://file/${item['source-file-path']}`
                    );
                  }
                }}
                onMouseLeave={() => {
                  ref.current[index].style.color = '#fff';
                }}
                onMouseEnter={() => {
                  ref.current[index].style.color = '#FF523F';
                }}
                style={{
                  fontSize: 12,
                  cursor: 'pointer',
                  borderBottom: '1px solid grey',
                  padding: '4px 12px',
                }}
                key={index}
              >
                <div style={{ fontSize: 16, color: '#416AE0', fontWeight: 600 }}>
                  {`<${item.tagName.toLowerCase()}/>`}
                  <span
                    style={{
                      background: '#fff',
                      color: index === 0 ? '#FF523F' : '#000',
                      fontSize: 12,
                      fontWeight: 400,
                      padding: '0 5px',
                      marginLeft: 4,
                      borderRadius: 4,
                    }}
                  >
                    {index === 0 ? 'Current' : 'Parent'}
                  </span>
                </div>
                <div
                  title={item?.['source-file-path']}
                  style={{
                    marginTop: 4,
                    wordBreak: 'break-all',
                  }}
                >
                  <span
                    style={{
                      background: '#2446D3',
                      color: '#fff',
                      padding: '0 4px',
                      borderRadius: 4,
                      marginRight: 8,
                    }}
                  >
                    Source File
                  </span>
                  {item['source-file-path']}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div
        onContextMenu={e => {
          setContextMenuVisible(true);
          let x = e.clientX,
            y = e.clientY;
          if (e.clientX + contextMenuWidth > window.innerWidth) {
            x = e.clientX - contextMenuWidth <= 0 ? 0 : e.clientX - contextMenuWidth;
          }
          if (e.clientY + 250 > window.innerHeight) {
            y = e.clientY - 250 <= 0 ? 0 : e.clientY - 250;
          }

          setContextMenuStyle({
            left: x,
            top: y,
          });
          e.preventDefault();
        }}
        style={{ position: 'fixed', ...style }}
        onClick={() => {
          if (_protocol && filePath) {
            onSuccess?.();
            openWithProtocol(
              remoteServerName
                ? `${_protocol}://vscode-remote/ssh-remote+${remoteServerName}${filePath}`
                : `${_protocol}://file/${filePath}`
            );
          }
        }}
      ></div>
    </>
  );
};
export default SelectModal;
