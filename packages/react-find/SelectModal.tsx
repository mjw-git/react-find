import React, { CSSProperties, useEffect, useRef, useState } from 'react';
export interface NodeItem {
  'source-file-path': string;
  tagName: string;
}
interface SelectModalProps {
  style?: React.CSSProperties;
  filePath?: string;
  protocol?: string;
  onSuccess: () => void;
  list?: NodeItem[];
}
const contextMenuWidth = 300
const dialogCss: React.CSSProperties = {
  width: 254,
  position: 'fixed',
  left: '50%',
  top: '0',
  padding: '20px',
  borderRadius: 12,
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  background: '#F6F7FD',
  zIndex: 10000,
  transform: 'translateX(-50%)',
};
const SelectModal = (props: SelectModalProps) => {
  const { style, filePath: path, protocol, onSuccess, list } = props;
  const ref = useRef<HTMLDivElement[]>([]);

  const [filePath, setFilePath] = useState(path);
  const [selectValue, setSelectValue] = useState('vscode');
  const [visible, setVisible] = useState(false);
  const [contextMenuStyle, setContextMenuStyle] = useState<CSSProperties>();
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const openWithProtocol = (href: string) => {
    const link = document.createElement('a');
    link.href = href;
    link.click();
  };
  const _protocol = protocol || window.localStorage.getItem('react_find_protocol');
  useEffect(() => {
    setContextMenuVisible(false);
  }, [style]);
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
          }}>
          {list?.map((item, index) => {
            return (
              <div
                ref={(_: HTMLDivElement) => {
                  ref.current[index] = _;
                }}
                onClick={() => {
                  if (_protocol) {
                    onSuccess?.();
                    openWithProtocol(`${_protocol}://file/${item['source-file-path']}`);
                  } else {
                    setFilePath(`${item['source-file-path']}`);
                    setVisible(true);
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
                key={index}>
                <div style={{ fontSize: 16, color: '#416AE0', fontWeight: 600 }}>
                  {`<${item.tagName.toLowerCase()}/>`}
                  <span
                    style={{
                      background: '#fff',
                      color: index === 0 ? '#FF523F' : '#000',
                      fontSize: 12,
                      padding: '0 5px',
                      marginLeft: 4,
                      borderRadius: 4,
                    }}>
                    {index === 0 ? 'current' : 'parent'}
                  </span>
                </div>
                <div
                  title={item?.['source-file-path']}
                  style={{
                    marginTop: 4,
                    wordBreak: 'break-all',
                  }}>
                  <span
                    style={{
                      background: '#2446D3',
                      color: '#fff',
                      padding: '0 4px',
                      borderRadius: 4,
                      marginRight: 8,
                    }}>
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
        onContextMenu={(e) => {
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
          if (_protocol) {
            onSuccess?.();
            const link = document.createElement('a');
            link.href = `${_protocol}://file/${filePath}`;
            link.click();
          } else {
            setVisible(true);
          }
        }}></div>
      {visible && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            zIndex: 1000000,
            background: 'rgba(0,0,0,0.03)',
            boxSizing: 'border-box',
            width: document.documentElement.clientWidth,
            height: '100vh',
            overflow: 'hidden',
          }}>
          <div style={dialogCss}>
            <div style={{ fontWeight: 600 }}>Choose IDE</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                gap: 12,
                fontSize: 18,
                cursor: 'pointer',
              }}>
              <span
                onClick={() => {
                  setSelectValue('vscode');
                }}>
                <input
                  value="vscode"
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                  }}
                  checked={selectValue === 'vscode'}
                  type="radio"></input>
                <span>VS Code</span>
              </span>
              <span
                onClick={() => {
                  setSelectValue('cursor');
                }}>
                <input value="cursor" checked={selectValue === 'cursor'} type="radio"></input>
                <span>Cursor</span>
              </span>
            </div>
            <button
              onClick={() => {
                window.localStorage.setItem('react_find_protocol', selectValue);
                window.open(`${selectValue}://file/${filePath}`);
                setVisible(false);
                onSuccess?.();
              }}
              style={{
                borderRadius: 12,
                cursor: 'pointer',
                border: 'none',
                marginTop: 20,
                outline: 'none',
                background: '#1285FF',
                display: 'block',
                color: '#fff',
                width: '100%',
                fontSize: 14,
                padding: '4px',
              }}>
              确定
            </button>
            <button
              onClick={() => {
                setVisible(false);
              }}
              style={{
                borderRadius: 12,
                cursor: 'pointer',
                border: 'none',
                marginTop: 10,
                outline: 'none',
                background: '#C0C0C1',
                display: 'block',
                color: '#393939',
                width: '100%',
                fontSize: 14,
                padding: '4px',
              }}>
              取消
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default SelectModal;
